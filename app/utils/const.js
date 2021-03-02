const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "/assets/img/sprites.png";

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

export { canvas, context, sprites, config };
