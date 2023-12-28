async function insertUI() {
  console.log("Inserting UI");
  try {
    const response = await fetch(chrome.runtime.getURL("ui.html"));
    const uiHtml = await response.text();

    const uiContainer = document.createElement("div");
    uiContainer.innerHTML = uiHtml;

    document.body.appendChild(uiContainer);
  } catch (error) {
    console.error("Failed to load UI:", error);
  }
  console.log("UI inserted");

  const elucidateLogo = document.getElementById("elucidateLogo");
  elucidateLogo.src = chrome.runtime.getURL("icons/48.png");
  elucidateLogo.addEventListener("click", toggleUI);

  const translateButton = document.getElementById("translateButton");
  translateButton.addEventListener("click", translateSelection);
}

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

  let text_response = "";
  try {
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
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
    const apiKey = document.getElementById("apiKey").value;
    const language = document.getElementById("languageSelect").value;
    const readingLevel = document.getElementById("rlSelect").value;
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

insertUI();
