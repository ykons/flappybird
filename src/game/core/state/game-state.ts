import { Floor } from "../entities/floor";
import { FloorPipe } from "../entities/floor-pipe";
import { SkyPipe } from "../entities/sky-pipe";
import { SmartBird } from "../entities/smart-bird";

class GameState {
  obstacles: Array<FloorPipe | SkyPipe>;
  players: Array<SmartBird>;
  floor: Floor;
  constructor() {
    this.floor = new Floor();
    this.players = [];
    this.obstacles = [];
  }

  restart() {
    this.obstacles.length = 0;
  }

  getScore() {
    return 0;
  }

  getBestScore() {
    return 0;
  }
}

const gameState = new GameState();

export { gameState };
