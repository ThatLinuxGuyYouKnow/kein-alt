document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const saveButton = document.getElementById('saveButton');
    const statusMessage = document.getElementById('status');

    // Load the saved username (if any) when the popup opens
    chrome.storage.sync.get(['mainUsername'], (result) => {
        if (result.mainUsername) {
            usernameInput.value = result.mainUsername;
        }
    });

    // Save the username when the button is clicked
    saveButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            // Save the username to storage
            chrome.storage.sync.set({ mainUsername: username }, () => {
                statusMessage.textContent = 'Username saved successfully!';
                statusMessage.style.color = 'green';
            });
        } else {
            statusMessage.textContent = 'Please enter a valid username.';
            statusMessage.style.color = 'red';
        }
    });
});