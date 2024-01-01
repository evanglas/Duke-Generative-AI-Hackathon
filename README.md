# Elucidate

Elucidate is a Chrome extension to change the reading level and language of selected text using GPT-3.5.

## Description

Elucidate may be used to convert highlighted text on any website to a different reading level, language, or both. When activated, this extension deletes selected text on a website, calls the OpenAI API for a translated version, then places the new text in the original text's place. Elucidate will generally complete a translation within a few seconds, however, the translation time will increase roughly linearly with the length of the selected text. We anticipate three main use cases for this extension:

1. To convert pieces of text to more approachable versions for those developing their reading skills.
2. To covert technically-dense passages into more generally accessible translations.
3. To facilitate learning another language by enabling a user to practice reading text in their target language at a comfortable reading level.

This project represents a continuation of our submission to the Duke Generative AI Hackathon [(Hackathon DevPost)](https://devpost.com/software/elucidate-ycvbs5).

## Usage

1. Pin the Elucidate extension to the Chrome bookmarks bar.
2. Click on the Elucidate logo in the bookmarks bar to toggle the visibility of the Elucidate UI.
3. The Elucidate logo should be visible on the bottom left corner of the Chrome Window. Click on the logo to access the Elucidate UI.
4. Highlight a selection of text you would like to translate.
5. Choose a desired language and reading level in the UI.
6. If you have access to an OpenAPI secret key, please save that key using the appropriate input. Any provided API key remains completely on local storage and is secured via the Chrome storage API. As Elucidate has limited API credits, we would prefer that users use their own key when possible. Otherwise, you may check the box next to "Use default API key" to use an Elucidate-provided API key.
7. Click "Translate Text", wait a moment, and the translation should soon appear in the selected text's place.
