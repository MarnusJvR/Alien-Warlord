// very wide to provide as full screen feeling
export const skyAndGroundWidth = 5000;

export const gameWidth = 800;
// game will show new flying objects every one second (1000 milliseconds)
export const createInterval = 1000;
// there will be no more than four flying objects at the same time
export const maxFlyingObjects = 4;
// we start the flying objects in a position the user cant see
export const flyingObjectsStarterYAxis = -1100;
// defines four magnitudes on the X axis where objects can spring to life. 
export const flyingObjectsStarterPositions = [
  -300,
  -150,
  150,
  300,
];

export const gameHeight = 1200;