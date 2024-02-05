function updateResult(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        const childParagraph = element.querySelector('p');
        const intValueWithTilde = childParagraph.textContent.trim();
        const intValue = parseInt(intValueWithTilde.replace('~', ''), 10);
        const resultValue = '/' + Math.ceil(intValue / 40);

        const resultParagraph = element.querySelector('.result-paragraph');

        if (resultParagraph) {
            resultParagraph.textContent = resultValue;
        } else {
            const newResultParagraph = document.createElement('p');
            newResultParagraph.textContent = resultValue;
            newResultParagraph.classList.add('result-paragraph');

            element.insertBefore(newResultParagraph, childParagraph.nextSibling);
        }
    });
}

setTimeout(() => {
    const initialSelector = '.ItemPanel_resinLeft__vjB_w';

    updateResult(initialSelector);

    setInterval(() => {
        updateResult(initialSelector);
    }, 1000);
}, 600);

