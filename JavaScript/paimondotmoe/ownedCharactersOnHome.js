const sidebar = document.querySelector('.paimon-bg + div');
const homeButton = sidebar.querySelector('.relative.py-2 + a');
const unlockedChars = [
    'amber',
    'barbara',
    'candace',
    'collei',
    'diona',
    'dori',
    'kaeya',
    'keqing',
    'layla',
    'lisa',
    'ningguang',
    'noelle',
    'heizou',
    'thomna',
    'traveler',
    'xiangling',
    'xingqiu',
    'xinyan',
];

function lockCharacters() {
    let farmToday = document.querySelector(".__grid--masonry .bg-item.rounded-xl.p-4.flex.flex-col > table");
    let allIcons = farmToday.querySelectorAll('tr td:last-child a img:first-child');
    for (const char of allIcons) {
        const contains = unlockedChars.some(element => {
            return !!char.getAttribute('alt').includes(element);
        });
        if (contains === false) {
            char.classList.add("locked");
        }
    }
}

lockCharacters();

homeButton.addEventListener("click", ()=> {
    lockCharacters();
});
