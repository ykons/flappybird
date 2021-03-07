import { BackgroundLayer } from "../layers/background-layer.js";
import { FloorLayer } from "../layers/floor-layer.js";
import { PlayerLayer } from "../layers/player-layer.js";
import { GetReady } from "./ui/get-ready.js";

export class ReadyMode {
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new PlayerLayer(),
      new GetReady(),
    ];
    this.observers = [];
  }

  addObserver(mode) {
    this.observers.push(mode);
  }

  processInput(event) {
    this.observers.forEach((observer) => observer.notifyStartGame());
  }

  update(deltaTime) {}

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
