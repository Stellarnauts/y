#![no_std]
use core::fmt::{Debug, Formatter};

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, crypto, storage::Temporary, symbol_short, vec, Address, BytesN, Env, FromVal, String, Symbol, Vec};

const YEET: Symbol = symbol_short!("YEET");

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NoParentYeet = 1,
}

#[contract]
pub struct YContract;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum YeetKey {
    Of(String)
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Yeet {
    message: String,
    author: Address,
    id: String,
    parent_id: Option<String>,
    likes: u64,
}

#[contractimpl]
impl YContract {
    pub fn yeet(env: Env, user: Address, message: String, id: String, initial_validity: u32) -> Yeet {
        user.require_auth();

        let yeet_key = YeetKey::Of(id.clone());

        let submitted_yeet = Yeet {
            message: message,
            author: user.clone(),
            id: id.clone(),
            parent_id: None,
            likes: 0,
        };

        env.storage().temporary().set(&yeet_key, &submitted_yeet);

        env.events().publish((YEET, symbol_short!("yeet")), submitted_yeet.clone());

        env.storage().temporary().extend_ttl(&yeet_key, initial_validity, initial_validity);

        submitted_yeet
    }

    pub fn reply(env: Env, user: Address, reply: String, id: String, parent_id: String, added_validity: u32) -> Result<Yeet, Error> {
        user.require_auth();

        let parent_yeet_key = YeetKey::Of(parent_id.clone());

        match env.storage().temporary().get::<YeetKey, Yeet>(&parent_yeet_key) {
            Some(_) => {
                let yeet_key = YeetKey::Of(id.clone());

                let reply_yeet: Yeet = Yeet {
                    message: reply,
                    author: user.clone(),
                    id: id.clone(),
                    parent_id: Some(parent_id.clone()),
                    likes: 0,
                };

                env.storage().temporary().set(&yeet_key, &reply_yeet);

                env.events().publish((YEET, symbol_short!("yeet")), reply_yeet.clone());

                Self::loop_up_the_tree(env, id, added_validity);

                Ok(reply_yeet)
            },
            None => Err(Error::NoParentYeet)
        }
    }

    pub fn sheesh(env: Env, user: Address, id: String, added_validity: u32) -> Yeet {
        user.require_auth();

        let yeet_key = YeetKey::Of(id.clone());

        let mut root_yeet: Yeet = env.storage().temporary().get(&yeet_key).expect("This fucking yeet doesn't exist");

        root_yeet.likes += 1;

        env.storage().temporary().set(&yeet_key, &root_yeet);

        env.events().publish((YEET, symbol_short!("yeet")), root_yeet.clone());

        Self::loop_up_the_tree(env, id, added_validity);

        root_yeet
    }

    pub fn get_yeet(env: Env, id: String) -> Yeet {
        let yeet_key = YeetKey::Of(id.clone());

        env.storage().temporary().get(&yeet_key).expect("This fucking yeet doesn't exist")
    }

    fn loop_up_the_tree(env: Env, id: String, added_validity: u32) {
        let mut temp_id: Option<String> = Some(id); 

        while temp_id.is_some() {
            let key = YeetKey::Of(temp_id.unwrap().clone());

            match env.storage().temporary().get::<YeetKey, Yeet>(&key) {
                Some(unwrapped_yeet) => {
                    env.storage().temporary().extend_ttl(&key, added_validity, added_validity);

                    temp_id = unwrapped_yeet.parent_id;
                },
                None => {
                    break
                }
            } 
        };
    }
}

mod test;
