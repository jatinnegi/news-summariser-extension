chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("indianexpress.com")) {
    chrome.tabs.sendMessage(tabId, {
      type: "TAB_UPDATE",
    });
  }
});
