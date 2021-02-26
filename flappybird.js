const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const sprites = new Image()
sprites.src = 'sprites.png'

const config = {
  GRAVITY: 9.8,
  VELOCITY_FLOOR: -100,
  VELOCITY_OBSTACLE: -100,
  VELOCITY_JUMP: 250,
  OBSTACLE_RISE_MIN: -200,
  OBSTACLE_RISE_MAX: 100,
  TIME_NEW_OBSTACLE: 130,
  CAROUSEL_LIMIT: 14
}

function collisionDetection(obj1, obj2) {
  if (obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y) {
      return true
  }
  return false
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function timeToNewObstacle(frame) {
  return frame % config.TIME_NEW_OBSTACLE == 0
}

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 276,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  update: (elapsedTime) => {
  },
  render: () => {
    ctx.fillStyle = `rgb(112, 197, 205)`; // sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprites, background.spriteX, background.spriteY, background.width, background.height, background.x, background.y, background.width, background.height)
    ctx.drawImage(sprites, background.spriteX, background.spriteY, background.width, background.height, background.x + background.width, background.y, background.width, background.height)
  }
}

const floor = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,
  velocityX: config.VELOCITY_FLOOR,
  velocityY: 0,
  carouselX: 0,
  update: (elapsedTime) => {
    floor.carouselX += floor.velocityX * elapsedTime
  },
  render: () => {
    x = floor.carouselX % config.CAROUSEL_LIMIT
    ctx.drawImage(sprites, floor.spriteX, floor.spriteY, floor.width, floor.height, x, floor.y, floor.width, floor.height)
    ctx.drawImage(sprites, floor.spriteX, floor.spriteY, floor.width, floor.height, x + floor.width, floor.y, floor.width, floor.height)
  }
}

function createPairOfPipes(gapHeight) {
  const pairOfPipes = {
    spriteUpX: 0,
    spriteUpY: 169,
    spriteDownX: 52,
    spriteDownY: 169,
    width: 52,
    height: 400,
    x: canvas.width,
    y: gapHeight,
    gapSpace: 100,
    velocityX: config.VELOCITY_OBSTACLE,
    velocityY: 0,
    isHidden: () => {
      return pairOfPipes.x + pairOfPipes.width < 0
    },
    update: (elapsedTime) => {
      pairOfPipes.x += pairOfPipes.velocityX * elapsedTime
    },
    render: () => {
      ctx.drawImage(sprites, pairOfPipes.spriteDownX, pairOfPipes.spriteDownY, pairOfPipes.width, pairOfPipes.height, pairOfPipes.x, pairOfPipes.y - pairOfPipes.gapSpace, pairOfPipes.width, pairOfPipes.height)
      ctx.drawImage(sprites, pairOfPipes.spriteUpX, pairOfPipes.spriteUpY, pairOfPipes.width, pairOfPipes.height, pairOfPipes.x, pairOfPipes.y + pairOfPipes.height, pairOfPipes.width, pairOfPipes.height)
    }
  }
  return Object.assign({}, pairOfPipes)
}

const player = {
  spriteX: 0,
  spriteY: 0,
  width: 34,
  height: 25,
  x: 10,
  y: 200,
  velocityX: 0,
  velocityY: 0,
  jumpVelocity: config.VELOCITY_JUMP,
  isJumping: false,
  jump: () => {
    player.isJumping = true
  },
  update: (elapsedTime) => {
    if (player.isJumping){
      player.velocityY = -player.jumpVelocity
      player.isJumping = false
    }
    player.velocityY += config.GRAVITY
    player.y += player.velocityY * elapsedTime

    if (player.checkCollision([floor])) {
      player.y = floor.y - player.height
      player.velocityY = 0
    }
  },
  checkCollision: (sprites) => {
    let detected = false
    sprites.forEach(obj => {
      if (collisionDetection(player, obj)) {
        detected = true
      }
    })
    return detected
  },
  render: () => {
    ctx.drawImage(sprites, player.spriteX, player.spriteY, player.width, player.height, player.x, player.y, player.width, player.height)
  }
}

canvas.addEventListener("mousedown", (e) => {
  player.jump()
})

let layerBackground = [ background ]
let layerObstacle = [ ]
let layerForward = [ floor, player ]
let tickTime = 0
let frame = 0

function gameLoop(timestamp) {
  const deltaTime = timestamp - tickTime
  const elapsedTime = deltaTime / 1000
  tickTime = timestamp
  frame++

  if (timeToNewObstacle(frame))
    layerObstacle.push(createPairOfPipes(getRndInteger(config.OBSTACLE_RISE_MIN, config.OBSTACLE_RISE_MAX)))

  layerObstacle = layerObstacle.filter(sprite => {
    return !sprite.isHidden()
  })

  const spritesList = [ ...layerBackground, ...layerObstacle, ...layerForward ]
  spritesList.forEach(sprite => sprite.update(elapsedTime))
  spritesList.forEach(sprite => sprite.render())

  window.requestAnimationFrame(gameLoop)
}

gameLoop(performance.now())
