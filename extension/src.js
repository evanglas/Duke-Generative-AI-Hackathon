// var selectedText = "";

// document.addEventListener("mouseup", function () {
//     selectedText = getSelectedText();
//     if (selectedText) {
//         document.getElementById("selectedText").textContent = "Selected Text: " + selectedText;
//     }
// });

// // This button will trigger the logging of the selected text
// document.getElementById("logTextBtn").addEventListener("click", function() {
//     console.log("Selected Text from button click: " + selectedText);
// });


// function getSelectedText() {
//     var text = "";
//     if (window.getSelection) {
//         text = window.getSelection().toString();
//     } else if (document.selection && document.selection.type != "Control") {
//         text = document.selection.createRange().text;
//     }
//     return text;
// }


document.getElementById('print-text').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: printSelectedText
      });
    });
  });
  
  function printSelectedText() {
    const selection = window.getSelection().toString();
    if (selection) {
      console.log('Selected text:', selection);
    }
  }