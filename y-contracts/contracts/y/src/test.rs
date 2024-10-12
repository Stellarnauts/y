#![cfg(test)]
extern crate std;

use soroban_sdk::{
    symbol_short,
    testutils::{Address as _, Events},
    Address, Env, IntoVal,
};

use super::*;

#[test]
fn test_yeet() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, YContract);
    let client = YContractClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);

    let message = String::from_str(&env, "Heeej");
    let id = String::from_str(&env, "kdjflksd9399kjf");

    client.yeet(&user_1, &message, &id, &3000);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: message.clone(),
                    author: user_1.clone(),
                    likes: 0,
                    id: id,
                    parent_id: None
                    //replies: Vec::new(&env)
                }.into_val(&env)
            ),
        ]
    );

    // assert_ne!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message,
                    // author: user_1,
                    // likes: 1,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );
}

// #[test]
// fn test_reply() {
    // let env = Env::default();
    // env.mock_all_auths();

    // let contract_id = env.register_contract(None, YContract);
    // let client = YContractClient::new(&env, &contract_id);

    // let user_1 = Address::generate(&env);
    // let user_2 = Address::generate(&env);

    // let message = String::from_str(&env, "Heeej");
    // let id = String::from_str(&env, "kdjflksd9399kjf");

    // client.yeet(&user_1, &message, &id, &3000);

    // assert_eq!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 0,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );

    // assert_ne!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 1,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );

    // let reply = Yeet {
        // message: String::from_str(&env, "Hell Yeah"),
        // author: user_2.clone(),
        // likes: 0,
        // replies: Vec::new(&env)
    // };

    // client.reply(&user_2, &reply.message, &id, &40000);

    // assert_eq!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 0,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message,
                    // author: user_1,
                    // likes: 0,
                    // replies: vec![
                        // &env,
                        // reply
                    // ]
                // }.into_val(&env)
            // ),
        // ]
    // );
// }


// #[test]
// fn test_sheesh() {
    // let env = Env::default();
    // env.mock_all_auths();

    // let contract_id = env.register_contract(None, YContract);
    // let client = YContractClient::new(&env, &contract_id);

    // let user_1 = Address::generate(&env);
    // let user_2 = Address::generate(&env);

    // let message = String::from_str(&env, "Heeej");
    // let id = String::from_str(&env, "kdjflksd9399kjf");

    // client.yeet(&user_1, &message, &id, &3000);

    // assert_eq!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 0,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );

    // assert_ne!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 1,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );

    // client.sheesh(&user_2, &id, &3000);

    // assert_eq!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 0,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message,
                    // author: user_1,
                    // likes: 1,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );
// }

// #[test]
// fn test_get_yeet() {
    // let env = Env::default();
    // env.mock_all_auths();

    // let contract_id = env.register_contract(None, YContract);
    // let client = YContractClient::new(&env, &contract_id);

    // let user_1 = Address::generate(&env);

    // let message = String::from_str(&env, "Heeej");
    // let id = String::from_str(&env, "kdjflksd9399kjf");

    // client.yeet(&user_1, &message, &id, &3000);

    // assert_eq!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 0,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );

    // assert_ne!(
        // env.events().all(),
        // vec![
            // &env,
            // (
                // contract_id.clone(),
                // (YEET, symbol_short!("yeet")).into_val(&env),
                // Yeet {
                    // message: message.clone(),
                    // author: user_1.clone(),
                    // likes: 1,
                    // replies: Vec::new(&env)
                // }.into_val(&env)
            // ),
        // ]
    // );

    // let res = client.get_yeet(&id);

    // assert_eq!(
        // res,
        // Yeet {
            // message: message.clone(),
            // author: user_1.clone(),
            // likes: 0,
            // replies: Vec::new(&env)
        // }
    // );

// }