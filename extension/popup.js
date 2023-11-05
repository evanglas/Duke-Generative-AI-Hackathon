// //Exporting the language and readingLevel to make it accessible to other javascript files
const language = '';
const readingLevel = 0;
const rephrase = '';
const translate = '';

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

// get the result after submit
document.getElementById('popup-submit').addEventListener('click', function() {
    const language = document.getElementById('language-select').value;
    const readingLevel = document.getElementById('reading-level-select').value;

    console.log("Language chosen is: ", language, "reading chosen is: ", readingLevel);

    // close the popup
    popup.style.display = 'none';
});
