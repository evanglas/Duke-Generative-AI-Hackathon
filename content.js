// Has access to the DOM of the current tab
function replaceSelectedText(replacementText) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(replacementText));
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "logText") {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText.toString().length > 0) {
      console.log("Selected text:", selection.toString());
      sendResponse({ selectedText: selection.toString() });
      // You can also do something else with the selected text here
    }
    if (selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode("hi"));
    }
  }
});
