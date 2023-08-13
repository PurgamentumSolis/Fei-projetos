var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")


let interval = null;
let status ="stopped"
let segundos = 0;
function timer(){
    segundos++;
    console.log(segundos);
}
function start(){
    if(status ==="stopped"){
        interval = setInterval(timer,1000);
        status ="started";
    }
}

var teclas ={};
var bola = {
    x: canvas.width /2,
    y: canvas.height /2,
    raio: 12,
    speed: 2,
    dirX: -0.5,
    dirY: 2
}
var esquerda ={
    x: 10,
    y: canvas.height/2 - 60,
    altura: 120,
    largura: 10,
    speed: 12,
    dirY: 0,
}
var direita ={
    x: canvas.width - 20,
    y: canvas.height/2 - 60,
    altura: 120,
    largura: 10,
    speed: 12,
    dirY: 0,
}
var cima ={
    x: canvas.width/2 - 60,
    y: 10,
    altura: 10,
    largura: 120,
    speed: 12
}
var baixo ={
    x: canvas.width/2 -60,
    y: canvas.height - 20,
    altura: 10,
    largura: 120,
    speed: 12
}
document.addEventListener("keydown", function(e){
    teclas[e.keyCode] = true;
});
document.addEventListener("keyup", function(e){
     delete teclas[e.keyCode];
});

function moveBloco(){
    if (87 in teclas && esquerda.y > 0)
        esquerda.y -= esquerda.speed;
    else if (83 in teclas && esquerda.y + esquerda.altura < canvas.height)
        esquerda.y += esquerda.speed;
    if (87 in teclas && direita.y > 0)
        direita.y -= direita.speed;
    else if (83 in teclas && direita.y + direita.altura < canvas.height)
        direita.y += direita.speed;
    if (65 in teclas && cima.x > 0)
        cima.x -= cima.speed;
    else if (68 in teclas && cima.x + cima.largura < canvas.width)
        cima.x += cima.speed;
    if (65 in teclas && baixo.x > 0)
        baixo.x -= baixo.speed;
    else if (68 in teclas && baixo.x + baixo.largura < canvas.width)
        baixo.x += baixo.speed;
}

function moveBola() {
    if (bola.x - bola.raio < esquerda.x + esquerda.largura && bola.y > esquerda.y && bola.y < esquerda.y + esquerda.altura)
        bola.dirX = 1;

    if (bola.x + bola.raio > direita.x && bola.y > direita.y && bola.y < direita.y + direita.altura)
        bola.dirX = -1;

    if (bola.y - bola.raio < cima.y + cima.altura && bola.x > cima.x && bola.x < cima.x + cima.largura)
        bola.dirY = 1;

    if (bola.y + bola.raio > baixo.x && bola.y + bola.raio > baixo.y && bola.x < baixo.x + baixo.largura)
        bola.dirY = -1;
    bola.x += bola.speed * bola.dirX;
    bola.y += bola.speed * bola.dirY;
    setInterval(bola.speed += 0.005, 1000);

    if (bola.x + bola.raio > canvas.width || bola.x - bola.raio < 0 || bola.y - bola.raio < 0 || bola.y + bola.raio > canvas.height)
        gameOver()
}
function gameOver(){
    alert("Game over, voce sobreviveu por : " +segundos + " segundos");
    segundos = 0
    bola.y = canvas.height/2;
    bola.x = canvas.width/2;
    bola.speed = 2;
    direita.x = canvas.width - 20;
    direita.y = canvas.height/2 - 60;
    esquerda.x = 10;
    esquerda.y = canvas.height/2 - 60;
    cima.x = canvas.width/2 - 60;
    cima.y = 10;
    baixo.x = canvas.width/2 -60;
    baixo.y = canvas.height - 20;
    teclas={ }


}
function desenho(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    moveBloco();
    moveBola();

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(bola.x, bola.y, bola.raio, 0, 2* Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fill();
    ctx.fillStyle = " green";
    ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);

    ctx.fill();
    ctx.fillStyle = "green";
    ctx.fillRect(direita.x, esquerda.y, direita.largura, direita.altura);

    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(cima.x, cima.y, cima.largura, cima.altura);

    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(baixo.x, baixo.y, baixo.largura, baixo.altura );

    requestAnimationFrame(desenho)
}
function main(){
    desenho();
    timer();
    start()
}
function cancelar(){
    bola.dirX = 0
    bola.dirY= 0
    clearInterval(interval)
}
