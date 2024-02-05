function handleMinimizeAndMaximize() {
    const panel = this.parentNode;
    panel.classList.toggle('minimized');

    const buttonText = panel.classList.contains('minimized') ? 'maximize' : 'minimize';
    this.innerText = buttonText;
}

const panelsContainer = document.querySelector('div.pb-1.flex.items-center.overflow-auto._calculator_177jp_1 > div');

if (panelsContainer) {
    const panels = panelsContainer.childNodes;

    for (const panel of panels) {
        const btn = document.createElement('button');
        btn.innerText = "minimize";
        
        btn.classList.add('minimaxButton');

        btn.addEventListener('click', handleMinimizeAndMaximize);

        panel.insertBefore(btn, panel.firstChild);
    }
}

