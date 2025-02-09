import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translatorCode = fs.readFileSync(
    path.resolve(__dirname, '../ChatGPTTranslator.js'),
    'utf8'
);

const ChatGPTTranslator = eval(`${translatorCode}`);

describe('ChatGPTTranslator', () => {
    let translator;
    
    beforeAll(() => {
        translator = new ChatGPTTranslator('gpt-4', process.env.OPEN_API_KEY);
    });

    test('translates text from English to Spanish', async () => {
        const text = 'Hello, world!';
        const result = await translator.translate(text, 'en', 'es');
        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
    });

    test('translates batch of texts', async () => {
        const texts = ['Hello', 'Good morning'];
        const results = await translator.translateBatch(texts, 'en', 'fr');
        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(2);
        expect(results.every(r => typeof r === 'string')).toBe(true);
    });

    test('handles empty input', async () => {
        const result = await translator.translate('', 'en', 'es');
        expect(result).toBe('');
    });

    test('handles length limit correctly', () => {
        const longText = 'a'.repeat(21000);
        expect(translator.checkLimitExceeding(longText)).toBe(1);
        expect(translator.checkLimitExceeding('short text')).toBe(0);
    });

    test('supports auto language detection', () => {
        expect(ChatGPTTranslator.isSupportedAutoFrom()).toBe(true);
    });

    test('has supported languages list', () => {
        const languages = ChatGPTTranslator.getSupportedLanguages();
        expect(Array.isArray(languages)).toBe(true);
        expect(languages).toContain('en');
        expect(languages).toContain('es');
    });

    test('translates ambiguous word correctly', async () => {
        const text = 'light';
        const result = await translator.translate(text, 'en', 'ru');
        expect(result.toLowerCase()).toBe('свет');
    });

    test('translates technical phrase accurately', async () => {
        const text = 'The API endpoint handles POST requests with JSON payload';
        const result = await translator.translate(text, 'en', 'ru');
        expect(result).toMatch(/API/);
        expect(result).toMatch(/JSON/);
        expect(result).toMatch(/endpoint|конечная точка/i);
    });

    test('preserves technical terms in translation', async () => {
        const text = 'Debug the GraphQL query in development mode';
        const result = await translator.translate(text, 'en', 'ru');
        expect(result).toMatch(/GraphQL/);
        expect(result).toMatch(/debug|отладить|отладка|отладьте/i);
    });
}); 