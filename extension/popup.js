document.getElementById("replaceButton").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "replaceText" });
});
