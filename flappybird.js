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
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  ) {
    return true;
  }
  return false;
}

function isOutOfCanvas(obj) {
  if (
    obj.x + obj.width < 0 ||
    obj.x > canvas.width ||
    obj.y + obj.height < 0 ||
    obj.y > canvas.height
  ) {
    return true;
  }
  return false;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class AbstractSprite {
  constructor() {
    this.spriteX = 0;
    this.spriteY = 0;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  update(deltaTime) {}
  render() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Background extends AbstractSprite {
  constructor() {
    super();
    this.spriteX = 390;
    this.spriteY = 0;
    this.width = 276;
    this.height = 204;
    this.x = 0;
    this.y = canvas.height - 204;
  }
  render() {
    ctx.fillStyle = "#70c5cd"; // sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class Floor extends AbstractSprite {
  constructor() {
    super();
    this.spriteX = 0;
    this.spriteY = 610;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.y = canvas.height - config.FLOOR_HEIGHT;
    this.velocityX = config.VELOCITY_FLOOR;
    this.velocityY = 0;
    this.carouselX = 0;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    this.carouselX += this.velocityX * deltaTime;
  }
  render() {
    const x = this.carouselX % config.CAROUSEL_LIMIT;
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      x,
      this.y,
      this.width,
      this.height
    );
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class SkyPipe extends AbstractSprite {
  constructor(floorPipeHeight) {
    super();
    this.floorPipeHeight = floorPipeHeight;
    this.spriteX = 52;
    this.spriteY =
      169 +
      400 -
      (canvas.height -
        config.FLOOR_HEIGHT -
        floorPipeHeight -
        config.PIPE_GAP_SPACE);
    this.width = 52;
    this.height =
      canvas.height -
      config.FLOOR_HEIGHT -
      floorPipeHeight -
      config.PIPE_GAP_SPACE;
    this.x = canvas.width;
    this.y = 0;
    this.velocityX = config.VELOCITY_OBSTACLE;
    this.velocityY = 0;
  }
  isHidden() {
    return this.x + this.width < 0;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    this.x += this.velocityX * deltaTime;
  }
  render() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class FloorPipe extends AbstractSprite {
  constructor(floorPipeHeight) {
    super();
    this.floorPipeHeight = floorPipeHeight;
    this.spriteX = 0;
    this.spriteY = 169;
    this.width = 52;
    this.height = floorPipeHeight;
    this.x = canvas.width;
    this.y = canvas.height - config.FLOOR_HEIGHT - floorPipeHeight;
    this.velocityX = config.VELOCITY_OBSTACLE;
    this.velocityY = 0;
  }
  isHidden() {
    return this.x + this.width < 0;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    this.x += this.velocityX * deltaTime;
  }
  render() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Player extends AbstractSprite {
  constructor() {
    super();
    this.spriteX = 0;
    this.spriteY = 0;
    this.width = 34;
    this.height = 24;
    this.x = 10;
    this.y = 200;
    this.velocityX = 0;
    this.velocityY = 0;
    this.jumpVelocity = config.VELOCITY_JUMP;
    this.isJumping = false;
  }
  jump() {
    this.isJumping = true;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    if (this.isJumping) {
      this.velocityY = -this.jumpVelocity;
      this.isJumping = false;
    }
    this.velocityY += config.GRAVITY;
    this.y += this.velocityY * deltaTime;

    if (this.checkCollision([gameState.floor, ...gameState.layerObstacle])) {
      if (this.y + this.height > gameState.floor.y)
        this.y = gameState.floor.y - this.height;
      gameState.gameOver();
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
  }
  checkCollision(sprites) {
    let detected = false;
    sprites.forEach((obj) => {
      if (collisionDetection(this, obj)) {
        detected = true;
      }
    });
    return detected;
  }
  render() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class GetReady extends AbstractSprite {
  constructor() {
    super();
    this.spriteX = 134;
    this.spriteY = 0;
    this.width = 174;
    this.height = 152;
    this.x = canvas.width / 2 - 174 / 2;
    this.y = 100;
  }
}

class GameOver extends AbstractSprite {
  constructor() {
    super();
    this.spriteX = 134;
    this.spriteY = 153;
    this.width = 226;
    this.height = 200;
  }
}

class GameOverScreen {
  constructor() {
    this.gameOver = new GameOver();
    this.x = this.gameOver.x = canvas.width / 2 - 226 / 2;
    this.y = this.gameOver.y = 100;
  }
  update(deltaTime) {
    this.gameOver.update(deltaTime);
  }
  render() {
    this.gameOver.render();
    ctx.fillStyle = "#412937";
    ctx.font = '20px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(gameState.score)}`, this.x + 205, this.y + 98);
  }
}

class LiveScore {
  constructor() {
    this.x = canvas.width - 10;
    this.y = 40;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    gameState.score += deltaTime;
  }
  render() {
    ctx.fillStyle = "white";
    ctx.font = '30px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(gameState.score)}`, this.x, this.y);
  }
}

class GameState {
  static get READY() {
    return "ready";
  }
  static get PLAYING() {
    return "playing";
  }
  static get GAMEOVER() {
    return "gameover";
  }
  constructor() {
    this.tickTime = 0;
    this.frame = 0;
    this.score = 0;
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.state = GameState.READY;
    this.layerBackground = [];
    this.layerObstacle = [];
    this.layerForward = [];
    this.layerGameOver = [];
    this.player = {};
    this.floor = {};
    this.liveScore = {};
  }
  restart() {
    this.player = new Player();
    this.floor = new Floor();
    this.liveScore = new LiveScore();
    this.tickTime = 0;
    this.frame = 0;
    this.score = 0;
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.state = GameState.READY;
    this.layerBackground = [new Background()];
    this.layerObstacle = [];
    this.layerPlayer = [this.player];
    this.layerForward = [this.floor];
    this.layerGameOver = [new GameOverScreen()];
    this.layerGameStart = [new GetReady()];
  }
  tick(timestamp) {
    const delta = timestamp - this.tickTime;
    this.deltaTime = delta / 1000;
    this.tickTime = timestamp;
    this.elapsedTime += delta;
    this.frame++;
  }
  update() {
    if (this.isPlaying()) {
      this.removeOldObstacle();
      this.createNewObstacle();
    }
  }
  isReady() {
    return this.state === GameState.READY;
  }
  play() {
    this.state = GameState.PLAYING;
  }
  isPlaying() {
    return this.state === GameState.PLAYING;
  }
  gameOver() {
    this.state = GameState.GAMEOVER;
  }
  isGameOver() {
    return this.state === GameState.GAMEOVER;
  }
  getSprites() {
    let _sprites = [
      ...this.layerBackground,
      ...this.layerObstacle,
      ...this.layerPlayer,
      ...this.layerForward,
    ];
    if (this.isPlaying()) _sprites.push(this.liveScore);
    if (this.isGameOver()) _sprites = [..._sprites, ...this.layerGameOver];
    if (this.isReady()) _sprites = [..._sprites, ...this.layerGameStart];
    return _sprites;
  }
  removeOldObstacle() {
    this.layerObstacle = this.layerObstacle.filter((sprite) => {
      return !sprite.isHidden();
    });
  }
  createPairOfPipes() {
    const floorPipeHeight = getRndInteger(
      config.PIPE_FLOOR_HEIGHT_MIN,
      config.PIPE_FLOOR_HEIGHT_MAX
    );
    return [new SkyPipe(floorPipeHeight), new FloorPipe(floorPipeHeight)];
  }
  createNewObstacle() {
    if (this.frame % config.TIME_NEW_OBSTACLE == 0) {
      this.layerObstacle.push(...this.createPairOfPipes());
    }
  }
}

const gameState = new GameState();
gameState.restart();

canvas.addEventListener("mousedown", (e) => {
  if (gameState.state == GameState.READY) gameState.play();
  if (gameState.state == GameState.PLAYING) gameState.player.jump();
  if (gameState.state == GameState.GAMEOVER) gameState.restart();
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
