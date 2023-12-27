chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received!");
  if (message.action === "replaceText") {
    console.log("Replace text action!");
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   chrome.scripting.executeScript({
    //     target: { tabId: tabs[0].id },
    //     function: replaceText,
    //   });
    // });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "translateText" });
    });
  }
});

// function replaceText() {
//   console.log("Replace text function!");
//   chrome.runtime.sendMessage({ action: "translateText" });
// }
