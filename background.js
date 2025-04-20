chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (tab.url && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
      console.log('User is on Twitter/X');
      // You can add further actions here, like injecting content scripts.
    }
  }
});