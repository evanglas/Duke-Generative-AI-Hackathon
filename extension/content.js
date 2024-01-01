let uiContainer;
let apiKeyInput;
let apiKeyButton;
let translateButton;
let elucidateLogo;
let currentApiKey;
let defaultKeyButton;
let languageSelect;

async function insertUI() {
  try {
    const response = await fetch(chrome.runtime.getURL("ui.html"));
    const uiHtml = await response.text();

    uiContainer = document.createElement("div");
    uiContainer.innerHTML = uiHtml;

    document.body.appendChild(uiContainer);
  } catch (error) {
    console.error("Failed to load UI:", error);
  }

  elucidateLogo = document.getElementById("elucidateLogo");
  elucidateLogo.src = chrome.runtime.getURL("icons/logo_48.png");
  elucidateLogo.addEventListener("click", toggleUI);

  translateButton = document.getElementById("translateButton");
  translateButton.addEventListener("click", translateSelection);

  apiKeyButton = document.getElementById("apiKeyButton");
  apiKeyButton.addEventListener("click", saveApiKey);

  apiKeyInput = document.getElementById("apiKeyInput");
  apiKeyInput.addEventListener("input", apiKeyChanged);
  enterSavedKey();

  defaultKeyButton = document.getElementById("defaultKeyButton");
  defaultKeyButton.addEventListener("click", toggleDefaultKey);

  languageSelect = document.getElementById("languageSelect");
  rlSelect = document.getElementById("rlSelect");
}

function toggleUIContainer() {
  uiContainer.style.display =
    uiContainer.style.display === "none" ? "block" : "none";
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleUIContainer") {
    toggleUIContainer();
  }
});

async function getReplacement(apiKey, language, readingLevel, selectedText) {
  let message = [
    {
      role: "system",
      content:
        "Your job is to translate text to " +
        language +
        " at the following reading level: " +
        readingLevel,
    },
    { role: "user", content: selectedText },
  ];

  let endpoint;

  if (apiKey) {
    endpoint = "https://api.openai.com/v1/chat/completions";
  } else {
    endpoint =
      "https://foybrayfiauncvja5ngxpfvdae0weiah.lambda-url.us-east-2.on.aws/";
  }

  let text_response = "";
  try {
    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: message,
      }),
    });
    let data = await response.json();
    if (data && data.choices && data.choices.length > 0) {
      text_response = data.choices[0].message.content;
    }
  } catch (error) {
    console.log("Error");
  }
  return text_response;
}

function toggleUI() {
  const uiContainer = document.getElementById("uiForm");
  if (uiContainer.style.display != "block") {
    uiContainer.style.display = "block";
  } else {
    uiContainer.style.display = "none";
  }
}

async function translateSelection() {
  const selection = window.getSelection();
  const selectedText = selection.toString();
  let replacementText = "";
  if (selectedText.length > 0) {
    let range = selection.getRangeAt(0);
    range.deleteContents();
    const apiKey = defaultKeyButton.checked ? null : apiKeyInput.value;
    const language = languageSelect.value;
    const readingLevel = rlSelect.value;
    try {
      replacementText = await getReplacement(
        apiKey,
        language,
        readingLevel,
        selectedText
      );
    } catch (error) {
      console.error("API call failed:", error);
    }
    range.insertNode(document.createTextNode(replacementText));
  }
}

function saveApiKey() {
  const apiKey = apiKeyInput.value;
  chrome.storage.sync.set({ apiKey: apiKey }, function () {
    console.log("API key saved");
  });
  currentApiKey = apiKey;
  apiKeyButton.textContent = "✓";
  apiKeyButton.disabled = true;
}

function apiKeyChanged() {
  const apiKey = apiKeyInput.value;
  if (apiKey != currentApiKey) {
    apiKeyButton.disabled = false;
    apiKeyButton.textContent = "Save";
  } else {
    apiKeyButton.disabled = true;
    apiKeyButton.textContent = "✓";
  }
}

function enterSavedKey() {
  chrome.storage.sync.get(["apiKey"], function (result) {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
      apiKeyButton.disabled = true;
      currentApiKey = result.apiKey;
      apiKeyButton.textContent = "✓";
    }
  });
}

function toggleDefaultKey() {
  if (defaultKeyButton.checked) {
    apiKeyInput.disabled = true;
    apiKeyButton.disabled = true;
  } else {
    apiKeyInput.disabled = false;
    apiKeyButton.disabled = false;
    apiKeyChanged();
  }
}

insertUI();
