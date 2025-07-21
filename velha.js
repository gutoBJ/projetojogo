// let x_o1 = document.getElementById('x_o1')
// let x_o2 = document.getElementById('x_o2')
// let x_o3 = document.getElementById('x_o3')
// let x_o4 = document.getElementById('x_o4')
// let x_o5 = document.getElementById('x_o5')
// let x_o6 = document.getElementById('x_o6')
// let x_o7 = document.getElementById('x_o7')
// let x_o8 = document.getElementById('x_o8')
// let x_o9 = document.getElementById('x_o9')

// Seleciona todos os botões da grade do jogo da velha
const botoesVelha = document.querySelectorAll('.botao-velha')

// Seleciona o elemento onde será exibido o resultado (vitória ou empate)
const resultado = document.getElementById('resultado')

// Contador de jogadas (serve para alternar entre X e O)
let contador = 0

// Seleciona o botão de reiniciar o jogo
const reco = document.getElementById("reco")

// Loop para adicionar evento de clique em cada botão do tabuleiro
for (let i = 0; i < botoesVelha.length; i++) {
    botoesVelha[i].addEventListener('click', () => {
        // Se o botão já estiver preenchido, não faz nada (evita sobrescrever X ou O)
        if (botoesVelha[i].textContent !== '') return

        // Alterna entre X e O dependendo do contador
        if (contador % 2 === 0) {
            botoesVelha[i].textContent = 'X' // Jogador X
        } else {
            botoesVelha[i].textContent = 'O' // Jogador O
        }

        // Incrementa o número de jogadas
        contador++

        // Verifica se o jogador X venceu
        if (verificarVitoria('X')) {
            resultado.textContent = 'Jogador X venceu!'
            desativarBotoes() // Impede novos cliques
            mostrarBotao()    // Mostra botão de reiniciar
        }
        // Verifica se o jogador O venceu
        else if (verificarVitoria('O')) {
            resultado.textContent = 'Jogador O venceu!'
            desativarBotoes()
            mostrarBotao()
        }
        // Se todas as casas estiverem preenchidas e ninguém venceu, deu velha
        else if (contador === 9) {
            resultado.textContent = 'Deu velha!'
            mostrarBotao()
        }
    })
}

// Mostra o botão de reiniciar o jogo
function mostrarBotao() {
    reco.style.display = 'block'
}

// Função que verifica se o jogador informado venceu
function verificarVitoria(jogador) {
    const b = botoesVelha // Referência curta para os botões

    // Todas as combinações possíveis de vitória (linhas, colunas e diagonais)
    const combinacoes = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ]

    // Verifica se alguma combinação é totalmente preenchida pelo mesmo jogador
    return combinacoes.some(comb =>
        comb.every(indice => b[indice].textContent === jogador)
    )
}

// Desativa todos os botões (impede que o jogador continue clicando após o fim)
function desativarBotoes() {
    botoesVelha.forEach(botao => botao.disabled = true)
}

// Evento do botão de reiniciar o jogo
reco.addEventListener("click", () => {
    window.location.hash = 'secao1' // (opcional) pode rolar a página até o topo
    window.location.reload()        // recarrega a página inteira
})




// const l1 = [x_o1, x_o2, x_o3]
// const l2 = [x_o4, x_o5, x_o6]
// const l3 = [x_o7, x_o8, x_o9]

// const velha = [l1, l2, l3]



