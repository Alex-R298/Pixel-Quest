let canvas;
let ctx;
let character = new Image();


function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    character.src = "../img/Owlet_Monster/Owlet_Monster_Walk_6.png";

    ctx.drawImage (character, 20, 20, 150, 100);
}
