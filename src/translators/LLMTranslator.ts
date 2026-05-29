import { ChatGPTLLMTranslator as BaseChatGPTTranslator } from "anylang/esm/translators/LLMTranslators/ChatGPTLLMTranslator";

type Options = typeof BaseChatGPTTranslator extends {
	new(...params: infer T): any;
}
	? T
	: never;

(globalThis as any).translator = class LLMTranslator extends (
	BaseChatGPTTranslator
) {
	getLengthLimit(): number {
		return 10_000;
	}

	getRequestsTimeout(): number {
		return 100;
	}

	constructor(options: Partial<Options>) {
		super({
			...options,
			// Insert your API key here
			apiKey: "",

			// Optional. Custom API endpoint
			// baseUrl: 'https://openrouter.ai/api/v1',

			// Optional. Custom model name
			// model: 'openai/gpt-4o-mini',
			// model: 'deepseek/deepseek-v4-flash',
		});
	}
};
