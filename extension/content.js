//This method tries to scrape the text on the website
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "logText") {
      const selectedText = window.getSelection().toString();
      if (selectedText.length > 0) {
        console.log("Selected text:", selectedText);
        sendResponse({ selectedText: selectedText });
        // You can also do something else with the selected text here
      }
    }
  });