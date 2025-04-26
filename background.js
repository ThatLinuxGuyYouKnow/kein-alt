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
          const existingOverlay = Array.from(document.querySelectorAll('div'))
            .find(div =>
              div.style.backgroundColor === 'black' &&
              div.style.position === 'fixed' &&
              div.style.top === '0px' &&
              div.style.left === '0px' &&
              div.style.width === '100%' &&
              div.style.height === '100%' &&
              div.style.zIndex === '10000'
            );



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




          const profileBtn = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.trim() === 'Likes' || el.textContent.trim() === 'Edit profile');

          const isLoggedIn = profileBtn


          if (isLoggedIn) {
            alert('User is logged in');
            // Keep overlay if logged in
          } else {

            // Remove overlay if not logged in
            if (existingOverlay) existingOverlay.remove();
            alert('User is not logged in');
          }
        }
      },
      );
    }, 5000); // 2-second delay to ensure dynamic content loads
  }
});