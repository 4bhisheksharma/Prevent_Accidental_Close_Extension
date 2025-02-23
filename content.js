function beforeUnloadHandler(event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave?";
    return event.returnValue;
}

// Function to attach or remove event based on toggle status
function updateUnloadEvent(enabled) {
    if (enabled) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
    } else {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
}

// Load stored state when the page loads
chrome.storage.local.get("enabled", function (data) {
    updateUnloadEvent(data.enabled);
});

// Listen for tab activation and reapply event
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        chrome.storage.local.get("enabled", function (data) {
            updateUnloadEvent(data.enabled);
        });
    }
});

// Listen for toggle changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        updateUnloadEvent(changes.enabled.newValue);
    }
});
