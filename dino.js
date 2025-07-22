// Seleciona os elementos do jogo
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const game = document.getElementById("game");
const over = document.querySelector('.alinhar-over'); // tela de Game Over
const botaoRecomecar = document.getElementById("rec"); // botão de reiniciar

// Elementos de pontuação
const spanAtual = document.getElementById("atual");
const spanMelhor = document.getElementById("melhor");

// Variáveis de controle do pulo
let isJumping = false;       // se o dino está pulando
let velocity = 0;            // velocidade atual do pulo
let gravity = 0.6;           // força da gravidade
let jumpStrength = -10;      // força do pulo
let dinoPosition = 140;      // posição inicial do dino (top)
const groundLevel = 140;     // altura do chão

// Variáveis de pontuação
let pontuacao = 0;
let melhor = localStorage.getItem("melhorPontuacao") || 0; // melhor pontuação salva
spanMelhor.textContent = `Melhor: ${melhor}`;

// Variáveis de controle
let intervaloPontuacao; // loop da pontuação
let isAlive;             // loop da verificação de colisão
let gameOver = false;    // se o jogo acabou

// Atualiza a posição do dino simulando física de pulo
function updateDinoPosition() {
    if (isJumping) {
        velocity += gravity;             // aplica gravidade
        dinoPosition += velocity;        // atualiza posição vertical

        // Quando encostar no chão
        if (dinoPosition >= groundLevel) {
            dinoPosition = groundLevel;
            isJumping = false;
        }

        // Aplica a nova posição no estilo CSS
        dino.style.top = `${dinoPosition}px`;
    }
}
// Executa a função acima a cada 20ms
setInterval(updateDinoPosition, 20);

// Inicia a contagem da pontuação
intervaloPontuacao = setInterval(() => {
    if (!gameOver) {
        pontuacao++; // aumenta pontuação atual
        spanAtual.textContent = `Atual: ${pontuacao}`;

        // Se bater o recorde
        if (pontuacao > melhor) {
            melhor = pontuacao;
            localStorage.setItem("melhorPontuacao", melhor);
            spanMelhor.textContent = `Melhor: ${melhor}`;
        }
    }
}, 100); // pontuação aumenta a cada 100ms

// Função que executa o pulo
function jump() {
    // Só pula se não estiver pulando e o jogo não tiver acabado
    if (!isJumping && !gameOver) {
        velocity = jumpStrength;
        isJumping = true;
    }
}

// Verifica colisão entre o dino e o cacto
function verificarColisao() {
    const dinoRect = dino.getBoundingClientRect();     // área do dino
    const cactusRect = cactus.getBoundingClientRect(); // área do cacto

    // Ajustes para tornar a hitbox mais justa
    const margemHorizontal = 8;
    const margemVertical = 10;

    // Reduz o tamanho do retângulo do cacto para colisão mais precisa
    const cactusHitbox = {
        left: cactusRect.left + margemHorizontal,
        right: cactusRect.right - margemHorizontal,
        top: cactusRect.top + margemVertical,
        bottom: cactusRect.bottom - margemVertical
    };

    // Verifica se as hitboxes colidem
    const colidiu = (
        dinoRect.right > cactusHitbox.left &&
        dinoRect.left < cactusHitbox.right &&
        dinoRect.bottom > cactusHitbox.top &&
        dinoRect.top < cactusHitbox.bottom
    );

    // Se colidiu e o jogo ainda não acabou
    if (colidiu && !gameOver) {
        gameOver = true;

        // Para a animação e fixa o cacto no lugar exato
        const cactusLeft = window.getComputedStyle(cactus).getPropertyValue("left");
        cactus.style.animation = "none";
        cactus.style.left = cactusLeft;

        // Para os loops de verificação e pontuação
        clearInterval(isAlive);
        clearInterval(intervaloPontuacao);

        // Troca a imagem do dino para estática (dino morto)
        dino.style.backgroundImage = 'url("./assets/New Piskel.png")';

        // Exibe a tela de Game Over
        over.style.visibility = 'visible';
    }
}
// Verifica colisão a cada 10ms
isAlive = setInterval(verificarColisao, 10);

// Evento de recomeçar o jogo
botaoRecomecar.addEventListener("click", () => {
    // Restaura a animação do cacto
    cactus.style.animation = "block 3s infinite linear";
    cactus.style.left = "";

    // Restaura a imagem do dino
    dino.style.backgroundImage = 'url("./assets/New Piskel.png")';

    // Recarrega a página
    window.location.reload();
});

// Evento de clique na área do jogo faz o dino pular
game.addEventListener("click", jump);
