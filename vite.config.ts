import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

if (typeof globalThis.WeakRef === "undefined") {
  // @ts-ignore
  globalThis.WeakRef = class WeakRef {
    private target: any;
    constructor(target: any) { this.target = target; }
    deref() { return this.target; }
  };
}

export default defineConfig({
  define: {
    WeakRef: "(globalThis.WeakRef || class WeakRef { constructor(v) { this.v = v; } deref() { return this.v; } })",
  },
  plugins: [
    vinext(),
    cloudflare({
      configPath: "./wrangler.jsonc",
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
