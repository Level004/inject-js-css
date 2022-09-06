function setSound() {
    const okSoundUrl = "https://custom-db.yugioh.app/assets/pollo.mp3";
    const chatIncoming = 'https://cdn.discordapp.com/attachments/778713288099889154/1005448571291697182/PolAnoNe.mp3';
    (window.unsafeWindow || window).Ok = okSoundUrl;
    (window.unsafeWindow || window).ChatInbound = chatIncoming;
}

setSound();