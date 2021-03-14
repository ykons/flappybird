const WORLD_WIDTH = 360;
const WORLD_HEIGHT = 680;
const SKETCH_ENABLED = true;

const canvas = document.createElement("canvas");
canvas.width = WORLD_WIDTH;
canvas.height = WORLD_HEIGHT;

const context = canvas.getContext("2d");

const sprites = new Image();
const png = require("../../assets/img/sprites.png");
sprites.src = png;

const config = {
  GRAVITY: 9.8,
  ROTATE_JUMP: -25,
  ROTATE_VELOCITY: 0.5,
  VELOCITY_FLOOR: -100,
  VELOCITY_OBSTACLE: -100,
  VELOCITY_JUMP: 250,
  PIPE_FLOOR_HEIGHT_MIN: 100,
  PIPE_FLOOR_HEIGHT_MAX: 400,
  PIPES_GAP_SPACE: 100,
  TIME_NEW_OBSTACLE: 130,
  FLOOR_HEIGHT: 112,
};

export {
  canvas,
  context,
  sprites,
  config,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  SKETCH_ENABLED,
};
