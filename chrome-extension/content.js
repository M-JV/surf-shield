chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTabUrl') {
      const url = window.location.href;
      sendResponse({ url });
    }
  });
  