const wishedCharacters = [
    "Adell",
    "Ellen Joe",
    "Bartz Klauser",
    "Yu Tendo",
    "Ouro Kronii",
    "Lighter",
    "Misogi Kumagawa",
    "Baki Hanma",
    "Fabia Sheen",
    "Masquerade",
    "Omaru Polka",
    "Emilie",
    "Green Heart",
    "Komaru Naegi",
    "Celestia Ludenberg",
    "Yelan",
    "Tifa Lockhart",
    "Aigis",
    "Chie Satonaka",
    "Alhaitham",
    "Aventurine",
    "Yuuichi Tsurugi",
    "Dante",
    "Vergil",
    "Dark Pit",
    "Ratchet",
];

const extraCharacters = [
    "Grimnir",
    "Golbez",
    "Misha (HSR)",
    "Anaxa",
    "Dr. Ratio",
    "Yanqing",
    "Silverbell Cookie",
    "Fidio Aldena",
    "Hakuryuu",
    "Jirou Sakuma",
    "Osamu Saginuma",
    "Yuuki Tachimukai",
    "Zanakurou Ichikawa",
    "Munemasa Ibuki",
    "Kyousuke Tsurugi",
    "Zanark Avalonic",
    "Mamoru Endou",
    "Taiyou Amemiya",
    "Kaeya",
    "Bennett",
    "Razor",
    "Xingqiu",
    "Kinich",
    "Axel",
    "Terra",
    "Sephiroth",
    "Izuru Kamukura",
    "K1-B0",
    "Kaito Momota",
    "Nero (DMC)",
];

let claimAvailable = true;

const claimResetMinute = 3;

const rollResetMinute = 4;

let lastRollReset = null;

let lastClaimReset = null;

let rolls = 25;

let intervalID = setInterval(() => loopThroughRolls(wishedCharacters, extraCharacters), 500);

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

    if (claimIntervals.includes(currentTime) && lastClaimReset !== currentTime) {
        console.log("CLAIM RESET AT: " + currentTime);

        rolls = 0;

        claimAvailable = true;

        lastClaimReset = currentTime;
    }
}

function rollUptime(resetMinute) {
    const rollIntervals = [];

    const periods = ["AM", "PM"];

    for (let hour = 1; hour <= 12; hour++) {
        for (const period of periods) {
            rollIntervals.push(`${hour}:${resetMinute.toString().padStart(2, "0")} ${period}`);
        }
    }

    let currentTime = getCurrentTime();

    if (rollIntervals.includes(currentTime) && lastRollReset !== currentTime) {
        console.log("ROLL RESET AT: " + currentTime);

        rolls = 25;

        lastRollReset = currentTime;
    }
}

async function rollCharacter() {
    if (rolls <= 0 || !claimAvailable) return;

    const rollBox = document.querySelector('.markup__75297.editor__1b31f.slateTextArea_ec4baf.fontSize16Padding__74017');

    if (!document.querySelector('.buttonWrapper__24af7.buttonChild_aa63ab.activeButtonChild_aa63ab')) {
        await pasteIntoElement(rollBox);

        await new Promise(res => setTimeout(res, 5000));

        if (rolls > 0 && claimAvailable) {
            document.querySelector('button[aria-label="Send Message"]').click();

            rolls--;
        }
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
    console.log('kakera claimed');

    handleClaimClick(message);

    if (message.querySelector('.emojiContainer__75abc.emojiContainerClickable__75abc:has(img[alt$="key:"])')) {
        const keyLevel = message.querySelector('.emojiContainer__75abc.emojiContainerClickable__75abc:has(img[alt$="key:"]) ~ strong').textContent;

        console.log('new key for: ' + name + " the key level is now: " + keyLevel);
    }
}


function loopThroughRolls(wishedCharacters, extraCharacters) {
    claimUptime(claimResetMinute);

    rollUptime(rollResetMinute);

    let messages = document.querySelectorAll('.messageListItem__5126c:has(img[src*="432610292342587392"])');

    //gets rid of any left over commands after a claim
    if (!claimAvailable && document.querySelector(".applicationCommand__1464f .commandName__1464f > span")) {
        document.querySelector('div.closeButton_e876a8[role="button"]').click();
    }

    if (!claimAvailable) {
        return;
    }

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

    if (rolls > 0) {
        rollCharacter().catch(console.error);
    }
}

