function beforeUnloadHandler(event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave?";
    return event.returnValue; // Display the confirmation dialog
}

function updateUnloadEvent(enabled) {
    if (enabled) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
    } else {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
}

// Load stored state and set the unload event when the extension is loaded
chrome.storage.local.get("enabled", function (data) {
    updateUnloadEvent(data.enabled);
});

// Reapply the unload event when the visibility changes
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        chrome.storage.local.get("enabled", function (data) {
            updateUnloadEvent(data.enabled);
        });
    }
});

// Listen for changes to the storage
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        updateUnloadEvent(changes.enabled.newValue);
    }
});
