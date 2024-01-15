let tabStates = {};

chrome.action.onClicked.addListener((tab) => {
  if (!tabStates[tab.id]) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
    tabStates[tab.id] = true;
  }
  chrome.tabs.sendMessage(tab.id, { action: "toggleUIContainer" });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStates[tabId];
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    tabStates[tabId] = false; // Reset the state for this tab
  }
});
