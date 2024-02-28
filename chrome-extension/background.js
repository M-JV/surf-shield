chrome.runtime.onInstalled.addListener(() => {
    console.log('Chrome extension installed');
  });
  
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const url = tabs[0].url;
    console.log('URL:', url);
  
    // Send the URL to your MERN application
    // You can use fetch or XMLHttpRequest to make an HTTP request
  });
  