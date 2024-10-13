import { config } from "@/config";
import { PasskeyServer } from "passkey-kit";

export const server = new PasskeyServer({
  rpcUrl: config.stellar.rpcUrl,
  launchtubeUrl: config.launchtube.url,
  launchtubeJwt: config.launchtube.jwt,
  // mercuryUrl: import.meta.env.VITE_mercuryUrl,
  // mercuryJwt: import.meta.env.VITE_mercuryJwt,
});
