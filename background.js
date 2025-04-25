chrome.tabs.onUpdated.addListener(async (tabId, tab) => {

  if (tab.url && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
    console.log('User is on Twitter/X');
    chrome.storage.local.get(["username"], (result) => {
      if (result['username']) {
        chrome.tabs.update(tabId, { url: `https://x.com/${result['username']}` });
      }
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        // Check if the user is logged in (assuming a simple check for a known element)
        const isLoggedIn = document.querySelector('a[href*="/logout"]') !== null;

        if (isLoggedIn) {
          const overlay = document.createElement('div');
          overlay.style.backgroundColor = 'black';
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.zIndex = '10000';
          document.body.appendChild(overlay);
        } else {
          console.log('User is not logged in')
          // Remove any existing overlay
          const existingOverlay = document.querySelector('div[style*="position: fixed;"][style*="background-color: black;"]');
          if (existingOverlay) {
            existingOverlay.remove();
          }
        }
      }
    });

    // Redirect to user profile if on the main domain
    if (tab.url.includes('x.com') && !tab.url.includes('/')) {
      chrome.storage.sync.get(['mainUsername'], (result) => {
        if (result.mainUsername) {
          chrome.tabs.update(tabId, { url: `https://x.com/${result.mainUsername}` });
        }
      });
    }
  }

});