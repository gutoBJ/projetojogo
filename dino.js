const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")

let gameOver = false;

function jump() {
    if (!dino.classList.contains("jump") && !gameOver) {
        dino.classList.add("jump")

        setTimeout(function () {
            dino.classList.remove("jump")
        }, 300)
    }
}

let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over!");
        gameOver = true;
        clearInterval(isAlive)
    }
}, 10)

document.addEventListener("click", function () {
    jump()
})