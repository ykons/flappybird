import { Bird } from "../entities/bird";
import { SmartBird } from "../entities/smart-bird";
import { Floor } from "../entities/floor";
import { FloorPipe } from "../entities/floor-pipe";
import { SkyPipe } from "../entities/sky-pipe";

class GameState {
  obstacles: Array<FloorPipe | SkyPipe>;
  players: Array<SmartBird | Bird>;
  floor: Floor;
  constructor() {
    this.floor = new Floor();
    this.players = [new Bird()];
    this.obstacles = [];
  }

  restart() {
    this.players.forEach((bird) => bird.restart());
    this.obstacles.length = 0;
  }

  getScore() {
    const alives = gameState.players.filter((player) => {
      return !player.died;
    });
    return alives.length ? alives[0].score : -1;
  }

  getBestScore() {
    return this.players.length ? this.players[0].bestScore : -1;
  }
}

const gameState = new GameState();

export { gameState };
