document.addEventListener("DOMContentLoaded", function () {
    let toggle = document.getElementById("toggle");

    // Get stored setting
    chrome.storage.local.get("enabled", function (data) {
        toggle.checked = data.enabled || false;
    });

    // Toggle functionality
    toggle.addEventListener("change", function () {
        chrome.storage.local.set({ enabled: toggle.checked });
    });
});
