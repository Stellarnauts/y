#![cfg(test)]
extern crate std;

use soroban_sdk::{
    symbol_short,
    testutils::{Address as _, Events},
    Address, Env, vec, String, IntoVal
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
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
        ]
    );

    assert_ne!(
        env.events().all(),
        vec![
            &env,
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: message,
                    author: user_1,
                    likes: 1,
                    id: id,
                    parent_id: String::from_str(&env, "")
                }.into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_reply() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, YContract);
    let client = YContractClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    let user_2 = Address::generate(&env);

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
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
        ]
    );

    assert_ne!(
        env.events().all(),
        vec![
            &env,
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: message.clone(),
                    author: user_1.clone(),
                    likes: 1,
                    id: id.clone(),
                    parent_id: String::from_str(&env, "")
                }.into_val(&env)
            ),
        ]
    );

    let new_child_id = String::from_str(&env, "aldkfjewopijf");

    let reply = Yeet {
        message: String::from_str(&env, "Hell Yeah"),
        author: user_2.clone(),
        likes: 0,
        id: new_child_id.clone(),
        parent_id: id.clone() 
    };

    client.reply(&user_2, &reply.message, &new_child_id, &id, &40000);

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
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: String::from_str(&env, "Hell Yeah"),
                    author: user_2.clone(),
                    likes: 0,
                    id: new_child_id.clone(),
                    parent_id: id.clone(),
                }.into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_sheesh() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, YContract);
    let client = YContractClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    let user_2 = Address::generate(&env);

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
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
        ]
    );

    assert_ne!(
        env.events().all(),
        vec![
            &env,
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: message.clone(),
                    author: user_1.clone(),
                    likes: 1,
                    id: id.clone(),
                    parent_id: String::from_str(&env, "")
                }.into_val(&env)
            ),
        ]
    );

    client.sheesh(&user_2, &id, &3000);

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
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: message.clone(),
                    author: user_1.clone(),
                    likes: 1,
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_get_yeet() {
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
                    id: id.clone(),
                    parent_id: String::from_str(&env, ""),
                }.into_val(&env)
            ),
        ]
    );

    assert_ne!(
        env.events().all(),
        vec![
            &env,
            (
                contract_id.clone(),
                (YEET, symbol_short!("yeet")).into_val(&env),
                Yeet {
                    message: message.clone(),
                    author: user_1.clone(),
                    likes: 1,
                    id: id.clone(),
                    parent_id: String::from_str(&env, "")
                }.into_val(&env)
            ),
        ]
    );
    let res = client.get_yeet(&id);

    assert_eq!(
        res,
        Yeet {
            message: message,
            author: user_1,
            likes: 0,
            id: id,
            parent_id: String::from_str(&env, "")
        }
    );

}