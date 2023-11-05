const OpenAI = require("openai");

const API_KEY = 'YOUR_API_KEY';
const openai = new OpenAI({apiKey: API_KEY});

// Original text
let text = "I have an apple. I like the taste of apple.";

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
  text = 'Hi! Today is a good day!';
  level = 'Beginner';
  language = 'French';
  const result = await main(language, level, text);
  console.log('Here: ', result); // This should now print the translation or "Error occurred"
}

run();

// function changeText(newText) {
//   console.log('The new text is: ', newText);
//   const element = document.getElementById('sampleText');
//   element.textContent = newText;
// }


function changeText() {
  const element = document.getElementById('sampleText');
  element.textContent = 'The text has been changed!';
}
