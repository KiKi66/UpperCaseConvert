chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertToUppercase",
    title: "Convert to Uppercase",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToUppercase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertSelectionToUppercase,
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "convert-to-uppercase") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: convertSelectionToUppercase,
      });
    });
  }
});

function convertSelectionToUppercase() {
  let selection = window.getSelection().toString();
  if (selection) {
    let uppercased = selection.toUpperCase();
    document.execCommand("insertText", false, uppercased);
  } else {
    alert("Please select some text first.");
  }
}
