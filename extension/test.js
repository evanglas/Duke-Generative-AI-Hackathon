// on first install open the options page to set the API key
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.tabs.create({ url: "options.html" });
    }
});

// get the current time for context in the system message
let time = new Date().toLocaleString('en-US');

// create a system message
const systemMessage = "You are a helpful chat bot. Your answer should not be too long. current time: " + time;

// initialize the message array with a system message
let messageArray = [
    { role: "system", content: systemMessage }
];

// a event listener to listen for a message from the content script that says the user has openend the popup
chrome.runtime.onMessage.addListener(function (request) {
    // check if the request contains a message that the user has opened the popup
    if (request.openedPopup) {
        // reset the message array to remove the previous conversation
        messageArray = [
            { role: "system", content: systemMessage }
        ];
    }
});

// listen for a request message from the content script
chrome.runtime.onMessage.addListener(async function (request) {
    // check if the request contains a message that the user sent a new message
    if (request.input) {
        // get the API key from local storage
        let apiKey = await new Promise(resolve => chrome.storage.local.get(['apiKey'], result => resolve(result.apiKey)));

        // get the API model from local storage
        let apiModel = await new Promise(resolve => chrome.storage.local.get(['apiModel'], result => resolve(result.apiModel)));

        // Add the user's message to the message array
        messageArray.push({ role: "user", "content": request.input });

        try {
            // send the request containing the messages to the OpenAI API
            let response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    "model": apiModel,
                    "messages": messageArray
                })
            });

            // check if the API response is ok Else throw an error
            if (!response.ok) {
                throw new Error(`Failed to fetch. Status code: ${response.status}`);
            }

            // get the data from the API response as json
            let data = await response.json();

            // check if the API response contains an answer
            if (data && data.choices && data.choices.length > 0) {
                // get the answer from the API response
                let response = data.choices[0].message.content;

                // send the answer back to the content script
                chrome.runtime.sendMessage({ answer: response });

                // Add the response from the assistant to the message array
                messageArray.push({ role: "assistant", "content": response });
            }
        } catch (error) {
            // send error message back to the content script
            chrome.runtime.sendMessage({ answer: "No answer Received: Make sure the entered API-Key is correct." });
        }
    }
    // return true to indicate that the message has been handled
    return true;
});

        // <option value="1st Grade">1st Grade</option>
        // <option value="2nd Grade">2nd Grade</option>
        // <option value="3rd Grade">3rd Grade</option>
        // <option value="4th Grade">4th Grade</option>
        // <option value="5th Grade">5th Grade</option>
        // <option value="6th Grade">6th Grade</option>
        // <option value="7th Grade">7th Grade</option>
        // <option value="8th Grade">8th Grade</option>
        // <option value="9th Grade">9th Grade</option>
        // <option value="10th Grade">10th Grade</option>
        // <option value="11th Grade">11th Grade</option>
        // <option value="12th Grade">12th Grade</option>
     