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