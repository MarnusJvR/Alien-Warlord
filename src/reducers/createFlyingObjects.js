import {
    createInterval, flyingObjectsStarterYAxis, maxFlyingObjects,
    flyingObjectsStarterPositions
  } from '../utils/constants';
  
  export default (state) => {
    if ( ! state.gameState.started) return state; // game not running so return state untouched
  // if the game is running this function uses the createInterval and the maxFlyingObjects constants to decide if it should create new flying objects or not
    const now = (new Date()).getTime();
    const { lastObjectCreatedAt, flyingObjects } = state.gameState;
    // we now create the createNeObject constant
    const createNewObject = (
      now - (lastObjectCreatedAt).getTime() > createInterval &&
      flyingObjects.length < maxFlyingObjects
    );
  // If the createNewObject constant is set to true, this function uses Math.floor to fetch a random number between 0 and 3 (Math.random() * maxFlyingObjects)
  // this tells the program where the object should appear
    if ( ! createNewObject) return state; // no need to create objects now
  
    const id = (new Date()).getTime();
    const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
    const flyingObjectPosition = flyingObjectsStarterPositions[predefinedPosition];
    // with all this information we now create a newFlyingObject
    const newFlyingObject = {
      position: {
        x: flyingObjectPosition,
        y: flyingObjectsStarterYAxis,
      },
      createdAt: (new Date()).getTime(),
      id,
    };
  
    return {
      ...state,
      gameState: {
        ...state.gameState,
        flyingObjects: [
          ...state.gameState.flyingObjects,
          newFlyingObject
        ],
        // we use this to determine interval
        lastObjectCreatedAt: new Date(),
      }
    }
  }