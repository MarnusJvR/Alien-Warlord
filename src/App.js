import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';
import * as Auth0 from 'auth0-web';

Auth0.configure({
  domain: 'YOUR_AUTH0_DOMAIN',
  clientID: 'YOUR_AUTH0_CLIENT_ID',
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.shoot = this.shoot.bind(this);
  }
  // I have defined this lifecycle method to start the uniform interval that will trigger the moveObjects action.
  componentDidMount() {
    const self = this;
    Auth0.handleAuthCallback();

    Auth0.subscribe((auth) => {
      console.log(auth);
    });
    setInterval(() => {
        self.props.moveObjects(self.canvasMousePosition);
    }, 10);
    // This will make the app keep the dimension of the canvas equal to the dimension of the window that the users see
    // This also works on window resize
    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }
// I have defined this method to update the canvasMousePosition property of the App component
// This property is used by moveObjects action
// This property refers to the relative mouse position on my canvas

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }
//  call the shoot dispatcher with the canvasMousePosition.
// I then pass this method to the canvas component
  shoot() {
    this.props.shoot(this.canvasMousePosition);
  }
// This method now passes the angle property and the trackMouse method to your Canvas component
// This component will use angle to update the way it renders your cannon and the trackMouse to attach as an event listener to the svg element.
  render() {
    return (
      <Canvas
      angle={this.props.angle}
      gameState={this.props.gameState}
      startGame={this.props.startGame}
      trackMouse={event => (this.trackMouse(event))}
      shoot={this.shoot}
    />
    );
  }
}

// with redux this is suprisingly easy. You just define the proptypes propery the app needs
// angle, refers to the angle that the cannon is aiming to
// moveObjects, is the function that is going to be triggered on a uniform interval to update your cannon
App.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
};

export default App;