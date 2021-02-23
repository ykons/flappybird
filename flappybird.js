const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const sprites = new Image()
sprites.src = 'sprites.png'

let tickTime = 0
let gravity = 9.8

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 276,
  height: 204,
  positionX: 0,
  positionY: canvas.height - 204,
  update: (elapsedTime) => {
  },
  render: () => {
    ctx.fillStyle = `rgb(112, 197, 205)`; // sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprites, background.spriteX, background.spriteY, background.width, background.height, background.positionX, background.positionY, background.width, background.height)
    ctx.drawImage(sprites, background.spriteX, background.spriteY, background.width, background.height, background.positionX + background.width, background.positionY, background.width, background.height)
  }
}

const floor = {
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
  spriteX: 0,
  spriteY: 0,
  width: 34,
  height: 25,
  positionX: 10,
  positionY: 200,
  velocityX: 0,
  velocityY: 0,
  jumpVelocity: 250,
  isJumping: false,
  jump: () => {
    player.isJumping = true
  },
  update: (elapsedTime) => {
    if (player.isJumping){
      player.velocityY = -player.jumpVelocity
      player.isJumping = false
    }
    player.velocityY = player.velocityY + gravity
    player.positionY += player.velocityY * elapsedTime
  },
  render: () => {
    ctx.drawImage(sprites, player.spriteX, player.spriteY, player.width, player.height, player.positionX, player.positionY, player.width, player.height)
  }
}

canvas.addEventListener("mousedown", (e) => {
  player.jump()
})

let spritesList = [ background, floor, player ]

function gameLoop(timestamp) {
  const deltaTime = timestamp - tickTime
  const elapsedTime = deltaTime / 1000
  tickTime = timestamp

  spritesList.forEach(sprite => sprite.update(elapsedTime))
  spritesList.forEach(sprite => sprite.render())

  window.requestAnimationFrame(gameLoop)
}

gameLoop(performance.now())
