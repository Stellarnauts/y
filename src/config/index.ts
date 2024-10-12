export const config = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
  factoryContractAddress: process.env
    .NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string,
  stellar: {
    rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL as string,
    networkPassphrase: process.env
      .NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE as string,
  },
};
