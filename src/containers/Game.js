// We use the connect utility to pass props through
// the game relies on Redux to manage its state, so here I map actions to the props of  App. 
// The below map functions are all aimed at this
// To see them work go to App

import { connect } from 'react-redux';
import App from '../App';
import {
    leaderboardLoaded, loggedIn,
    moveObjects, startGame, shoot
  } from '../actions/index';

// Here i told Redux that the App component cares about the gameState property.
const mapStateToProps = state => ({
  angle: state.angle,
  gameState: state.gameState,
});
// I also tell Redux to pass the startGame function to the App component, so it can trigger this new action.
const mapDispatchToProps = dispatch => ({
    shoot: (mousePosition) => {
        dispatch(shoot(mousePosition))
      },
  moveObjects: (mousePosition) => {
    dispatch(moveObjects(mousePosition));
  },
  startGame: () => {
    dispatch(startGame());
  },
  
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;