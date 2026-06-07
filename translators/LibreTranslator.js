/**
 * Homepage: https://github.com/LibreTranslate/LibreTranslate
 * Demo: https://libretranslate.com/
 * API docs: https://libretranslate.com/docs/
 */
class LibreTranslator {
	// URL of your instance of LibreTranslate
	// for local instance use URL "http://localhost/translate"
	apiPath = "http://localhost:5000/translate";
	// Insert API key if you have
	apiKey = "";

	translate = async (text, from, to) => {
		const translations = await this.translateBatch([text], from, to);
		return translations[0];
	};

	translateBatch = (texts, from, to) => {
		// LibreTranslate removes spaces around words
		// We detect any non-word chars around text, and trim them
		// After translation of the content we will wrap the translation into trimmed chars
		const textSegments = texts.map((text) => {
			const match = text.match(
				/^(?<start>[^\p{L}\p{N}]*)(?<content>.*?)(?<end>[^\p{L}\p{N}]*)$/su,
			);

			if (!match) return text;

			const { content, start, end } = match.groups;
			return { content: content ?? "", start, end };
		});

		return fetch(this.apiPath, {
			credentials: "omit",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
				Accept: "*/*",
				"Accept-Language": "en-US,en;q=0.5",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
				"Content-Type": "application/json",
			},
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
				q: textSegments.map((t) => t.content),
				source: from,
				target: to,
				format: "text",
				api_key: this.apiKey,
			}),
		})
			.then((r) => r.json())
			.then(({ translatedText }) => {
				if (typeof translatedText === "string")
					translatedText = [translatedText];
				if (!Array.isArray(translatedText))
					throw new TypeError("Unexpected response");

				if (translatedText.length !== textSegments.length)
					throw new RangeError(
						`Translated texts length (${translatedText.length}) does not match requested texts length (${textSegments.length})`,
					);

				return translatedText.map((content, index) => {
					const { start, end } = textSegments[index];
					return start + content + end;
				});
			});
	};

	getLengthLimit = () => 10_000;
	getRequestsTimeout = () => 50;
	checkLimitExceeding = (text) => {
		const textLength = !Array.isArray(text)
			? text.length
			: text.reduce((len, text) => len + text.length, 0);

		return textLength - this.getLengthLimit();
	};

	static isSupportedAutoFrom = () => true;
	// prettier-ignore
	static getSupportedLanguages = () => [
		"en", "ar", "az", "zh", "cs",
		"nl", "eo", "fi", "fr", "de",
		"el", "hi", "hu", "id", "ga",
		"it", "ja", "ko", "fa", "pl",
		"pt", "ru", "sk", "es", "sv",
		"tr", "uk", "vi"
	];
}

LibreTranslator;
