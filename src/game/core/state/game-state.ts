import { Floor } from "../entities/floor";
import { FloorPipe } from "../entities/floor-pipe";
import { SkyPipe } from "../entities/sky-pipe";
import { SmartBird } from "../entities/smart-bird";

const TOTAL_SMARTBIRDS = 15;

class GameState {
  obstacles: Array<FloorPipe | SkyPipe>;
  players: Array<SmartBird>;
  floor: Floor;
  constructor() {
    this.players = [];
    for (let i = 0; i < TOTAL_SMARTBIRDS; i++) {
      this.players.push(new SmartBird());
    }
    this.floor = new Floor();
    this.obstacles = [];
  }

  restart() {
    for (let i = 0; i < TOTAL_SMARTBIRDS; i++) {
      this.players.push(new SmartBird());
    }
    this.floor = new Floor();
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
