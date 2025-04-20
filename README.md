# Kein Alt - Chrome Extension

## Overview

Kein Alt is a Chrome extension designed to help users manage their alternative Twitter/X accounts (alts) by providing a way to keep them private.  It currently implements a feature to redirect to the main user profile when the user navigates to the main domain (x.com).

## Features

*   **Username Saving:** Allows users to save their main Twitter/X username.
*   **Redirection:** Redirects the user to their main profile when they visit x.com.
*   **Overlay (In Development):**  Intended to add an overlay when the user is logged in to prevent accidental alt usage.

## Files

*   `popup.html`:  The HTML for the extension's popup.
*   `popup.js`:  The JavaScript for the popup, handling user input and saving the username.
*   `background.js`:  The background script that listens for URL changes and implements the redirection and overlay logic.
*   `manifest.json`:  The manifest file that defines the extension's metadata, permissions, and other settings.

## Usage

1.  **Installation:**
    *   Open Chrome and go to `chrome://extensions/`.
    *   Enable "Developer mode" in the top right corner.
    *   Click "Load unpacked" and select the directory containing the extension files.
2.  **Configuration:**
    *   Click the Kein Alt extension icon in the Chrome toolbar.
    *   Enter your main Twitter/X username and click "Save Username".
3.  **Usage:**
    *   Navigate to x.com.  You should be redirected to your main profile.

## Development

### Technologies Used

*   HTML
*   CSS
*   JavaScript
*   Chrome Extension API

### Future Improvements

*   Implement the overlay feature to prevent alt usage.
*   Add more features to manage alts.
*   Improve the UI/UX of the popup.

## License

[MIT License](LICENSE)
