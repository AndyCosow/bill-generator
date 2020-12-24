const container = document.querySelector('.container')
const holyButton = document.querySelector('.hollyButton')
const audio = new Audio('./assets/holy.mp3');

holyButton.addEventListener('mouseover', hoverButton)
holyButton.addEventListener('mouseout', removeShadow)

let int
let shadowSize = 150
let opacity = 0
let trigger = true

function hoverButton() {
    int = setInterval(() => {
        shadowSize > 250 ? trigger = false : null
        shadowSize < 150 ? trigger = true : null
        trigger ? shadowSize += 2 : null
        !trigger ? shadowSize -= 2 : null
        opacity < 1 ? opacity += 0.05 : null
        container.style.boxShadow = `0px 0px ${shadowSize}px 0px rgb(255, 237, 174, ${opacity})`
    }, 50)
    return audio.play();
}

function removeShadow() {
    clearInterval(int)
    opacity = 0
    container.style.boxShadow = 'none'
    audio.pause()
    audio.currentTime = 0
}