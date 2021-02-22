const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const sprites = new Image()
sprites.src = 'sprites.png'

let tickTime = 0
let gravity = 0.09

const player = {
  image: null,
  spriteX: 0,
  spriteY: 0,
  width: 34,
  height: 25,
  positionX: 10,
  positionY: 200,
  velocityX: 0,
  velocityY: 10,
  update: (elapsedTime) => {
    player.velocityY = player.velocityY + player.velocityY * gravity
    player.positionY += player.velocityY * elapsedTime
  },
  render: () => {
    ctx.drawImage(sprites, player.spriteX, player.spriteY, player.width, player.height, player.positionX, player.positionY, player.width, player.height)
  }
}

function gameLoop(timestamp) {
  const deltaTime = timestamp - tickTime
  const elapsedTime = deltaTime / 1000
  tickTime = timestamp
  // clean canvas for next render
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update(elapsedTime)
  player.render()
  
  window.requestAnimationFrame(gameLoop)
}

gameLoop(performance.now())
