setInterval(function() {
    const deckList = document.getElementsByClassName('deck-list');
    const decks = deckList[0].querySelectorAll('.deck-layout-single-flex');
    for (const ribbon of decks) {
        let ribbonSelect = ribbon.querySelector('.ribbon-deck-text');
        if (ribbonSelect.textContent === "Goat Format Decks" || ribbonSelect.textContent === "Anime Decks" || ribbonSelect.textContent === "Domain Format Decks" || ribbonSelect.textContent === 'Trinity Format Decks') {
            deckList[0].removeChild(ribbon);
        }
    }
}, 1000);