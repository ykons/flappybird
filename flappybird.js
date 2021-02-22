const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const sprites = new Image()
sprites.src = 'sprites.png'

let tickTime = 0
let gravity = 0.09

const background = {
  image: null,
  spriteX: 390,
  spriteY: 0,
  width: 276,
  height: 204,
  positionX: 0,
  positionY: canvas.height - 204,
  update: (elapsedTime) => {
  },
  render: () => {
    ctx.drawImage(sprites, background.spriteX, background.spriteY, background.width, background.height, background.positionX, background.positionY, background.width, background.height)
    ctx.drawImage(sprites, background.spriteX, background.spriteY, background.width, background.height, background.positionX + background.width, background.positionY, background.width, background.height)
  }
}

const floor = {
  image: null,
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  positionX: 0,
  positionY: canvas.height - 112,
  update: (elapsedTime) => {
  },
  render: () => {
    ctx.drawImage(sprites, floor.spriteX, floor.spriteY, floor.width, floor.height, floor.positionX, floor.positionY, floor.width, floor.height)
    ctx.drawImage(sprites, floor.spriteX, floor.spriteY, floor.width, floor.height, floor.positionX + floor.width, floor.positionY, floor.width, floor.height)
  }
}

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
  ctx.fillStyle = `rgb(112, 197, 205)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update(elapsedTime)
  floor.update(elapsedTime)
  player.update(elapsedTime)

  background.render()
  floor.render()
  player.render()
  
  window.requestAnimationFrame(gameLoop)
}

gameLoop(performance.now())
