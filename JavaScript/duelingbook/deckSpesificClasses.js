const deckListg = document.getElementById('decklist');
setInterval(function () {
    let cardFrontConte = document.querySelectorAll(".cardfront.unselectable");
    let selectSpright = deckListg.querySelector(".combobox.proxy.unselectable").textContent;
    let optiono = selectSpright.includes('Brave Splight');
    let option2 = selectSpright.includes('Ghoti');
    if (optiono === true) {
        for (const cardInfo of cardFrontConte) {
            cardInfo.classList.add('splight');
        }
    } else {
        for (const cardInf of cardFrontConte) {
            cardInf.classList.remove('splight');
        }
    }

    if (option2 === true) {
        for (const cardInfo of cardFrontConte) {
            cardInfo.classList.add('ghoti');
        }
    } else {
        for (const cardInf of cardFrontConte) {
            cardInf.classList.remove('ghoti');
        }
    }
}, 2000);