const API_KEY = "";
let language = "Korean";
let readingLevel = "Elementary School";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("content.js message received!");
  if (message.action === "translateText") {
    let selection = window.getSelection();
    let selectedText = selection.toString();
    let replacementText = "";
    if (selectedText.length > 0) {
      let range = selection.getRangeAt(0);
      range.deleteContents();
      try {
        replacementText = await getReplacement(
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
});

function injectUI() {
  const uiContainer = document.createElement("div");
  uiContainer.innerHTML = `
      <div id="my-extension-ui" style="background-color: white; position: fixed; bottom: 10px; right: 10px; z-index: 1000;">
        hi
      </div>
    `;

  document.body.appendChild(uiContainer);
}

injectUI();

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

  let text_response = "";
  try {
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
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

// let selection = window.getSelection();
// let selectedText = selection.toString();
// if (selectedText.length > 0) {
//   let range = selection.getRangeAt(0);
//   range.deleteContents();

//   // Create a new span element
//   var span = document.createElement("span");

//   // Set the text content of the span
//   span.innerHTML =
//     "<br><br> Loading text " +
//     "in <strong>" +
//     language +
//     "</strong> at <strong>" +
//     readingLevel +
//     "</strong> reading level...<br><br>";

//   // Add CSS styles to make the text bold and a specific color
//   // span.style.fontWeight = "bold"; // This will make the text bold
//   // span.style.color = "#00ff00"; // This will set the text color to red, for example

//   // Insert the span element into the range
//   range.insertNode(span);

//   let message = [
//     {
//       role: "system",
//       content:
//         "Your job is to translate text to " +
//         language +
//         " at the following reading level: " +
//         readingLevel,
//     },
//     { role: "user", content: selectedText },
//   ];

//   try {
//     let response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + API_KEY,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: message,
//       }),
//     });
//     let data = await response.json();
//     if (data && data.choices && data.choices.length > 0) {
//       let response1 = data.choices[0].message.content;
//       range.deleteContents();
//       range.insertNode(document.createTextNode(response1));
//     }
//   } catch (error) {
//     console.log("Error");
//   }
//   //   console.log(
//   //     "Language chosen is: ",
//   //     language,
//   //     "reading chosen is: ",
//   //     readingLevel
//   //   );

//   range.insertNode(document.createTextNode("hi"));
//   console.log("Selected text:", selectedText);
//   //   document.body.innerHTML = document.body.innerHTML.replace(selectedText, "Hi");
// }
