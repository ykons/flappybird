const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const sprites = new Image()
sprites.src = 'sprites.png'

let tickTime = 0

const player = {
  image: null,
  spriteX: 0,
  spriteY: 0,
  width: 34,
  height: 25,
  positionX: 10,
  positionY: 200,
  update: (deltaTime) => {
  },
  render: () => {
    ctx.drawImage(sprites, player.spriteX, player.spriteY, player.width, player.height, player.positionX, player.positionY, player.width, player.height)
  }
}

function gameLoop(timestamp) {
  let deltaTime = timestamp - tickTime
  tickTime = timestamp

  player.update(deltaTime)
  player.render()
  
  window.requestAnimationFrame(gameLoop)
}

gameLoop(performance.now())
