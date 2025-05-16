//config
const wishedCharacters = ["Ellen Joe", "Ouro Kronii", "Misogi Kumagawa", "Baki Hanma", "Fabia Sheen", "Masquerade", "Omaru Polka", "Emilie", "Green Heart", "Komaru Naegi", "Celestia Ludenberg", "Tifa Lockhart", "Aigis", "Chie Satonaka",];

const extraCharacters = ["Wonder-Pink",];

const maxRolls = 26;

const claimResetMinute = 3;

const roulette = "hg";

//logic
let claimAvailable = true;

let rolls = maxRolls;

function getCurrentTime() {
    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;

}

function claimUptime(resetMinute) {
    const hours = [1, 4, 7, 10];

    const periods = ["AM", "PM"];

    const claimIntervals = [];

    for (const hour of hours) {
        for (const period of periods) {
            claimIntervals.push(`${hour}:${resetMinute.toString().padStart(2, "0")} ${period}`);
        }
    }

    const currentTime = getCurrentTime();

    rolls = maxRolls;

    console.log("ROLL RESET AT: " + currentTime);

    if (claimIntervals.includes(currentTime)) {
        console.log("CLAIM RESET AT: " + currentTime);

        claimAvailable = true;
    }
}

function handleClaimClick(message) {
    message.querySelector('button').click();
    if (message.querySelector('button:nth-child(2)')) {
        message.querySelector('button:nth-child(2)').click();
    }
}

function characterClaim(message, name) {
    claimAvailable = false;

    rolls = 0;

    console.log('found: ' + name);

    handleClaimClick(message);
}

function kakeraClaim(message, name) {
    handleClaimClick(message);

    if (
        message.querySelector('.emojiContainer__75abc.emojiContainerClickable__75abc:has(img[alt$="key:"])') &&
        message.querySelector('.executedCommandAvatar_c19a55[src*="314467927799627776"]') &&
        message.querySelector('.embedFooterIcon__623de[src*="314467927799627776"]')
    ) {
        const keyLevel = message.querySelector('.emojiContainer__75abc.emojiContainerClickable__75abc:has(img[alt$="key:"]) ~ strong').textContent;

        console.log('new key for: ' + name + " the key level is now: " + keyLevel);
    }
}

function checkRoll(wishedCharacters, extraCharacters) {
    const message = document.querySelector('.messageListItem__5126c:last-of-type:has(img[src*="432610292342587392"])');

    if (message) {
        let characterName = message.querySelector('.embedAuthorName__623de');

        let characterSeries = message.querySelector('.embedDescription__623de > span');

        if (characterName && characterSeries) {
            if (
                wishedCharacters.some(name => characterName.textContent === name) ||
                extraCharacters.some(name => characterName.textContent === name)
            ) {
                characterClaim(message, characterName.textContent);
            }

            if (message.querySelector('button:has([alt^="kakera"])')) {
                kakeraClaim(message, characterName.textContent);
            }
        }
    }
}

async function rollCharacter() {
    if (rolls <= 0 || !claimAvailable) return;

    if (rolls > 0 && claimAvailable) {
        document.querySelector('button[aria-label="Apps"]').click();

        await new Promise(res => setTimeout(res, 500));

        document.querySelector('div[aria-label^="Mudae I"]').click();
        await new Promise(res => setTimeout(res, 300));

        document.querySelector(`button[aria-label$=${CSS.escape(roulette)}]`).click();;
        rolls--;
    }
}

function scheduleNextRoll(resetMinute) {
    const now = new Date();

    const nextRoll = new Date();

    const currentMinute = now.getMinutes();

    nextRoll.setHours(currentMinute < resetMinute ? now.getHours() : now.getHours() + 1);

    nextRoll.setMinutes(resetMinute, 0, 0);

    const delay = nextRoll - now;

    setTimeout(() => {
        prepareNextRolls();

        setInterval(prepareNextRolls, 60 * 60 * 1000);
    }, delay);
}

async function startRolling() {
    for (let count = 0; count < maxRolls; count++) {
        await rollCharacter();

        await new Promise(res => setTimeout(res, 2000));

        checkRoll(wishedCharacters, extraCharacters);

        await new Promise(res => setTimeout(res, 1500));
    }
}

function prepareNextRolls() {
    claimUptime(claimResetMinute);

    if (rolls === maxRolls && claimAvailable) {
        startRolling();
    }
}


startRolling();

scheduleNextRoll(claimResetMinute);
