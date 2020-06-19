import {
  LEADERBOARD_LOADED, LOGGED_IN,
  MOVE_OBJECTS, SHOOT, START_GAME
} from '../actions';
import moveObjects from './moveObjects';
import startGame from './startGame';
import shoot from './shoot';

// this is the game state before the game is started
// the prop values are set as below
const initialGameState = {
  started: false,
  kills: 0,
  lives: 3,
  flyingObjects: [],
  lastObjectCreatedAt: new Date(),
  cannonBalls: [],
};

// This is the initial angle of the canon
const initialState = {
  angle: 45,
  gameState: initialGameState,
};

// Here it takes an action
// The switch below checks its type.
// it its MOVE_OBJECTS then it calls afunction move objects.
// same for startgame and shoot
// These functions are also redux reducers
function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_OBJECTS:
      return moveObjects(state, action);
    case START_GAME:
      // the goal of this function is to turn on the started flag inside the gameState property.
      return startGame(state, initialGameState);
    default:
      return state;
    case SHOOT:
        return shoot(state, action);
  }
}

export default reducer;