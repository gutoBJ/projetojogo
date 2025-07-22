/*
Lógica de programação 

é um conjunto de técnicas e conhecimentos 
que utilizamos para colocar instruções, informações em uma sequência lógica para chegar em um determinado resultado

Algoritmo

é a sequência lógica que crio pro meio da lógica de programação
eles precisam ser extremamente precisos e seguir uma lógica coerente, pois o computador, a máquina só vai entender se seu algoritmo estiver assim da maneira correta

Linguagem de programação

é por meio delas que escrevemos nossos algoritmos
neste caso é o javascript
*/


const item = document.querySelectorAll('.a-item')

function activeLink() {
    item.forEach((item) =>
    item.classList.remove('selecionado'))
    this.classList.add('selecionado')
}

item.forEach((item) => item.addEventListener('click', activeLink))


const sections = document.querySelectorAll('.sections')

let currentSection = 'index-link'
window.addEventListener('scroll', () => {
    sections.forEach(sections => {
        if (window.scrollY >= (sections.offsetTop - 39)) {
            currentSection = sections.id
        }
    })

    item.forEach(item => {
        if (item.href.includes(currentSection)) {
            document.querySelector('.selecionado').classList.remove('selecionado')
            item.classList.add('selecionado')
        }
    })
})