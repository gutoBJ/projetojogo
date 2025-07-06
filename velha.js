// let x_o1 = document.getElementById('x_o1')
// let x_o2 = document.getElementById('x_o2')
// let x_o3 = document.getElementById('x_o3')
// let x_o4 = document.getElementById('x_o4')
// let x_o5 = document.getElementById('x_o5')
// let x_o6 = document.getElementById('x_o6')
// let x_o7 = document.getElementById('x_o7')
// let x_o8 = document.getElementById('x_o8')
// let x_o9 = document.getElementById('x_o9')

const botoesVelha = document.querySelectorAll('.botao-velha')
const resultado = document.getElementById('resultado')
let contador = 0
const reco = document.getElementById("reco")

for (let i = 0; i < botoesVelha.length; i++) {
    botoesVelha[i].addEventListener('click', () => {
        if (botoesVelha[i].textContent !== '') return // Evita sobrescrever

        if (contador % 2 === 0) {
            botoesVelha[i].textContent = 'X'
        } else {
            botoesVelha[i].textContent = 'O'
        }

        contador++

        if (verificarVitoria('X')) {
            resultado.textContent = 'Jogador X venceu!'
            desativarBotoes()
            mostrarBotao()
        } else if (verificarVitoria('O')) {
            resultado.textContent = 'Jogador O venceu!'
            desativarBotoes()
            mostrarBotao()
        } else if (contador === 9) {
            resultado.textContent = 'Deu velha!'
            mostrarBotao()
        }
    })
}

function mostrarBotao() {
    reco.style.display = 'block'
}

function verificarVitoria(jogador) {
    const b = botoesVelha

    const combinacoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    return combinacoes.some(comb =>
        comb.every(indice => b[indice].textContent === jogador)
    )
}

function desativarBotoes() {
    botoesVelha.forEach(botao => botao.disabled = true)
}


reco.addEventListener("click", () => {
    window.location.hash = 'secao1'
    window.location.reload()
})



// const l1 = [x_o1, x_o2, x_o3]
// const l2 = [x_o4, x_o5, x_o6]
// const l3 = [x_o7, x_o8, x_o9]

// const velha = [l1, l2, l3]



