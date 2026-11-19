# FionViber Offline Translator

[GitHub Pages](https://fionviber.github.io/OfflineTranslator/) · [Cloudflare Pages](https://fionviber-translation-models.pages.dev/)

Translate text locally in a browser using Bergamot and Firefox Translations BASE models. The site has English, Simplified Chinese and Traditional Chinese interfaces.

Choose a direction and select **Translate**. The page downloads only the models needed for that direction. Some language pairs translate through English. The browser can reuse previously cached models. Text is processed by a WebAssembly worker on your device.

The model catalog contains 11 direct directions across Arabic, German, English, Japanese, Korean, Lithuanian, Russian and Simplified Chinese. It follows the exact `base` architecture entries in Mozilla's model registry snapshot dated 19 November 2026.

## Model files

The `v2/` directory contains compressed model chunks of up to 16 MiB. GitHub Pages reads chunks from this repository's Raw URLs. Cloudflare Pages reads chunks from its own project. The browser verifies binary sizes and SHA-256 before using them.

The Bergamot and Firefox Translations notices and the model provenance manifest are in `licenses/`.
