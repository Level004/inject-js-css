const targetDiv = document.querySelector('.rpBJOHq2PR60pnwJlUyP0');

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if the added node is a <div>
            const addedNodes = Array.from(mutation.addedNodes);
            const addedDivs = addedNodes.filter(node => node.tagName && node.tagName.toLowerCase() === 'div');

            // Perform actions for the added <div> elements
            addedDivs.forEach(div => {
                if (div.querySelector('span[style="border: 1px solid rgb(164, 167, 168); color: rgb(164, 167, 168);"]')) {
                    if (div.querySelector('a[data-testid="outbound-link"]')) {
                        const noBlurLink = div.querySelector('a[data-testid="outbound-link"]').getAttribute('href');
                        const blurredImage = div.querySelector('img[alt="Post image"]');

                        blurredImage.setAttribute('src', noBlurLink);
                    } else {
                        const blurredImage = div.querySelector('img[alt="Post image"]');
                        const url = div.querySelector('div[data-click-id="media"] > img');
                        const urlText = url.getAttribute('src');
                        const match = urlText.match(/\/([^\/?]+)\?blur/);

                        if (match) {
                            const result = match[1];
                            blurredImage.setAttribute('src', `https://i.redd.it/${result}`);
                        }
                    }
                }
            });
        }
    }
});

const observerConfig = {childList: true};
observer.observe(targetDiv, observerConfig);
