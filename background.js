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

    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {

          const overlay = document.createElement('div');
          overlay.className = 'overlay-div';
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




          const existingOverlay = document.querySelector('.overlay-div');
          const profileBtn = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.trim() === 'Likes' || el.textContent.trim() === 'Edit profile');

          const isLoggedIn = profileBtn

          if (isLoggedIn) {
            alert('User is logged in');
          } else {
            existingOverlay.replaceWith("")
            alert('User is not logged in');
          }
        }
      },
      );
    }, 10000);
  }
});