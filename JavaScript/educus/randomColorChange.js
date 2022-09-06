const sideBar = document.getElementsByClassName("navigation navigation--student");
const topBar = document.getElementsByClassName("header-toolbar");

function randomBg() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    sideBar[0].style.backgroundColor = "#" + randomColor;
    topBar[0].style.backgroundColor = "#" + randomColor;
}