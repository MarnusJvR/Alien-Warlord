import { calculateAngle } from '../utils/formulas';
// This function starts by checking if the game is started or not. 
function shoot(state, action) {
  if (!state.gameState.started) return state;

  const { cannonBalls } = state.gameState;
  // else, it checks if the game already contains two cannon balls. I am limiting the number of cannon balls to make the game a little bit harder. 
  if (cannonBalls.length === 2) return state;

  const { x, y } = action.mousePosition;
// calculateAngle to define the trajectory of the new cannon ball
  const angle = calculateAngle(0, 0, x, y);

  const id = (new Date()).getTime();
  // function creates a new object representing the cannon ball and returns a new state to the Redux store
  const cannonBall = {
    position: { x: 0, y: 0 },
    angle,
    id,
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonBalls: [...cannonBalls, cannonBall],
    }
  };
}

export default shoot;