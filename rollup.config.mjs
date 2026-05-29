import { glob } from "glob";

import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default glob.sync("src/translators/*.ts").map((filename) => ({
	input: filename,
	output: {
		dir: "translators/generated",
		format: "es",
		generatedCode: "es2015",
		exports: "named",
		hoistTransitiveImports: false,
		minifyInternalExports: true,
	},
	onwarn(warning, warn) {
		if (warning.code === "THIS_IS_UNDEFINED") return;
		if (warning.code === "CIRCULAR_DEPENDENCY") return;
		warn(warning);
	},
	treeshake: {
		preset: "smallest",
		moduleSideEffects: false,
		propertyReadSideEffects: false,
		tryCatchDeoptimization: false,
		unknownGlobalSideEffects: false,
		annotations: true,
		correctVarValueBeforeDeclaration: true,
	},
	plugins: [
		nodeResolve({
			browser: true,
			exportConditions: ["default", "module", "import"],
		}),

		commonjs(),

		typescript({
			sourceMap: false,
			target: "esnext",
			module: "esnext",
			moduleResolution: "bundler",
			outDir: "translators/generated",
		}),
	],
}));
