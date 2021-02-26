const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "sprites.png";

const config = {
  GRAVITY: 9.8,
  VELOCITY_FLOOR: -100,
  VELOCITY_OBSTACLE: -100,
  VELOCITY_JUMP: 250,
  OBSTACLE_RISE_MIN: -200,
  OBSTACLE_RISE_MAX: 100,
  TIME_NEW_OBSTACLE: 130,
  CAROUSEL_LIMIT: 14,
};

function collisionDetection(obj1, obj2) {
  if (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  ) {
    return true;
  }
  return false;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 276,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  update: (deltaTime) => {},
  render: () => {
    ctx.fillStyle = `rgb(112, 197, 205)`; // sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      sprites,
      background.spriteX,
      background.spriteY,
      background.width,
      background.height,
      background.x,
      background.y,
      background.width,
      background.height
    );
    ctx.drawImage(
      sprites,
      background.spriteX,
      background.spriteY,
      background.width,
      background.height,
      background.x + background.width,
      background.y,
      background.width,
      background.height
    );
  },
};

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
  update: (deltaTime) => {
    floor.carouselX += floor.velocityX * deltaTime;
  },
  render: () => {
    x = floor.carouselX % config.CAROUSEL_LIMIT;
    ctx.drawImage(
      sprites,
      floor.spriteX,
      floor.spriteY,
      floor.width,
      floor.height,
      x,
      floor.y,
      floor.width,
      floor.height
    );
    ctx.drawImage(
      sprites,
      floor.spriteX,
      floor.spriteY,
      floor.width,
      floor.height,
      x + floor.width,
      floor.y,
      floor.width,
      floor.height
    );
  },
};

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
      return pairOfPipes.x + pairOfPipes.width < 0;
    },
    update: (deltaTime) => {
      pairOfPipes.x += pairOfPipes.velocityX * deltaTime;
    },
    render: () => {
      ctx.drawImage(
        sprites,
        pairOfPipes.spriteDownX,
        pairOfPipes.spriteDownY,
        pairOfPipes.width,
        pairOfPipes.height,
        pairOfPipes.x,
        pairOfPipes.y - pairOfPipes.gapSpace,
        pairOfPipes.width,
        pairOfPipes.height
      );
      ctx.drawImage(
        sprites,
        pairOfPipes.spriteUpX,
        pairOfPipes.spriteUpY,
        pairOfPipes.width,
        pairOfPipes.height,
        pairOfPipes.x,
        pairOfPipes.y + pairOfPipes.height,
        pairOfPipes.width,
        pairOfPipes.height
      );
    },
  };
  return Object.assign({}, pairOfPipes);
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
    player.isJumping = true;
  },
  update: (deltaTime) => {
    if (player.isJumping) {
      player.velocityY = -player.jumpVelocity;
      player.isJumping = false;
    }
    player.velocityY += config.GRAVITY;
    player.y += player.velocityY * deltaTime;

    if (player.checkCollision([floor])) {
      player.y = floor.y - player.height;
      player.velocityY = 0;
    }
  },
  checkCollision: (sprites) => {
    let detected = false;
    sprites.forEach((obj) => {
      if (collisionDetection(player, obj)) {
        detected = true;
      }
    });
    return detected;
  },
  render: () => {
    ctx.drawImage(
      sprites,
      player.spriteX,
      player.spriteY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
  },
};

const gameState = {
  tickTime: 0,
  frame: 0,
  deltaTime: 0,
  elapsedTime: 0,
  layerBackground: [background],
  layerObstacle: [],
  layerForward: [floor, player],
  tick: (timestamp) => {
    const delta = timestamp - gameState.tickTime;
    gameState.deltaTime = delta / 1000;
    gameState.tickTime = timestamp;
    gameState.elapsedTime += delta;
    gameState.frame++;
  },
  update: () => {
    gameState.removeOldObstacle();
    gameState.createNewObstacle();
  },
  getSprites: () => {
    return [
      ...gameState.layerBackground,
      ...gameState.layerObstacle,
      ...gameState.layerForward,
    ];
  },
  removeOldObstacle: () => {
    gameState.layerObstacle = gameState.layerObstacle.filter((sprite) => {
      return !sprite.isHidden();
    });
  },
  createNewObstacle: () => {
    if (gameState.frame % config.TIME_NEW_OBSTACLE == 0)
      gameState.layerObstacle.push(
        createPairOfPipes(
          getRndInteger(config.OBSTACLE_RISE_MIN, config.OBSTACLE_RISE_MAX)
        )
      );
  },
};

canvas.addEventListener("mousedown", (e) => {
  player.jump();
});

function gameLoop(timestamp) {
  gameState.tick(timestamp);
  gameState.update();

  const spriteList = gameState.getSprites();
  spriteList.forEach((sprite) => sprite.update(gameState.deltaTime));
  spriteList.forEach((sprite) => sprite.render());

  window.requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());
