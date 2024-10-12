import { config } from "@/config";
import { PasskeyServer } from "passkey-kit";

export const server = new PasskeyServer({
  rpcUrl: config.stellar.rpcUrl,
  launchtubeUrl: "https://testnet.launchtube.xyz",
  launchtubeJwt:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjM2RjYzBkZTE0YzQxOGY3NTc1ZGIyNmEzNTQ4NzI5ZmZkNTM4YTkyNjZlNDFmYzU1MDM3Yjc3MTg2MTM2OWRiIiwiZXhwIjoxNzM2MDE0OTE2LCJjcmVkaXRzIjoxMDAwMDAwMDAwLCJpYXQiOjE3Mjg3NTczMTZ9.o5TYN0r1g7cZg3ylnMmAiCxF4tIq2oljHVB8LSwh7iw",
  // mercuryUrl: import.meta.env.VITE_mercuryUrl,
  // mercuryJwt: import.meta.env.VITE_mercuryJwt,
});
