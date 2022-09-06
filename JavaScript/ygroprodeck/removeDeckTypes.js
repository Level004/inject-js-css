const ad1 = document.getElementById('footer-banner-desktop');
const ad2 = document.getElementById('header-banner-desktop');
ad1.remove();
ad2.remove();

setInterval(function () {
    const deckList = document.getElementsByClassName('deck-list');
    const decks = deckList[0].querySelectorAll('.deck-layout-single-flex');
    for (const ribbon of decks) {
        let ribbonSelect = ribbon.querySelector('.ribbon-deck-text');
        if (ribbonSelect.textContent === "Goat Format Decks" || ribbonSelect.textContent === "Anime Decks") {
            deckList[0].removeChild(ribbon);
        }
    }
}, 1000);