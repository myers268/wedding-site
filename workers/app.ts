import { createDb, createDbWithSeed } from "#db/index";
import type { Database } from "#db/index";
import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
      db: Database
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const db = await createDbWithSeed(env.DB);
    return requestHandler(request, {
      cloudflare: { env, ctx, db },
    });
  },
} satisfies ExportedHandler<Env>;
