/// <reference types="@types/node" />

import alchemy from "alchemy";
import { D1Database, ReactRouter, WranglerJson } from "alchemy/cloudflare";

const app = await alchemy("wedding-site");

const database = await D1Database("db", {
  name: "registry-store",
  migrationsDir: "./migrations",
});

export const worker = await ReactRouter("wedding-site", {
  main: "workers/app.ts",
  command: "bun run build",
  bindings: {
    DB: database,
  },
});

await WranglerJson("wrangler.jsonc", {
  worker,
});

console.log({
  url: worker.url,
});

await app.finalize();
