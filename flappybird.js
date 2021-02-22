const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const sprites = new Image()
sprites.src = 'sprites.png'

function gameLoop(timestamp) {
  ctx.drawImage(sprites, 0, 0, 34, 25, 10, 200, 34, 25)

  window.requestAnimationFrame(gameLoop)
}

gameLoop(performance.now())
