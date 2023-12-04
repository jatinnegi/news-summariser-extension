async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  return tabs[0];
}

chrome.runtime.onMessage.addListener(function (obj, sender, response) {
  const { type } = obj;
  const generateBtn = document.getElementById("generate-btn");

  switch (type) {
    case "COMPLETE":
      generateBtn.style.opacity = 1;
      generateBtn.style.pointerEvents = "all";
      break;
    default:
      break;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const generateBtn = document.getElementById("generate-btn");
  const originalBtn = document.getElementById("original-btn");

  if (activeTab.url && activeTab.url.includes("indianexpress.com/article")) {
    generateBtn.addEventListener("click", () => {
      generateBtn.style.opacity = 0.8;
      generateBtn.style.pointerEvents = "none";
      chrome.tabs.sendMessage(activeTab.id, {
        type: "GENERATE",
      });
    });

    originalBtn.addEventListener("click", () => {
      chrome.tabs.sendMessage(activeTab.id, { type: "SHOW_ORIGINAL" });
    });
  }
});
