chrome.runtime.onInstalled.addListener(async () => {
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: cs.js,
      });
    }
  }
});

// chrome.action.onClicked.addListener((tab) => {
//   const replacementText = "text";
//   if (replacementText !== null) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: (replacementText) => {
//         chrome.runtime.sendMessage({
//           action: "replaceText",
//           text: replacementText,
//         });
//       },
//       args: [replacementText],
//     });
//   }
// });
