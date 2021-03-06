import { gameState } from "./core/state/game-state.js";

gameState.restart();

function gameLoop(timestamp) {
  gameState.tick(timestamp);
  gameState.update();

  const spriteList = gameState.getSprites();
  spriteList.forEach((sprite) => sprite.update(gameState.deltaTime));
  spriteList.forEach((sprite) => sprite.render());

  window.requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());
