function convertToEmbedURL(url) {
    return url.replace(/watch\?v=/, "embed/");
}

function injectEmbedIframe() {
    const playerElement = document.getElementById("player");

    if (!playerElement) return;

    const playerWidth = playerElement.offsetWidth;
    const playerHeight = playerWidth * 0.5625
    playerElement.innerHTML = "";

    const embedIframe = document.createElement('iframe');
    embedIframe.width = playerWidth;
    embedIframe.height = playerHeight;
    embedIframe.src = convertToEmbedURL(window.location.href);
    embedIframe.setAttribute("allowfullscreen", "");

    playerElement.appendChild(embedIframe);
}

function checkURLChange() {
    const currentURL = window.location.href;

    if (currentURL.includes("watch") && checkURLChange.previousURL !== currentURL) {
        injectEmbedIframe();
        checkURLChange.previousURL = currentURL;
    }
}

function handleWindowResize() {
    const playerElement = document.getElementById("player");

    if (!playerElement) return;

    const primaryInnerElement = document.getElementById("primary-inner");
    if (!primaryInnerElement) return;

    const newWidth = primaryInnerElement.offsetWidth;
    const newHeight = newWidth * 0.5625;

    playerElement.querySelector('iframe').width = newWidth;
    playerElement.querySelector('iframe').height = newHeight;
}

injectEmbedIframe();

setInterval(checkURLChange, 1000);

window.addEventListener('resize', handleWindowResize);

