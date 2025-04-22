const wishedCharacters = [
    "Ellen Joe",
    "Yu Tendo",
    "Ouro Kronii",
    "Misogi Kumagawa",
    "Baki Hanma",
    "Fabia Sheen",
    "Masquerade",
    "Omaru Polka",
    "Emilie",
    "Green Heart",
    "Komaru Naegi",
    "Celestia Ludenberg",
    "Tifa Lockhart",
    "Aigis",
    "Chie Satonaka",
];

const extraCharacters = [
    "Izuru Kamukura",
    "Kaito Momota",
];

const maxRolls = 25;

const claimResetMinute = 3;

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

async function pasteIntoElement(element) {
    try {
        const clipboardData = await navigator.clipboard.readText();

        const dataTransfer = new DataTransfer();

        dataTransfer.setData('text/plain', clipboardData);

        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true,
            cancelable: true,
        });

        element.dispatchEvent(pasteEvent);

        return true;
    } catch (error) {
        console.error("Failed to paste:", error);

        return false;
    }
}

function handleClaimClick(message) {
    message.querySelector('button').click();

    message.classList.add('gotClicked');
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

function loopThroughRolls(wishedCharacters, extraCharacters) {
    let messages = document.querySelectorAll('.messageListItem__5126c:has(img[src*="432610292342587392"])');

    for (const message of messages) {
        if (!message.classList.contains('gotClicked')) {
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
}

async function rollCharacter() {
    if (rolls <= 0 || !claimAvailable) return;

    const rollBox = document.querySelector('.markup__75297.editor__1b31f.slateTextArea_ec4baf.fontSize16Padding__74017');

    if (!document.querySelector('.buttonWrapper__24af7.buttonChild_aa63ab.activeButtonChild_aa63ab')) {
        await pasteIntoElement(rollBox);

        await new Promise(res => setTimeout(res, 300));

        if (rolls > 0 && claimAvailable) {
            document.querySelector('button[aria-label="Send Message"]').click();

            rolls--;
        }
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

        await new Promise(res => setTimeout(res, 1500));

        loopThroughRolls(wishedCharacters, extraCharacters);

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
