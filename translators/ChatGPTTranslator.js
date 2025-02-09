class ChatGPTTranslator {
    constructor(model = 'gpt-4o', openApiKey = "") {
        this.apiKey = openApiKey;
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.model = model;
    }

    async translate(text, from, to) {
        if (!text) return '';

        const prompt = (from === 'auto' || from === '')
            ? `Translate to ${to}. Reply in JSON: {"translation": "translated text"}. No explanations. No comments. Guess the source language.\n\nText: "${text}"`
            : `Translate from ${from} to ${to}. Reply in JSON: {"translation": "translated text"}. No explanations. No comments. Guess the source language.\n\nText: "${text}"`;

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3
                })
            });

            const data = await response.json();
            
            if (!data.choices || !data.choices[0]?.message?.content) {
                console.error("API error:", data);
                return '';
            }

            try {
                const parsed = JSON.parse(data.choices[0].message.content);
                return parsed.translation || '';
            } catch (e) {
                console.error("Failed to parse translation response:", data.choices[0].message.content);
                return '';
            }

        } catch (error) {
            console.error("Translation request failed:", error);
            return '';
        }
    }

    async translateBatch(texts, from, to) {
        if (!Array.isArray(texts) || texts.length === 0) return [];

        return Promise.all(texts.map(text => this.translate(text, from, to)));
    }

    getLengthLimit() {
        return 20000;
    }

    getRequestsTimeout() {
        return 1000;
    }

    checkLimitExceeding(text) {
        if (Array.isArray(text)) {
            return text.some(t => t.length > this.getLengthLimit()) ? 1 : 0;
        }
        return text.length > this.getLengthLimit() ? 1 : 0;
    }

    static isSupportedAutoFrom() {
        return true;
    }

    static getSupportedLanguages() {
    return [
        'en',  // English
        'ru',  // Russian
        'de',  // German
        'fr',  // French
        'es',  // Spanish
        'it',  // Italian
        'pt',  // Portuguese
        'nl',  // Dutch
        'pl',  // Polish
        'uk',  // Ukrainian
        'cs',  // Czech
        'sv',  // Swedish
        'da',  // Danish
        'fi',  // Finnish
        'no',  // Norwegian
        'hu',  // Hungarian
        'ro',  // Romanian
        'el',  // Greek
        'bg',  // Bulgarian
        'sr',  // Serbian
        'hr',  // Croatian
        'sk',  // Slovak
        'sl',  // Slovenian
        'lt',  // Lithuanian
        'lv',  // Latvian
        'et'   // Estonian
    ];
    }
}

ChatGPTTranslator;
