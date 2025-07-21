const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const game = document.getElementById("game")
const over = document.querySelector('.alinhar-over')
const spanAtual = document.getElementById("atual");
const spanMelhor = document.getElementById("melhor");

let pontuacao = 0;

let isJumping = false;
let velocity = 0;
let gravity = 0.6;
let jumpStrength = -10;
let dinoPosition = 135;

// Lógica de pulo com física
function updateDinoPosition() {
    if (isJumping) {
        velocity += gravity;
        dinoPosition += velocity;

        if (dinoPosition >= 135) {
            dinoPosition = 135;
            isJumping = false;
        }

        dino.style.top = `${dinoPosition}px`;
    }
}

setInterval(updateDinoPosition, 20);

let intervaloPontuacao = setInterval(() => {
    if (!gameOver) {
        pontuacao++;
        spanAtual.textContent = `Atual: ${pontuacao}`;

        // Atualiza a melhor pontuação
        if (pontuacao > melhor) {
            melhor = pontuacao;
            spanMelhor.textContent = `Melhor: ${melhor}`;
        }
    }
}, 100); // Aumenta 1 ponto a cada 100ms


let gameOver = false;

function jump() {
    if (!dino.classList.contains("jump") && !gameOver) {
        dino.classList.add("jump")

        setTimeout(function () {
            dino.classList.remove("jump")
        }, 300)
    }

    if (!isJumping && !gameOver) {
        velocity = jumpStrength;
        isJumping = true;
    }
}

function verificarColisao() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    // Verifica se os retângulos colidem
    const colidiu = (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top &&
        dinoRect.top < cactusRect.bottom
    );

    if (colidiu) {
        over.style.visibility = 'visible'
        gameOver = true;
        clearInterval(isAlive);
        clearTimeout(tempoParaVencer);
        cactus.style.animation = "none"; // Para a animação
        clearInterval(intervaloPontuacao);
        dino.style.backgroundImage = "./assets/New Piskel-20250721-165241.piskel"
    }
}


let isAlive = setInterval(verificarColisao, 10);

game.addEventListener("click", function () {
    jump()
})