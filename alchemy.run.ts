/// <reference types="@types/node" />

import alchemy from "alchemy";
import { D1Database, ReactRouter, WranglerJson } from "alchemy/cloudflare";

const app = await alchemy("wedding-site", {
  password: process.env.SECRET_PASSPHRASE,
});

const googleCloudApiKey = alchemy.secret(process.env.GOOGLE_CLOUD_API_KEY);

const database = await D1Database("db", {
  name: "registry-store",
  adopt: true,
  migrationsDir: "./migrations",
});

export const worker = await ReactRouter("wedding-site", {
  main: "workers/app.ts",
  build: {
    command: "bun run build",
  },
  bindings: {
    DB: database,
    GOOGLE_CLOUD_API_KEY: googleCloudApiKey,
  },
});

await WranglerJson("wrangler.jsonc", {
  worker,
});

console.log({
  url: worker.url,
});

await app.finalize();
