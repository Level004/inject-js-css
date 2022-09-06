document.querySelector("#circuit_board").src = "https://cdn.discordapp.com/attachments/778713288099889154/984799051289608252/unknown.png?size=4096";
document.querySelector("#circuit_cover").remove();
document.querySelector("#greenlines").remove();
document.querySelector("#db_logo").remove();
document.querySelector("#circuit_board").style.left = "-150px";
document.querySelector("#circuit_board").style.width = "1300px";
document.querySelector("#circuit_board").style.opacity = "2";
document.querySelector("#yugioh_logo").remove();

const text = 'Level 4';
const avatar = document.getElementById('avatar1');
const lp = document.getElementById('lifepoints1');
setInterval(function () {
    //name color
    for (const span of document.querySelectorAll('span')) {
        if (!span.classList.contains("nameColor")) {
            if (span.classList.contains("username_txt")) {
                if (span.textContent.includes(text)) {
                    span.classList.add("nameColor");
                    span.textContent = "Guilliano";
                }
            }
        }
    }

    //borders and lp bar
    let span = avatar.getElementsByClassName('username_txt selectable');
    let result = span[0].textContent.includes(text);
    if (result === true) {
        $("#avatar1").css("background", "linear-gradient(360deg, #ffb694, #ffffff)");
        $("#lifepoints1").find(".life_bar").css("background", "linear-gradient(360deg, #ffb694, #ffffff)");
    } else {
        avatar.removeAttribute("style");
        lp.querySelector('.life_bar').removeAttribute("style");
    }

}, 300);
