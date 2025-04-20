chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (tab.url && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
      console.log('User is on Twitter/X');
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
          const overlay = document.createElement('div');
          overlay.style.backgroundColor = 'black';
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.zIndex = '10000';
          document.body.appendChild(overlay);
        }
      });

    }
  }
});