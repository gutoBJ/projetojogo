const cards = document.querySelectorAll('.botao-memoria')
const reco2 = document.getElementById('reco2')
const mensagemFinal = document.getElementById('mensagem-final')

let cartaVirada = []

cards.forEach(card => {
    card.addEventListener("click", () => {
        const icon = card.querySelector('img')
        if (icon.style.display === "block") return

        icon.style.display = "block"
        cartaVirada.push(card)

        if (cartaVirada.length === 2) {
            const img1 = cartaVirada[0].querySelector('img').src
            const img2 = cartaVirada[1].querySelector('img').src

            if (img1 === img2) {
                cartaVirada = []
                if (verificarFimDeJogo()) {
                    mostrarMensagemDeVitoria()
                }
            } else {
                setTimeout(() => {
                    cartaVirada[0].querySelector('img').style.display = "none"
                    cartaVirada[1].querySelector('img').style.display = "none"
                    cartaVirada = []
                }, 800)
            }
        }
    })
})

function verificarFimDeJogo() {
    const todasImagens = document.querySelectorAll('.botao-memoria img')
    return [...todasImagens].every(icon => icon.style.display === "block")
}

function mostrarMensagemDeVitoria() {
    mensagemFinal.textContent = "Parabéns, você venceu o jogo da memória!"
    mensagemFinal.style.display = 'block'
    reco2.style.display = 'block'
}

reco2.addEventListener("click", () => {
    window.location.reload()
})
