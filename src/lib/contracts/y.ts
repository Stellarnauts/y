import { config } from "@/config";
import * as Client from "bindings";

export const y = new Client.Client({
  contractId: Client.networks.testnet.contractId,
  rpcUrl: config.stellar.rpcUrl,
  networkPassphrase: config.stellar.networkPassphrase,
});
