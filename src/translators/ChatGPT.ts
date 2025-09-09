import { ChatGPTLLMTranslator as BaseChatGPTTranslator } from 'anylang/translators';

type Options = typeof BaseChatGPTTranslator extends { new(...params: infer T): any } ? T : never;

function ChatGPTTranslator(options: Partial<Options>) {
	return new BaseChatGPTTranslator({
		...options,
		// Insert your API key here
		apiKey: '',

		// Optional. Custom API endpoint
		// baseUrl: 'https://openrouter.ai/api/v1',

		// Optional. Custom model name
		// model: 'openai/gpt-4o-mini',
	});
}

ChatGPTTranslator.__proto__ = BaseChatGPTTranslator;

ChatGPTTranslator;