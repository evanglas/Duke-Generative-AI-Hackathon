var selectedText = "";

document.addEventListener("mouseup", function () {
    selectedText = getSelectedText();
    if (selectedText) {
        document.getElementById("selectedText").textContent = "Selected Text: " + selectedText;
    }
});

// This button will trigger the logging of the selected text
document.getElementById("logTextBtn").addEventListener("click", function() {
    console.log("Selected Text from button click: " + selectedText);
});


function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}