#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};

#[test]
fn test_yeet() {
    let env = Env::default();
    let contract_id = env.register_contract(None, YContract);
    let client = YContractClient::new(&env, &contract_id);

    // let words = client.hello(&String::from_str(&env, "Dev"));
    // assert_eq!(
        // words,
        // vec![
            // &env,
            // String::from_str(&env, "Hello"),
            // String::from_str(&env, "Dev"),
        // ]
    // );
}
