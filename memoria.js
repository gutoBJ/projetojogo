// Seleciona todos os botões do jogo da memória (as cartas)
const cards = document.querySelectorAll('.botao-memoria')

// Seleciona o botão de "Recomeçar"
const reco2 = document.getElementById('reco2')

// Seleciona o parágrafo onde será exibida a mensagem final de vitória
const mensagemFinal = document.getElementById('mensagem-final')

// Array que armazena temporariamente as cartas viradas
let cartaVirada = []

// Para cada carta (botão), adiciona um evento de clique
cards.forEach(card => {
    card.addEventListener("click", () => {
        // Seleciona a imagem dentro da carta clicada
        const icon = card.querySelector('img')

        // Se a imagem já estiver visível (carta virada), não faz nada
        if (icon.style.display === "block") return

        // Mostra a imagem (vira a carta)
        icon.style.display = "block"

        // Adiciona essa carta ao array de cartas viradas
        cartaVirada.push(card)

        // Quando duas cartas forem viradas
        if (cartaVirada.length === 2) {
            // Pega os caminhos das imagens das duas cartas
            const img1 = cartaVirada[0].querySelector('img').src
            const img2 = cartaVirada[1].querySelector('img').src

            // Se as imagens forem iguais (par encontrado)
            if (img1 === img2) {
                // Limpa o array (mantém as cartas visíveis)
                cartaVirada = []

                // Verifica se o jogo acabou (todas as cartas foram encontradas)
                if (verificarFimDeJogo()) {
                    mostrarMensagemDeVitoria()
                }
            } else {
                // Se forem diferentes, espera 800ms e vira elas de volta
                setTimeout(() => {
                    cartaVirada[0].querySelector('img').style.display = "none"
                    cartaVirada[1].querySelector('img').style.display = "none"
                    cartaVirada = []
                }, 800)
            }
        }
    })
})

// Função que verifica se todas as cartas foram viradas
function verificarFimDeJogo() {
    const todasImagens = document.querySelectorAll('.botao-memoria img')

    // Retorna true se todas as imagens estiverem visíveis
    return [...todasImagens].every(icon => icon.style.display === "block")
}

// Exibe a mensagem de vitória e o botão de reiniciar
function mostrarMensagemDeVitoria() {
    mensagemFinal.textContent = "Parabéns, você venceu o jogo da memória!"
    mensagemFinal.style.display = 'block'
    reco2.style.display = 'block'
}

// Evento do botão de recomeçar: recarrega a página
reco2.addEventListener("click", () => {
    window.location.reload()
})

