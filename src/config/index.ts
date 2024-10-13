import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export const config = {
  turso: {
    connectionUrl: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
  factoryContractAddress: process.env
    .NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string,
  stellar: {
    rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL as string,
    networkPassphrase: process.env
      .NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE as string,
  },
};
