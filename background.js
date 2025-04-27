chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Redirect logic (consider adding login check here if needed)
  if (changeInfo.url) {
    const url = changeInfo.url;
    if (url.includes('twitter.com') || url.includes('x.com')) {
      chrome.storage.local.get(['username'], ({ username }) => {
        if (!username) return;
        const targetUrl = `https://x.com/${username}`;
        if (url !== targetUrl) {
          chrome.tabs.update(tabId, { url: targetUrl });
        }
      });
    }
  }

  // Overlay and login check logic
  if (changeInfo.status === 'complete' && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        // Check if overlay already exists
        let overlay = document.querySelector('.overlay-div');
        if (!overlay) {
          // Create overlay
          overlay = document.createElement('div');
          overlay.className = 'overlay-div';
          Object.assign(overlay.style, {
            backgroundColor: 'black',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '10000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          });

          const logo = document.createElement('img');
          logo.src = 'https://img.icons8.com/ios-filled/500/twitterx--v1.png';
          Object.assign(logo.style, {
            width: '120px',
            height: 'auto',
            opacity: '0.85',
            pointerEvents: 'none'
          });

          overlay.appendChild(logo);
          document.body.appendChild(overlay);
        }

        // Check login status using Twitter's DOM attributes
        const observer = new MutationObserver(() => {
          const loggedInElement = document.querySelector('a[href="/compose/tweet"][data-testid="SideNav_NewTweet_Button"]');
          if (loggedInElement) {
            console.log
            overlay.remove();
            observer.disconnect();
          }
        });

        // Start observing the document body
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Fallback: Remove overlay after 15s if not logged in
        setTimeout(() => {
          if (document.contains(overlay)) {
            overlay.remove();
          }
        }, 15000);
      }
    });
  }
});