document.addEventListener('DOMContentLoaded', () => {
    const newUserSection = document.getElementById('newUserSection');
    const returningUserSection = document.getElementById('returningUserSection');
    const savedUsernameSpan = document.getElementById('savedUsername');
    const usernameInput = document.getElementById('username');
    const saveButton = document.getElementById('saveButton');
    const changeButton = document.getElementById('changeUsername');
    const statusMessage = document.getElementById('status');
    chrome.storage.local.get(["username"], (result) => {
        if (result['username']) {
            newUserSection.style.display = 'none';
            returningUserSection.style.display = 'block';
            savedUsernameSpan.textContent = result.mainUsername;

            console.log('found saved username')
        } else {
            console.log(result.username)
            console.log('No username saved')
            // Show new user UI
            newUserSection.style.display = 'block';
            returningUserSection.style.display = 'none';
        }
    });


    // Event listeners
    saveButton.addEventListener('click', saveUsername);
    changeButton.addEventListener('click', () => {
        // Remove stored username and show inputa
        chrome.storage.sync.remove('username', () => {
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
            chrome.storage.local.set({
                username: username

            }, () => {
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
