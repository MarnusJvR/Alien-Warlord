
// sets the gameflag started to true and resets everything else inside the gameState property.
export default (state, initialGameState) => {
    return {
      ...state,
      gameState: {
        ...initialGameState,
        started: true,
      }
    }
  };