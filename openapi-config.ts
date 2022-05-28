import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: `${process.env.REACT_APP_PUBLIC_API_URL}/docs-json`,
  apiFile: "./src/app/slices/apiSlice.ts",
  apiImport: "apiSlice",
  hooks: true,
};

export default config;
