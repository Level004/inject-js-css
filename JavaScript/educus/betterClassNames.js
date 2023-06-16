const main = document.querySelector('.l-full');
const lessonText = main.querySelectorAll('.agenda-class');

for (const text of lessonText) {
    const regex = /(?<=-)[^-]+(?=-)/;
    const match = text.textContent.match(regex);

    if (match) {
        switch (match[0]) {
            case "REK":
                text.textContent = "Rekenen";
                break;
            case "NED":
                text.textContent = "Nederlands";
                break;
            case "WEBTech":
                text.textContent = "Web Technologie";
                break;
            case "ION":
                text.textContent = "Inspelen Op Innovatie";
                break;
            case "COACH":
                text.textContent = "Coach";
                break;
            default:
                text.textContent = match[0];
        }
    }
}