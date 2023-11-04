// popup.js
document.addEventListener('DOMContentLoaded', function() {
  var language = document.getElementById('language-select');
  var readingLevel = document.getElementById('reading-level-select');

  // Add event listeners or logic to handle the selection
  // For example, storing the selection of language or reading level
});

// content.js
const extensionIcon = document.createElement('img');
extensionIcon.src = chrome.runtime.getURL('images/reading_48.png');
extensionIcon.style.cssText = `
position: fixed;
bottom: 10px;
left: 10px;
width: 48px;
height: 48px;
cursor: pointer;
z-index: 100000; // Ensure the icon is above most content
`;

extensionIcon.addEventListener('click', function() {
const popup = window.open(chrome.runtime.getURL('popup.html'), 'extension_popup', 'width=300,height=400,status=no,scrollbars=yes,resizable=no');
// Adjust window.open parameters as needed
});

document.body.appendChild(extensionIcon);