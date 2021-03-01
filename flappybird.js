const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "sprites.png";

const config = {
  GRAVITY: 9.8,
  VELOCITY_FLOOR: -100,
  VELOCITY_OBSTACLE: -100,
  VELOCITY_JUMP: 250,
  PIPE_FLOOR_HEIGHT_MIN: 100,
  PIPE_FLOOR_HEIGHT_MAX: 400,
  PIPE_GAP_SPACE: 100,
  TIME_NEW_OBSTACLE: 130,
  CAROUSEL_LIMIT: 14,
  FLOOR_HEIGHT: 112,
};

function collisionDetection(obj1, obj2) {
  if (
    obj1.getX() < obj2.getX() + obj2.width &&
    obj1.getX() + obj1.width > obj2.getX() &&
    obj1.getY() < obj2.getY() + obj2.height &&
    obj1.getY() + obj1.height > obj2.getY()
  ) {
    return true;
  }
  return false;
}

function isOutOfCanvas(obj) {
  if (
    obj.getX() + obj.width < 0 ||
    obj.getX() > canvas.width ||
    obj.getY() + obj.height < 0 ||
    obj.getY() > canvas.height
  ) {
    return true;
  }
  return false;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createBackground() {
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
  return background;
}

function createFloor() {
  const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - config.FLOOR_HEIGHT,
    velocityX: config.VELOCITY_FLOOR,
    velocityY: 0,
    carouselX: 0,
    getX: () => {
      return floor.x;
    },
    getY: () => {
      return floor.y;
    },
    update: (deltaTime) => {
      if (!gameState.isPlaying()) return;
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
  return floor;
}

function createSkyPipe(floorPipeHeight) {
  const pipe = {
    spriteX: 52,
    spriteY:
      169 +
      400 -
      (canvas.height -
        config.FLOOR_HEIGHT -
        floorPipeHeight -
        config.PIPE_GAP_SPACE),
    width: 52,
    height:
      canvas.height -
      config.FLOOR_HEIGHT -
      floorPipeHeight -
      config.PIPE_GAP_SPACE,
    x: canvas.width,
    y: 0,
    velocityX: config.VELOCITY_OBSTACLE,
    velocityY: 0,
    getX: () => {
      return pipe.x;
    },
    getY: () => {
      return pipe.y;
    },
    isHidden: () => {
      return pipe.x + pipe.width < 0;
    },
    update: (deltaTime) => {
      if (!gameState.isPlaying()) return;
      pipe.x += pipe.velocityX * deltaTime;
    },
    render: () => {
      ctx.drawImage(
        sprites,
        pipe.spriteX,
        pipe.spriteY,
        pipe.width,
        pipe.height,
        pipe.x,
        pipe.y,
        pipe.width,
        pipe.height
      );
    },
  };
  return Object.assign({}, pipe);
}

function createFloorPipe(floorPipeHeight) {
  const pipe = {
    spriteX: 0,
    spriteY: 169,
    width: 52,
    height: floorPipeHeight,
    x: canvas.width,
    y: canvas.height - config.FLOOR_HEIGHT - floorPipeHeight,
    velocityX: config.VELOCITY_OBSTACLE,
    velocityY: 0,
    getX: () => {
      return pipe.x;
    },
    getY: () => {
      return pipe.y;
    },
    isHidden: () => {
      return pipe.x + pipe.width < 0;
    },
    update: (deltaTime) => {
      if (!gameState.isPlaying()) return;
      pipe.x += pipe.velocityX * deltaTime;
    },
    render: () => {
      ctx.drawImage(
        sprites,
        pipe.spriteX,
        pipe.spriteY,
        pipe.width,
        pipe.height,
        pipe.x,
        pipe.y,
        pipe.width,
        pipe.height
      );
    },
  };
  return Object.assign({}, pipe);
}

function createPairOfPipes() {
  const floorPipeHeight = getRndInteger(
    config.PIPE_FLOOR_HEIGHT_MIN,
    config.PIPE_FLOOR_HEIGHT_MAX
  );
  return [
    Object.assign({}, createSkyPipe(floorPipeHeight)),
    Object.assign({}, createFloorPipe(floorPipeHeight)),
  ];
}

function createPlayer() {
  const player = {
    spriteX: 0,
    spriteY: 0,
    width: 34,
    height: 24,
    x: 10,
    y: 200,
    velocityX: 0,
    velocityY: 0,
    jumpVelocity: config.VELOCITY_JUMP,
    isJumping: false,
    getX: () => {
      return player.x;
    },
    getY: () => {
      return player.y;
    },
    jump: () => {
      player.isJumping = true;
    },
    update: (deltaTime) => {
      if (!gameState.isPlaying()) return;
      if (player.isJumping) {
        player.velocityY = -player.jumpVelocity;
        player.isJumping = false;
      }
      player.velocityY += config.GRAVITY;
      player.y += player.velocityY * deltaTime;

      if (
        player.checkCollision([gameState.floor, ...gameState.layerObstacle])
      ) {
        if (player.y + player.height > gameState.floor.y)
          player.y = gameState.floor.y - player.height;
        gameState.gameOver();
      }

      if (player.y < 0) {
        player.y = 0;
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
  return player;
}

function createStartScreen() {
  const startScreen = {
    spriteX: 134,
    spriteY: 0,
    width: 207,
    height: 191,
    x: canvas.width / 2 - 207 / 2,
    y: 100,
    update: (deltaTime) => {},
    render: () => {
      ctx.drawImage(
        sprites,
        startScreen.spriteX,
        startScreen.spriteY,
        startScreen.width,
        startScreen.height,
        startScreen.x,
        startScreen.y,
        startScreen.width,
        startScreen.height
      );
    },
  };
  return startScreen;
}

function createGameOver() {
  const gameOver = {
    spriteX: 134,
    spriteY: 153,
    width: 226,
    height: 200,
    x: canvas.width / 2 - 226 / 2,
    y: 100,
    update: (deltaTime) => {},
    render: () => {
      ctx.drawImage(
        sprites,
        gameOver.spriteX,
        gameOver.spriteY,
        gameOver.width,
        gameOver.height,
        gameOver.x,
        gameOver.y,
        gameOver.width,
        gameOver.height
      );
    },
  };
  return gameOver;
}

function createLiveScore() {
  const liveScore = {
    x: canvas.width - 10,
    y: 40,
    update: (deltaTime) => {
      if (!gameState.isPlaying()) return;
      gameState.score += deltaTime;
    },
    render: () => {
      ctx.fillStyle = "white";
      ctx.font = '30px "Press Start 2P"';
      ctx.textAlign = "right";
      ctx.fillText(`${Math.trunc(gameState.score)}`, liveScore.x, liveScore.y);
    },
  };
  return liveScore;
}

function createGameState() {
  const gameState = {
    tickTime: 0,
    frame: 0,
    score: 0,
    deltaTime: 0,
    elapsedTime: 0,
    state: "ready",
    layerBackground: [],
    layerObstacle: [],
    layerForward: [],
    layerGameOver: [],
    player: {},
    floor: {},
    liveScore: {},
    restart: () => {
      gameState.player = createPlayer();
      gameState.floor = createFloor();
      gameState.liveScore = createLiveScore();
      gameState.tickTime = 0;
      gameState.frame = 0;
      gameState.score = 0;
      gameState.deltaTime = 0;
      gameState.elapsedTime = 0;
      gameState.state = "ready";
      gameState.layerBackground = [createBackground()];
      gameState.layerObstacle = [];
      gameState.layerPlayer = [gameState.player];
      gameState.layerForward = [gameState.floor];
      gameState.layerGameOver = [createGameOver()];
      gameState.layerGameStart = [createStartScreen()];
    },
    tick: (timestamp) => {
      const delta = timestamp - gameState.tickTime;
      gameState.deltaTime = delta / 1000;
      gameState.tickTime = timestamp;
      gameState.elapsedTime += delta;
      gameState.frame++;
    },
    update: () => {
      if (gameState.isPlaying()) {
        gameState.removeOldObstacle();
        gameState.createNewObstacle();
      }
    },
    isReady: () => {
      return gameState.state === "ready";
    },
    play: () => {
      gameState.state = "playing";
    },
    isPlaying: () => {
      return gameState.state === "playing";
    },
    gameOver: () => {
      gameState.state = "gameover";
    },
    isGameOver: () => {
      return gameState.state === "gameover";
    },
    getSprites: () => {
      let _sprites = [
        ...gameState.layerBackground,
        ...gameState.layerObstacle,
        ...gameState.layerPlayer,
        ...gameState.layerForward,
      ];
      if (gameState.isPlaying()) _sprites.push(gameState.liveScore);
      if (gameState.isGameOver())
        _sprites = [..._sprites, ...gameState.layerGameOver];
      if (gameState.isReady())
        _sprites = [..._sprites, ...gameState.layerGameStart];
      return _sprites;
    },
    removeOldObstacle: () => {
      gameState.layerObstacle = gameState.layerObstacle.filter((sprite) => {
        return !sprite.isHidden();
      });
    },
    createNewObstacle: () => {
      if (gameState.frame % config.TIME_NEW_OBSTACLE == 0) {
        gameState.layerObstacle.push(...createPairOfPipes());
      }
    },
  };
  return gameState;
}

const gameState = createGameState();
gameState.restart();

canvas.addEventListener("mousedown", (e) => {
  if (gameState.state == "ready") gameState.play();
  if (gameState.state == "playing") gameState.player.jump();
  if (gameState.state == "gameover") gameState.restart();
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
