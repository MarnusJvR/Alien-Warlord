// Here we use  Redux actions to update the state of your app 

export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const START_GAME = 'START_GAME';
export const SHOOT = 'SHOOT';

export const shoot = (mousePosition) => ({
  type: SHOOT,
  mousePosition,
});

export const moveObjects = mousePosition => ({
  type: MOVE_OBJECTS,
  mousePosition,
});

// Startgame will be the chain of events triggered when the startgame button is clicked
export const startGame = () => ({
  type: START_GAME,
});