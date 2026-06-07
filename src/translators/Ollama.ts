/**
 * Ollama — run large language models locally or on a private server
 * Homepage: https://ollama.com/
 * API docs: https://github.com/ollama/ollama/blob/main/docs/api.md
 *
 * Setup:
 *   1. Install Ollama: https://ollama.com/download
 *   2. Pull a model: ollama pull translategemma
 *   3. Edit the values below to match your setup
 *
 * Recommended model: translategemma (https://ollama.com/library/translategemma)
 * A translation-specific model based on Gemma.
 */
import { ChatGPTLLMTranslator as BaseLLMTranslator } from 'anylang/translators/LLMTranslators/ChatGPTLLMTranslator';

type Options = typeof BaseLLMTranslator extends { new (...params: infer T): any } ? T : never;

function OllamaTranslator(options: Partial<Options> = {}) {
	return new BaseLLMTranslator({
		...options,

		// Ollama server URL — must include /v1 for the OpenAI-compatible endpoint
		// Local:   http://localhost:11434/v1
		// Private: https://ollama.yourhomelab.com/v1
		baseUrl: 'http://localhost:11434/v1',

		// Model to use (must be pulled on your Ollama instance)
		// Recommended: translategemma
		// Others:      llama3.2, gemma3, mistral, qwen2.5
		model: 'translategemma:latest',

		// API key — leave empty if your server does not require auth
		apiKey: '',
	});
}

OllamaTranslator.__proto__ = BaseLLMTranslator;

(globalThis as any).translator = OllamaTranslator;
