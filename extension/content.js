let uiContainer;
let translateButton;
let elucidateLogo;
let languageSelect;
let shadow;
let languages;
let rlSelect;

async function insertUI() {
  if (document.readyState === "loading") {
    await new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", resolve);
    });
  }

  try {
    const uiResponse = await fetch(chrome.runtime.getURL("ui.html"));
    const uiHtml = await uiResponse.text();

    const styleResponse = await fetch(chrome.runtime.getURL("ui.css"));
    const uiCss = await styleResponse.text();

    const languagesResponse = await fetch(
      chrome.runtime.getURL("languages.json")
    );
    languages = await languagesResponse.json();
    languages.sort();

    uiShadowContainer = document.createElement("div");
    document.body.appendChild(uiShadowContainer);

    uiContainer = document.createElement("div");
    const uiStyle = document.createElement("style");

    shadow = uiShadowContainer.attachShadow({ mode: "open" });

    uiStyle.textContent = uiCss;
    uiContainer.innerHTML = uiHtml;

    shadow.appendChild(uiStyle);
    shadow.appendChild(uiContainer);
  } catch (error) {
    console.error("Failed to load UI:", error);
  }

  elucidateLogo = shadow.querySelector("#elucidateLogo");
  elucidateLogo.src = chrome.runtime.getURL("icons/logo_48.png");
  elucidateLogo.addEventListener("click", toggleUI);

  translateButton = shadow.querySelector("#translateButton");
  translateButton.addEventListener("click", translateSelection);

  languageSelect = shadow.querySelector("#languageSelect");
  languages.forEach((language) => {
    const option = document.createElement("option");
    option.text = language;
    languageSelect.add(option);
  });
  languageSelect.value = "English";

  rlSelect = shadow.querySelector("#rlSelect");
}

async function toggleUIContainer() {
  if (!uiContainer) {
    await insertUI();
  }
  uiContainer.style.display =
    uiContainer.style.display === "none" ? "block" : "none";
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleUIContainer") {
    toggleUIContainer();
  }
});

async function getReplacement(language, readingLevel, selectedText) {
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

  const endpoint =
    "https://foybrayfiauncvja5ngxpfvdae0weiah.lambda-url.us-east-2.on.aws/";

  let text_response = "";
  try {
    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ",
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
  const uiForm = shadow.querySelector("#uiForm");
  if (window.getComputedStyle(uiForm).display != "block") {
    uiForm.style.display = "block";
  } else {
    uiForm.style.display = "none";
  }
}

async function translateSelection() {
  const selection = window.getSelection();
  const selectedText = selection.toString();
  let replacementText = "";
  if (selectedText.length > 0) {
    const language = languageSelect.value;
    const readingLevel = rlSelect.value;

    let range = selection.getRangeAt(0);
    range.deleteContents();

    let span = document.createElement("span");
    span.innerHTML =
      "<br><br> Loading text " +
      "in <strong>" +
      language +
      "</strong> at <strong>" +
      readingLevel +
      "</strong> reading level...<br><br>";
    range.insertNode(span);

    try {
      replacementText = await getReplacement(
        language,
        readingLevel,
        selectedText
      );
    } catch (error) {
      console.error("API call failed:", error);
    }

    range.deleteContents();
    range.insertNode(document.createTextNode(replacementText));
  }
}

insertUI();
