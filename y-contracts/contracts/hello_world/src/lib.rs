#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, String, Symbol, Vec, Address};

const YEETS: Symbol = symbol_short!("YEETS");

#[contract]
pub struct YContract;

struct Yeet {
    uri: String,
    author: Address,
    yeet_id: String,
    likes: u64,
    replies: Vec<Yeet>
}

#[contractimpl]
impl YContract {
    pub fn yeet(env: Env, yeet: Yeet) {
        
    }

    pub fn reply(env: Env, yeet_id: String) {}

    pub fn sheesh(env: Env, yeet_id: String) {}
}

mod test;
