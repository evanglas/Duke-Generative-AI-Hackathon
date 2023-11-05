// Sends a message to the content script to log the selected text.
// It then receives a message back from content.js to modify itself.

document.getElementById("getText").addEventListener("click", function () {
  console.log("clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "logText" },
      function (response) {
        console.log("in resopnse");
        if (response) {
          // Display the selected text in the popup window.
          document.getElementById("selectedText").textContent =
            response.selectedText;
        } else {
          // Handle error or no selection case.
          document.getElementById("selectedText").textContent =
            "No text selected or an error occurred.";
        }
      }
    );
  });
});
