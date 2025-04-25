chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;

  const url = changeInfo.url;
  if (url.includes('twitter.com') || url.includes('x.com')) {
    chrome.storage.local.get(['username'], ({ username }) => {
      if (!username) return;

      const targetUrl = `https://x.com/${username}`;
      if (url !== targetUrl) {
        chrome.tabs.update(tabId, { url: targetUrl });
      }
    });

    // ← Use `func`, not `function`
    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const isLoggedIn = !!document.querySelector('a[href*="/logout"]');
        const existingOverlay = document.querySelector(
          'div[style*="position: fixed;"][style*="background-color: yellow;"]'
        );

        if (isLoggedIn) {
          if (!existingOverlay) {
            const overlay = document.createElement('div');
            Object.assign(overlay.style, {
              backgroundColor: 'black',
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: '10000',
            });
            document.body.appendChild(overlay);
          }
        } else {
          console.log('User is not logged in');
          if (existingOverlay) existingOverlay.remove();
        }
      },
    });
  }
});
