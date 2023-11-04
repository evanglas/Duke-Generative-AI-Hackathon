// document.getElementById('print-text').addEventListener('click', () => {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.scripting.executeScript({
//         target: {tabId: tabs[0].id},
//         function: printSelectedText
//       });
//     });
//   });
  
//   function printSelectedText() {
//     const selection = window.getSelection().toString();
//     if (selection) {
//       console.log('Selected text:', selection);
//     }
//   }
  document.addEventListener('mouseup', function () {
    var selectedText = window.getSelection().toString();
    if (selectedText !== '') {
        // Send the selected text to the destination page
        window.localStorage.setItem('selectedText', selectedText);
    }
});