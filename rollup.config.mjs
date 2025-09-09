import { glob } from "glob";

import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default glob.sync("src/translators/*.ts").map((filename) => ({
	input: filename,
	output: {
		dir: "translators/generated",
		format: "es",
	},
	treeshake: true,
	plugins: [
		commonjs(),
		typescript({
			target: "esnext",
			module: "esnext",
			moduleResolution: "nodenext",
		}),
		nodeResolve({
			browser: true,
		}),
	],
}));
