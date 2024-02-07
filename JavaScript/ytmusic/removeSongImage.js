const css = '#main-panel { display: none !important; } #player-page>div>div.side-panel.modular.style-scope.ytmusic-player-page, #player-page>div>div.side-panel.modular.style-scope.ytmusic-player-page>tp-yt-paper-tabs, #tab-renderer, #side-panel { margin: 0 !important; width: 100vw !important; }';
const styleElement = document.createElement('style');
const head = document.head || document.getElementsByTagName('head')[0];

styleElement.setAttribute('id', 'noImageStyle')
styleElement.innerHTML = css;

function noImage() {
    const noImageButon = document.getElementById('noImage');
    const noImageStyle = document.getElementById('noImageStyle');
    if (noImageStyle) {
        noImageButon.innerText = "Remove Image";
        noImageStyle.remove();
    } else {
        noImageButon.innerText = "Restore Image";
        head.appendChild(styleElement);
    }
}

