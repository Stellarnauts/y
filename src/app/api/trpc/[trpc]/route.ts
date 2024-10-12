import { router } from "@/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router,
    createContext: () => ({}),
  });
}

export { handler as GET, handler as POST };
