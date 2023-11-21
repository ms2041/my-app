// Module containing utility functions.

export function getRandomInt(max) {  
  return Math.floor(Math.random() * max);
}

export function getRandom3d6() {
  return (getRandomInt(6) + 1 + getRandomInt(6) + 1 + getRandomInt(6) + 1);
}

export function getRandom2d6() {
  return (getRandomInt(6) + 1 + getRandomInt(6) + 1);
}

export function getRandom1d6() {
  return (getRandomInt(6) + 1);
}