import { build, context } from "esbuild";
import { readFile } from "node:fs/promises";

const shouldWatch = process.argv.includes("--watch");

const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

const externals = pkg.peerDependencies
  ? Object.keys(pkg.peerDependencies)
  : [];

const common = {
  entryPoints: ["index.jsx"],
  bundle: true,
  jsx: "automatic",
  external: externals,
  sourcemap: true,
  minify: false,
};

const builds = [
  {
    ...common,
    format: "esm",
    outfile: "dist/index.js",
  },
  {
    ...common,
    format: "cjs",
    outfile: "dist/index.cjs",
  },
];

if (shouldWatch) {
  const contexts = await Promise.all(builds.map((options) => context(options)));
  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log("Watching for changes...");
} else {
  await Promise.all(builds.map((options) => build(options)));
}
