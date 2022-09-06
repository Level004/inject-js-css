setInterval(function() {
    let selectBattle = document.querySelector('.ps-room.ps-room-opaque');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'sidebox');
    iframe.src = "https://calc.pokemonshowdown.com/";
    if (document.querySelector('.ps-room.ps-room-opaque #sidebox') == null) {
        selectBattle.appendChild(iframe);
    }

}, 2000);