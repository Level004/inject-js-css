let intervalID = setInterval(loopThroughRolls, 500);

let claimAvailable = true;

function rollUptime() {
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        minutes = minutes.toString().padStart(2, "0");

        return `${hours}:${minutes} ${ampm}`;
    }
    const rollIntervals = [
        "2:12 AM", "5:12 AM", "8:12 AM", "11:12 AM",
        "2:12 PM", "5:12 PM", "8:12 PM", "11:12 PM"
    ];

    if (rollIntervals.some(time => getCurrentTime() === time)) {
        console.log('CLAIM RESET')
        claimAvailable = true;
    }`
}

function loopThroughRolls() {
    if(claimAvailable) {
        console.log('true boop!')
    } else {
        console.log('false beep!');
    }

    rollUptime();

    const belowValue = [
        'Zanakurou Ichikawa',
        'Sakura Nozaki',
        'Paige Katra',
        'Morimura Konoha',
        'Hilary Flail'
    ];

    const otherSeries = [
        'Kamen Rider',
        'Saint Seiya',
        'Sentai',
        'Disgaea'
    ];

    const value = 32;
    //let found = false;

    let messages = document.querySelectorAll(
        '.messageListItem__5126c:has(img[src*="432610292342587392"])'
    );

    for (const message of messages) {
        if (!message.classList.contains('gotClicked') && claimAvailable === true) {
            let messageContent = message.querySelector('.markup__75297.messageContent_c19a55');
            let authorName = message.querySelector('.embedAuthorName__623de');
            let embedDescription = message.querySelector('.embedDescription__623de > span');
            let embedValue = message.querySelector('.embedDescription__623de > strong > span');

            function elementClick() {
                message.querySelector('button').click();
                message.classList.add('gotClicked');

                console.log('found');
                console.log(message);
                //found = true;
                claimAvailable = false;
            };

            if (messageContent.textContent === 'Wished by (Series) @naoto & naoto & naoto & naoto') {
                if (authorName && embedDescription) {
                    if (otherSeries.some(name => embedDescription.textContent.includes(name))) {
                        elementClick();
                    }

                    if (embedDescription.textContent.includes('Inazuma Eleven')) {
                        if (parseInt(embedValue.textContent) >= value || belowValue.some(name => authorName.textContent.includes(name))) {
                            elementClick();
                        }
                    }
                }
            }
        }
    }

    //if (found) {
    //  clearInterval(intervalID);
    //console.log("Stopped interval.");
    //}
}
