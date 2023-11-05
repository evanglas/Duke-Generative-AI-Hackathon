// icon
const extensionIcon = document.createElement("img");
extensionIcon.src = chrome.runtime.getURL("images/reading_128.png");
extensionIcon.style.cssText = `
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 100000;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

// popup
const popup = document.createElement("div");
popup.style.cssText = `
  display: none;
  position: fixed;
  width: 300px;
  height: 250px;
  overflow: auto;
  bottom: 60px;
  right: 10px;
  background-color: #ffffff;
  color: #333333;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 100001;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  line-height: 1.4;
`;

// content
popup.innerHTML = `
  <div id="popup-container" style="text-align: center; font-size: 14px;">
    <div style="margin-bottom: 20px;">
    <label for="language-select" style="display: block; margin-bottom: 10px;"><span style="font-weight: bold;">Select Your Language:</span></label>
    <select id="language-select" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ddd; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
        <option value="English">English</option>
        <option value="Chinese">Chinese</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="Japanese">Japanese</option>
        <option value="Hindi">Hindi</option>
      </select>
    </div>

    <div style="margin-bottom: 20px;">
    <label for="reading-level-select" style="display: block; margin-bottom: 10px;"><span style="font-weight: bold;">Select Your Reading Level:</span></label>
    <select id="reading-level-select" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ddd; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
        <option value="1st Grade">1st Grade</option>
        <option value="3rd Grade">3rd Grade</option>
        <option value="5th Grade">5th Grade</option>
        <option value="7th Grade">7th Grade</option>
        <option value="9th Grade">9th Grade</option>
        <option value="11th Grade">11th Grade</option>
        <option value="College Student">College Student</option>
        <option value="College Professor">College Professor</option>
      </select>
    </div>
    
    <button id="popup-submit" style="width: 100%; padding: 10px 20px; border-radius: 5px; border: none; background-color: #55935a; color: white; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Submit</button>
  </div>
`;

document.body.appendChild(extensionIcon);
document.body.appendChild(popup);

// open when click, close after click again
extensionIcon.addEventListener("click", function (event) {
  if (popup.style.display === "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
  event.stopPropagation();
});

// close when click else where on the webpage
// window.addEventListener("click", function () {
//   if (popup.style.display === "block") {
//     popup.style.display = "none";
//   }
// });

// not close when click the popup
popup.addEventListener("click", function (event) {
  event.stopPropagation();
});

//Openai Translate the text based on the text and the level
// const OpenAI = require("openai");
const API_KEY = process.env.OPENAI_API_SECRET;
// const openai = new OpenAI({apiKey: API_KEY});

var text = "Hi, How are you today?";
let language = "";
let level = "";

// get the result after submit
document
  .getElementById("popup-submit")
  .addEventListener("click", async function () {
    language = document.getElementById("language-select").value;
    readingLevel = document.getElementById("reading-level-select").value;
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText.toString().length > 0) {
      console.log("Selected text:", selection.toString());
      let range = selection.getRangeAt(0);
      range.deleteContents();
      // Create a new span element
      var span = document.createElement("span");

      // Set the text content of the span
      span.innerHTML =
        "<br><br> Loading text " +
        "in <strong>" +
        language +
        "</strong> at <strong>" +
        readingLevel +
        "</strong> reading level...<br><br>";

      // Add CSS styles to make the text bold and a specific color
      // span.style.fontWeight = "bold"; // This will make the text bold
      // span.style.color = "#00ff00"; // This will set the text color to red, for example

      // Insert the span element into the range
      range.insertNode(span);

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

      try {
        let response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + API_KEY,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: message,
            }),
          }
        );
        let data = await response.json();

        if (data && data.choices && data.choices.length > 0) {
          let response1 = data.choices[0].message.content;
          range.deleteContents();
          range.insertNode(document.createTextNode(response1));
          // console.log(response1);
        }
      } catch (error) {
        console.log("Error");
      }
      console.log(
        "Language chosen is: ",
        language,
        "reading chosen is: ",
        readingLevel
      );
    }

    // close the popup
    // popup.style.display = "none";
  });