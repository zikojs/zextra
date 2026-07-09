import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";

const Addon_name = "zextra";
const NamedExport = "Zextra";
const Author = "";

const banner = `
/*
  Project: ${Addon_name}
  Author: ${Author}
  Date : ${new Date()}
*/
`;

const isProduction = process.env.NODE_ENV === "production";
const Target = process.env.TARGET;

const OUTPUT_NAME = Target === "index" ? `dist/zextra` : `dist/zextra-${Target}` 

const inputs = {
    index : "src/index.js",
    // ui : "src/ui/index.js",
    // canvas : "src/canvas/index.js",
    // svg : "src/svg/index.js"
}

const output = [
  {
    file: `${OUTPUT_NAME}.mjs`,
    format: "es",
    banner,
    exports: "named",
  },
  {
    file: `${OUTPUT_NAME}.js`,
    format: "umd",
    name: NamedExport,
    banner,
    exports: "named",
    globals: {
      ziko: "Ziko",
    },
  },
];

isProduction && output.push({
      file: `${OUTPUT_NAME}.min.js`,
      format: "umd",
      name: NamedExport,
      banner,
      globals: {
        ziko: "Ziko",
      },
      exports: "named",
      plugins: [
        terser({
          output: {
            comments: (node, { type, value }) =>
              type === "comment2" && value.includes("Author"),
          },
        }),
      ],
    },
)

export default {
  input : inputs[Target], 
  output,
  external: ["ziko"],
  plugins: [resolve(), commonjs()],
};