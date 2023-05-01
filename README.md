Translators for a [Linguist browser extension](https://github.com/translate-tools/linguist).

Directory `translators` contains files with [custom translators](https://github.com/translate-tools/linguist/blob/master/docs/CustomTranslator.md) implementations.

This modules is not embedded to a Linguist because not ready to production use, may works not stable or need configuration, like API keys.

The purpose of this list is to provide for users an alternative translators.

If you have project about text translation, you can add translator with bindings for your API to a current directory and create pull request. Read [custom translators API docs](https://github.com/translate-tools/linguist/blob/master/docs/CustomTranslator.md) to create bindings for your translation service

# How to use

See [custom translators guide](https://github.com/translate-tools/linguist/blob/master/docs/CustomTranslator.md) in Linguist repository.

# Translators list

- [LibreTranslator](./translators/LibreTranslator.js) [[github](https://github.com/LibreTranslate/LibreTranslate)] - machine translation project that may be deployed locally (read more in [Offline translation manual](../docs//manuals/OfflineTranslation.md))
- [TartuNLP](./translators/TartuNLP.js) [[github](https://github.com/TartuNLP/translation-api)] - machine translation engine developed by the NLP lab at the [University of Tartu](https://www.ut.ee/)
- [LingvaTranslator](./translators/LingvaTranslator.js) [[github](https://github.com/thedaviddelta/lingva-translate)] - google translator API proxy with [list of public instances](https://github.com/thedaviddelta/lingva-translate#instances)

## Generated translators

A directory [translators/generated](./translators/generated/) contains code of translators from stable libraries, that ready to use in Linguist and in browser at all.

Generated code may looks bloated, but this code have support.

- Alternative [Google translator](./translators/generated/GoogleTokenFree.js) implementation. Try it if you are not satisfied with embedded google translator
- [DeepL](./translators/generated/DeepL.js) - translator for service [deepl.com](https://www.deepl.com). You have to insert your personal [API key](https://www.deepl.com/account/summary) on bottom of translator code
	- **WARNING:** with DeepL you pay for each character of translated text. **If you will use DeepL translator with Linguist to translate pages**, it can cost a fortune, because [random wikipedia page](https://en.wikipedia.org/wiki/2022_World_Snooker_Championship) contains 1262634 characters, so **you will pay 25.2 EUR (`0.00002 * 1262634`) per ONE wikipedia page**

# Contribution

To build translators:
- install packages `npm install`
- build with `npm run build`

If you found bugs, please [create issue](https://github.com/translate-tools/linguist-translators/issues/new) with detailed description problem you have
