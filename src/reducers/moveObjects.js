import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonBalls';
import checkCollisions from './checkCollisions';


// the reducer requires a mouse position
// it forces the creation of the mousePosition constant if one is not passed in the action object
function moveObjects(state, action) {
  if (!state.gameState.started) return state;
  let cannonBalls = moveBalls(state.gameState.cannonBalls);
  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  };
// fetch a newState object from the createFlyingObjects reducer, so new flying objects are created if needed.
  const newState = createFlyingObjects(state);

  const now = (new Date()).getTime();
  // filters the flyingObjects property of the gameState to remove objects that have an age equals or greater than 4000 (4 seconds).
 let flyingObjects = newState.gameState.flyingObjects.filter(object => (
    (now - object.createdAt) < 4000
  ));
// flyingObjects array with the one from the original state to decide if players must loose a life or not
// I am adding this code right after popping flying objects that remained for 4 seconds in the game
// and before removing objects that collide
// if the length of these arrays differs, it means one flying object invaded the Earthsss
  const lostLife = state.gameState.flyingObjects.length > flyingObjects.length;
  let lives = state.gameState.lives;
  if (lostLife) {
    lives--;
  }
  const started = lives > 0;
  if (!started) {
    flyingObjects = [];
    cannonBalls = [];
    lives = 3;
  }
// We extract the x and y properties from mouse position and passes them to calculate angle to calculate the new angle of the canon
  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);
// Here, we are using the result of the checkCollisions function to remove objects from the cannonBalls and flyingObjects arrays.
  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
  const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));
  cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
  flyingObjects = flyingObjects.filter(flyingDisc => (flyingDiscsDestroyed.indexOf(flyingDisc.id)));

  const kills = state.gameState.kills + flyingDiscsDestroyed.length;

  // returns a new object based on the newState object retrieved.
  return {
    ...newState,  
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls: [...cannonBalls],
      lives,
      started,
      kills,
    },
    angle,
  };
}

export default moveObjects;