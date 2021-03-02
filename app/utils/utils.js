export function collisionDetection(obj1, obj2) {
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

export function isOutOfCanvas(obj) {
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

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
