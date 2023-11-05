var language_chosen = shareLanguage();
var readingLevel_chosen = shareReadingLevel();
console.log('The language is: ', language_chosen, 'The level is: ', readingLevel_chosen);

//This is an object that has the information passing onto openai
const textObj = {
    language: language_chosen,
    level: readingLevel_chosen,
    text: ''
};


// //This method receives the text from the content.js
// document.getElementById("getText").addEventListener("click", function () {
//     console.log("clicked");
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { action: "logText" },
//         function (response) {
//           console.log("in resopnse");
//           if (response) {
//             // Display the selected text in the popup window.
//             document.getElementById("selectedText").textContent =
//               response.selectedText;
//               textObj.text = response.selectedText;
//           } else {
//             // Handle error or no selection case.
//             document.getElementById("selectedText").textContent =
//               "No text selected or an error occurred.";
//           }
//         }
//       );
//     });
//   });

  
document.getElementById('rephrase-button').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;
    
    // Replace 'YOUR_API_KEY' with your OpenAI API key
    const apiKey = 'YOUR-API-KEY';

    const startTime = new Date(); // Record the start time

    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: `Please rephrase the following text to make it easy to read: ${inputText}`,
            max_tokens: 50, // Adjust the max tokens based on your desired summary length
        }),
    })
    .then(response => response.json())
    .then(data => {
        const endTime = new Date(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds

        if (data && data.choices && data.choices[0] && data.choices[0].text) {
            const summary = data.choices[0].text;
            document.getElementById('rephrase').textContent = summary;
            
            // Display response time if the element exists
            const responseTimeElement = document.getElementById('response-time');
            if (responseTimeElement) {
                responseTimeElement.textContent = `Response Time: ${responseTime} ms`;
            }
        } else {
            console.error('Unexpected API response format:', data);
        }
    })
    .catch(error => console.error(error));
});

document.getElementById('translate-button').addEventListener('click', function() {
    // const inputText = document.getElementById('input-text').value;
    const inputText = textObj.text;    
    // Replace 'YOUR_API_KEY' with your OpenAI API key
    const apiKey = 'YOUR-API-KEY';

    const startTime = new Date(); // Record the start time

    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: `Please translate the following text into Spanish: ${inputText}`,
            max_tokens: 50, // Adjust the max tokens based on your desired summary length
        }),
    })
    .then(response => response.json())
    .then(data => {
        const endTime = new Date(); // Record the end time
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds

        if (data && data.choices && data.choices[0] && data.choices[0].text) {
            const summary = data.choices[0].text;
            document.getElementById('rephrase').textContent = summary;
            
            // Display response time if the element exists
            const responseTimeElement = document.getElementById('response-time');
            if (responseTimeElement) {
                responseTimeElement.textContent = `Response Time: ${responseTime} ms`;
            }
        } else {
            console.error('Unexpected API response format:', data);
        }
    })
    .catch(error => console.error(error));
});