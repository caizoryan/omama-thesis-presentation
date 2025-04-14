import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["./script.ts"],
    bundle: true,
    sourcemap: true,
    outfile: "public/build.min.js",
  },
  { root: "./public", port: 8080 },
);
