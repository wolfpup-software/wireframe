import { nodeResolve } from "@rollup/plugin-node-resolve";

const initialBundle = {
  input: "dist/initial_bundle.js",
  output: {
    file: "../scripts/initial_bundle.js",
    format: "es",
  },
  plugins: [nodeResolve()],
};

export default [initialBundle];
