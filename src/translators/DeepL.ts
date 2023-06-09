import { DeepLTranslator as BaseDeepLTranslator, DeepLTranslatorOptions } from '@translate-tools/core/esm/translators/DeepL';

function DeepLTranslator(options: DeepLTranslatorOptions) {
	// Find your API key on page https://www.deepl.com/account/summary
	// Insert your API key here
	const apiKey = '';
	return new BaseDeepLTranslator({ ...options, apiKey });
}

DeepLTranslator.__proto__ = BaseDeepLTranslator;

DeepLTranslator;