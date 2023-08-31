const lessonText = document.querySelector('.l-full').querySelectorAll('.agenda-class');

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
            case "WEBT":
                text.textContent = "Web Technologie";
                break;
            case "ION":
                text.textContent = "Inspelen Op Innovatie";
                break;
            case "COA":
                text.textContent = "Coach";
                break;
            case "PJ":
                text.textContent = "Projecten";
                break;
            case "F@S":
                text.textContent = "Fit@School";
                break;
            case "ONTW":
                text.textContent = "Ontwerp";
                break;
            case "PORTF":
                text.textContent = "Digitale Portfolio";
                break;
            case "DATAb":
                text.textContent = "Database ontwerp";
                break;
            default:
                text.textContent = match[0];
        }
    }
}