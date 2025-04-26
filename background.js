chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only proceed when the URL changes
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

  if (changeInfo.status === 'complete' && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
    // Wait a bit for dynamic content to load before checking
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          const existingOverlay = document.querySelector(
            'div[style*="position: fixed; height: 100%; width: 100%"][style*="background-color: black;"]'
          );

          // Create overlay if it doesn't exist
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



          const profileBtn = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.trim() === 'Likes' ||
              el.textContent.trim() === 'Profile' ||
              el.textContent.trim() === 'Edit profile');

          const isLoggedIn = !!profileBtn ||
            !!document.querySelector('a[href="/compose/tweet"]') ||
            !!document.querySelector('a[data-testid="SideNav_NewTweet_Button"]');

          if (isLoggedIn) {
            alert('User is logged in');
            // Keep overlay if logged in
          } else {
            alert('User is not logged in');
            // Remove overlay if not logged in
            if (existingOverlay) existingOverlay.remove();
          }
        }
      },
      );
    }, 2000); // 2-second delay to ensure dynamic content loads
  }
});