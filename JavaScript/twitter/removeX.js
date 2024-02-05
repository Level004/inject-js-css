document.querySelector('link[rel="shortcut icon"]').href = '//abs.twimg.com/favicons/twitter.2.ico';

function checkCondition() {
    if (document.querySelector('title').textContent.includes("/ X")) {
        let title = document.querySelector('title').textContent;
        document.querySelector('title').textContent = title.replace('/ X', '/ Twitter');
    }

    if (document.querySelector('title').textContent.includes("X:")) {
        let title = document.querySelector('title').textContent;
        document.querySelector('title').textContent = title.replace('X:', 'Twitter:');
    }

}

const intervalId = setInterval(checkCondition, 60);