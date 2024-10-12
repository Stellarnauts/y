import { config } from "@/config";
import { PasskeyKit } from "passkey-kit";

export const account = new PasskeyKit({
  rpcUrl: config.stellar.rpcUrl,
  networkPassphrase: config.stellar.networkPassphrase,
  factoryContractId: config.factoryContractAddress,
});
