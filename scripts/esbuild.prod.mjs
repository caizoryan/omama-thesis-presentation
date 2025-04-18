import { build } from "esbuild";
import clean from "esbuild-plugin-clean";
import copy from "esbuild-plugin-copy";

const builder = async () => {
  await build({
    entryPoints: ["./script.ts"],
    bundle: true,
    minify: false,
    sourcemap: false,
    target: ["es2020"],
    outfile: "./public/bundle.min.js",
    plugins: [
      clean({ patterns: ["./dist/*", "./public/bundle.min.js"] }),
    ],
  });
};
builder();
