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
        contractId: "CCWEWOC7XQZTS7CIEMSX4CAZRB2VHFJSZTUVM2F5LR72ETZ7FC77HUE5",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAB1llZXRLZXkAAAAAAQAAAAEAAAAAAAAAAk9mAAAAAAABAAAAEA==",
            "AAAAAQAAAAAAAAAAAAAABFllZXQAAAAEAAAAAAAAAAZhdXRob3IAAAAAABMAAAAAAAAABWxpa2VzAAAAAAAABgAAAAAAAAAHbWVzc2FnZQAAAAAQAAAAAAAAAAdyZXBsaWVzAAAAA+oAAAfQAAAABFllZXQ=",
            "AAAAAAAAAAAAAAAEeWVldAAAAAQAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdtZXNzYWdlAAAAABAAAAAAAAAAAmlkAAAAAAAQAAAAAAAAABBpbml0aWFsX3ZhbGlkaXR5AAAABAAAAAA=",
            "AAAAAAAAAAAAAAAFcmVwbHkAAAAAAAAEAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFcmVwbHkAAAAAAAAQAAAAAAAAAAJpZAAAAAAAEAAAAAAAAAAOYWRkZWRfdmFsaWRpdHkAAAAAAAQAAAAA",
            "AAAAAAAAAAAAAAAGc2hlZXNoAAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAACaWQAAAAAABAAAAAAAAAADmFkZGVkX3ZhbGlkaXR5AAAAAAAEAAAAAA==",
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
