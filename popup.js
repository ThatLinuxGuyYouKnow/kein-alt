document.addEventListener('DOMContentLoaded', () => {
    const newUserSection = document.getElementById('newUserSection');
    const returningUserSection = document.getElementById('returningUserSection');
    const savedUsernameSpan = document.getElementById('savedUsername');
    const usernameInput = document.getElementById('username');
    const saveButton = document.getElementById('saveButton');
    const changeButton = document.getElementById('changeUsername');
    const statusMessage = document.getElementById('status');

    // Check for existing username
    chrome.storage.sync.get(['mainUsername'], (result) => {
        if (result.mainUsername) {
            // Show returning user UI
            newUserSection.style.display = 'none';
            returningUserSection.style.display = 'block';
            savedUsernameSpan.textContent = result.mainUsername;
        } else {
            // Show new user UI
            newUserSection.style.display = 'block';
            returningUserSection.style.display = 'none';
        }
    });

    // Event listeners
    saveButton.addEventListener('click', saveUsername);
    changeButton.addEventListener('click', () => {
        // Remove stored username and show input
        chrome.storage.sync.remove('mainUsername', () => {
            statusMessage.textContent = 'Username removed. Please enter a new one.';
            statusMessage.style.color = 'green';
            newUserSection.style.display = 'block';
            returningUserSection.style.display = 'none';
            usernameInput.value = '';
        });
    });

    function saveUsername() {
        const username = usernameInput.value.trim();
        if (username) {
            chrome.storage.sync.set({ mainUsername: username }, () => {
                statusMessage.textContent = 'Username saved successfully!';
                statusMessage.style.color = 'green';
                console.log('saved succeess')
                // Switch to returning user view
                newUserSection.style.display = 'none';
                returningUserSection.style.display = 'block';
                savedUsernameSpan.textContent = username;
            });
        } else {
            console.log('saved failed')
            statusMessage.textContent = 'Please enter a valid username.';
            statusMessage.style.color = 'red';
        }
    }
});
