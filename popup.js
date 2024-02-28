// Execute vulnerability scan when popup is opened
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    if (!tab.url.startsWith("chrome://")) { // Check if the URL is not a chrome:// URL
        chrome.tabs.sendMessage(tab.id, { action: "scanVulnerabilities", url: tab.url }, function(response) {
            if (chrome.runtime.lastError) {
                console.error("Error: " + chrome.runtime.lastError.message);
                displayError("Could not establish connection. Receiving end does not exist.");
            } else if (response && response.vulnerabilities) {
                displayVulnerabilities(response.vulnerabilities);
            } else if (response && response.error) {
                displayError(response.error);
            } else {
                displayError("Unexpected response format.");
            }
        });
    } else {
        displayError("Cannot access a chrome:// URL");
    }
});

// Function to display vulnerability information
function displayVulnerabilities(vulnerabilities) {
    const vulnerabilityInfo = document.getElementById("vulnerabilityInfo");
    vulnerabilityInfo.innerHTML = "<h2>Vulnerability Scanner</h2>";
    
    // Object to store counts of each vulnerability type
    const vulnerabilityCounts = {};

    // Count vulnerabilities and store their types
    vulnerabilities.forEach(vulnerability => {
        vulnerabilityCounts[vulnerability] = (vulnerabilityCounts[vulnerability] || 0) + 1;
    });

    // Display each vulnerability type along with its count
    for (const [vulnerabilityType, count] of Object.entries(vulnerabilityCounts)) {
        vulnerabilityInfo.innerHTML += `<p>${vulnerabilityType}: ${count}</p>`;
    }

    // Display total number of vulnerabilities
    vulnerabilityInfo.innerHTML += `<p>Total Vulnerabilities: ${vulnerabilities.length}</p>`;
}

// Function to display error message
function displayError(message) {
    const vulnerabilityInfo = document.getElementById("vulnerabilityInfo");
    vulnerabilityInfo.innerHTML = `<p>Error: ${message}</p>`;
}
