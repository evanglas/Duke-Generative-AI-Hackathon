// icon
const extensionIcon = document.createElement('img');
extensionIcon.src = chrome.runtime.getURL('images/reading_128.png');
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
const popup = document.createElement('div');
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
      </select>
    </div>

    <div style="margin-bottom: 20px;">
    <label for="reading-level-select" style="display: block; margin-bottom: 10px;"><span style="font-weight: bold;">Select Your Reading Level:</span></label>
    <select id="reading-level-select" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ddd; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
        <option value="Beginner">Beginner: Age 5 - 10</option>
        <option value="Intermediate">Intermediate: Age 11 - 15</option>
        <option value="Advanced">Advanced: Age 16 - 20</option>
      </select>
    </div>
    
    <button id="popup-submit" style="width: 100%; padding: 10px 20px; border-radius: 5px; border: none; background-color: #55935a; color: white; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Submit</button>
  </div>
`;

document.body.appendChild(extensionIcon);
document.body.appendChild(popup);

// open when click, close after click again
extensionIcon.addEventListener('click', function(event) {
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
    event.stopPropagation();
});

// close when click else where on the webpage
window.addEventListener('click', function() {
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    }
});

// not close when click the popup
popup.addEventListener('click', function(event) {
    event.stopPropagation();
});



//Openai Translate the text based on the text and the level
const OpenAI = require("openai");
const API_KEY = 'YOUR_API_KEY';
const openai = new OpenAI({apiKey: API_KEY});

var text = 'Hi, How are you today?';
let language = '';
let level = '';

// get the result after submit
document.getElementById('popup-submit').addEventListener('click', function() {
    language = document.getElementById('language-select').value;
    readingLevel = document.getElementById('reading-level-select').value;

    console.log("Language chosen is: ", language, "reading chosen is: ", readingLevel);
    run();

    // close the popup
    popup.style.display = 'none';
});



async function main(language, level, text) {
  try {
      // Use the parameters in your API call or any other logic
      const promptText = `Translate '${text}' into ${language} at ${level} level`;
      console.log(promptText);

      const completion = await openai.completions.create({
          model: "gpt-3.5-turbo-instruct",
          prompt: promptText,
          max_tokens: 50,  // Adjust as needed
          temperature: 0,
      });

      return completion.choices[0].text.trim();
  } catch (error) {
      console.error('Error with OpenAI request:', error);
      return "Error occurred";
  }
}

async function run() {
  console.log('hi');
  text = 'Hi! Today is a good day!';
  level = 'Beginner';
  language = 'French';
  const result = await main(language, level, text);
  console.log('Here: ', result); // This should now print the translation or "Error occurred"
}

// // listen for a request message from the content script
// chrome.runtime.onMessage.addListener(async function (request) {
//   //Get API key
//   const API_KEY = 'YOUR_API_KEY';
//   const openai = new OpenAI({apiKey: API_KEY});

//   // check if the request contains a message that the user sent a new message
//   if (request.input) {
//       // Add the user's message to the message array
//       messageArray.push({ role: "user", "content": request.input });

//       try {
//           // send the request containing the messages to the OpenAI API
//           const response = await openai.completions.create({
//             model: "gpt-3.5-turbo-instruct",
//             prompt: promptText,
//             max_tokens: 50,  // Adjust as needed
//             temperature: 0,
//         });
  
//           // check if the API response is ok Else throw an error
//           if (!response.ok) {
//               throw new Error(`Failed to fetch. Status code: ${response.status}`);
//           }

//           // get the data from the API response as json
//           let data = await response.json();

//           // check if the API response contains an answer
//           if (data && data.choices && data.choices.length > 0) {
//               // get the answer from the API response
//               let response = data.choices[0].message.content;
//               console.log(response);

//               // send the answer back to the content script
//               chrome.runtime.sendMessage({ answer: response });

//               // Add the response from the assistant to the message array
//               messageArray.push({ role: "assistant", "content": response });
//           }
//       } catch (error) {
//           // send error message back to the content script
//           chrome.runtime.sendMessage({ answer: "No answer Received: Make sure the entered API-Key is correct." });
//       }
//   }
// });

