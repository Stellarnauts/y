#![no_std]
use core::fmt::{Debug, Formatter};

use soroban_sdk::{contract, contractimpl, contracttype, crypto, symbol_short, vec, Address, BytesN, Env, FromVal, String, Symbol, Vec};

//const YEETS: Symbol = symbol_short!("YEETS");

#[contract]
pub struct YContract;

#[contracttype]
pub enum YeetKey {
    Of(String)
}

#[contracttype]
pub struct Yeet {
    message: String,
    author: Address,
    yeet_id: String,
    likes: u64,
    replies: Vec<Yeet>
}

#[contractimpl]
impl YContract {
    pub fn yeet(env: Env, user: Address, message: String, id: String, initial_validity: u32) {
        user.require_auth();

        let yeet_key = YeetKey::Of(id.clone());

        env.storage().temporary().set(&yeet_key, &Yeet {
            message: message,
            author: user.clone(),
            yeet_id: id,
            likes: 0,
            replies: Vec::new(&env)
        });

        env.storage().temporary().extend_ttl(&yeet_key, initial_validity, initial_validity);
    }

    pub fn reply(env: Env, yeet_id: String) {}

    pub fn sheesh(env: Env, yeet_id: String) {}

    pub fn get_yeet(env: Env, yeet_id: String) {}

    pub fn get_yeets_by_address(env: Env, who: &Address) {}

}

mod test;
