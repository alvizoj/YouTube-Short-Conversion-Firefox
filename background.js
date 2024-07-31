// When user navigates on the same tab, open in a new tab
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        tab.active &&
        tab.url.startsWith("https://www.youtube.com/shorts")
    ) {
        const videoId = tab.url.split("/shorts/")[1];
        const redirectURL = `https://www.youtube.com/watch?v=${videoId}`;

        browser.tabs.goBack();
        browser.tabs.create({ url: redirectURL });
    }
});

// When user opens in a new tab, redirect that tab
browser.tabs.onCreated.addListener((tab) => {
    if (
        tab.status === "complete" &&
        tab.title.startsWith("youtube.com/shorts/")
    ) {
        const videoId = tab.title.split("/shorts/")[1];
        const redirectURL = `https://www.youtube.com/watch?v=${videoId}`;

        browser.tabs.update(tab.id, { url: redirectURL });
    }
});
