import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAFUQONPIJP7ZBXSZCHAY2PIHY4PSGSU2OGJ3HKVD62APNWC5HJS6HVU",
    }
};
export const Errors = {
    1: { message: "NoParentYeet" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAAQAAAAAAAAAMTm9QYXJlbnRZZWV0AAAAAQ==",
            "AAAAAgAAAAAAAAAAAAAAB1llZXRLZXkAAAAAAQAAAAEAAAAAAAAAAk9mAAAAAAABAAAAEA==",
            "AAAAAQAAAAAAAAAAAAAABFllZXQAAAAFAAAAAAAAAAZhdXRob3IAAAAAABMAAAAAAAAAAmlkAAAAAAAQAAAAAAAAAAVsaWtlcwAAAAAAAAYAAAAAAAAAB21lc3NhZ2UAAAAAEAAAAAAAAAAJcGFyZW50X2lkAAAAAAAAEA==",
            "AAAAAAAAAAAAAAAEeWVldAAAAAQAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdtZXNzYWdlAAAAABAAAAAAAAAAAmlkAAAAAAAQAAAAAAAAABBpbml0aWFsX3ZhbGlkaXR5AAAABAAAAAEAAAfQAAAABFllZXQ=",
            "AAAAAAAAAAAAAAAFcmVwbHkAAAAAAAAFAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFcmVwbHkAAAAAAAAQAAAAAAAAAAJpZAAAAAAAEAAAAAAAAAAJcGFyZW50X2lkAAAAAAAAEAAAAAAAAAAOYWRkZWRfdmFsaWRpdHkAAAAAAAQAAAABAAAD6QAAB9AAAAAEWWVldAAAAAM=",
            "AAAAAAAAAAAAAAAGc2hlZXNoAAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAACaWQAAAAAABAAAAAAAAAADmFkZGVkX3ZhbGlkaXR5AAAAAAAEAAAAAQAAB9AAAAAEWWVldA==",
            "AAAAAAAAAAAAAAAIZ2V0X3llZXQAAAABAAAAAAAAAAJpZAAAAAAAEAAAAAEAAAfQAAAABFllZXQ="]), options);
        this.options = options;
    }
    fromJSON = {
        yeet: (this.txFromJSON),
        reply: (this.txFromJSON),
        sheesh: (this.txFromJSON),
        get_yeet: (this.txFromJSON)
    };
}
