class ChatGPTTranslator {
    constructor(model = 'gpt-4o', openApiKey = "") {
        this.apiKey = openApiKey;
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.model = model;
    }

    async translate(text, from, to) {
        if (!text) return '';

        const prompt = (from === 'auto' || from === '')
            ? `Translate text to ${to}. Only return the translation without any additional text:\n\n${text}`
            : `Translate text from ${from} to ${to}. Only return the translation without any additional text:\n\n${text}`;

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

            return data.choices[0].message.content.trim();

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
            'en', 'ru', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'uk', 'cs', 
            'sv', 'da', 'fi', 'no', 'hu', 'ro', 'el', 'bg', 'sr', 'hr', 'sk', 
            'sl', 'lt', 'lv', 'et'
        ];
    }
}

ChatGPTTranslator;
