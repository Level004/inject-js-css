const playerBarSong = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar");

let URL = window.location.href;
let p = document.createElement("p");

function checkCondition() {
    let nextSong = document.querySelector("#contents > ytmusic-player-queue-item[selected]").nextSibling;
    let nextSongName = nextSong.querySelector('.song-title.style-scope.ytmusic-player-queue-item').textContent;
    let currentSong = document.querySelector("#contents > ytmusic-player-queue-item[selected] .song-title.style-scope.ytmusic-player-queue-item").textContent;

    if (!document.getElementById('nextSongId')) {
        p.textContent = "Next song: " + nextSongName;
        p.setAttribute("id", "nextSongId");
        playerBarSong.appendChild(p);
    }
    
    if (URL !== window.location.href || document.getElementById('nextSongId').textContent.includes(currentSong)) {
        URL = window.location.href;
        nextSong = document.querySelector("#contents > ytmusic-player-queue-item[selected]").nextSibling;
        nextSongName = nextSong.querySelector('.song-title.style-scope.ytmusic-player-queue-item').textContent;
        currentSong = document.querySelector("#contents > ytmusic-player-queue-item[selected] .song-title.style-scope.ytmusic-player-queue-item").textContent;
        document.getElementById('nextSongId').textContent = "Next song: " + nextSongName;
    }
}

const intervalId = setInterval(checkCondition, 100);
