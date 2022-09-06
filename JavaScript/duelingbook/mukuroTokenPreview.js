const previewclass = '.preview .cardfront~#preview_txt .os-content.selectable.os-textarea';
const link = "https://images.duelingbook.com/tokens/7.jpg";
setInterval(function () {
    //mukuro token
    let card = document.querySelector('.preview .pic');
    let pic = card.getAttribute('src');
    if (pic === link) {
        if (document.querySelector(previewclass) !== null) {
            document.querySelector(previewclass).classList.add("mukuro");
        }
    } else {
        document.querySelector(previewclass).classList.remove("mukuro");
    }

}, 300);