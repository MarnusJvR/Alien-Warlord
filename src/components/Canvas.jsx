// This is the base component and forms the canvas that we will be working on

import React from "react";
import PropTypes from "prop-types";
import Sky from "./Sky";
import Ground from "./Ground";
import CannonBase from "./CannonBase";
import CannonPipe from "./CannonPipe";
import CurrentScore from "./CurrentScore";
import FlyingObject from "./FlyingObject";
import StartGame from "./StartGame";
import Title from "./Title";
import Login from './Login';
import { signIn } from 'auth0-web';
import Leaderboard from './Leaderboard';
import CannonBall from './CannonBall';    
import Heart from './Heart';                                      

const Canvas = (props) => {
    const leaderboard = [
        { id: 'd4', maxScore: 82, name: 'Sobane the Solver of Problems', picture: 'https://twitter.com/KukicAdo/profile_image', },
        { id: 'a1', maxScore: 235, name: 'Marnus the Storyteller', picture: 'https://twitter.com/brunoskrebs/profile_image', },
        { id: 'c3', maxScore: 99, name: 'Luke the Warrior', picture: 'https://twitter.com/diegopoza/profile_image', },
        { id: 'b2', maxScore: 129, name: 'Caron the Princess', picture: 'https://twitter.com/jeanatahnk/profile_image', },
        { id: 'e5', maxScore: 34, name: 'Pieter the Advisor', picture: 'https://twitter.com/jenny_obrien/profile_image', },
        { id: 'f6', maxScore: 153, name: 'Darien the Great', picture: 'https://twitter.com/KimMaida/profile_image', },
        { id: 'g7', maxScore: 55, name: 'Tsungai the Terrible', picture: 'https://twitter.com/mroliff/profile_image', },
        { id: 'h8', maxScore: 146, name: 'Luke the Warrior', picture: 'https://twitter.com/speyrott/profile_image', },
      ];

  const gameHeight = 1200;
  // NOTE: This breaks my brain but for some reason in redux the area ontop of the x-axis is negative and below is positive. The y-axis is also inverse
  // Viewbox defines that your canvas and its contents must fit a particular container.
  // Here it fits the inner space inside the browser
  // first value in viewbox is min-x and it defines what is the leftmost point that your users will see
  // I devide screenwidth with -2 to get this value
  // We do this for the canvas to show the same amount of points to the left and to the right of the origin.
  // then we give it min-y: This value defines what will be the uppermost point of your canvas.
  // Here I simply gave it a set const value
  // Then we have normal width and height. this simply defines how many points a user sees on screen 
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight,
  ];

  const lives = [];
  for (let i = 0; i < props.gameState.lives; i++) {
    const heartPosition = {
      x: -180 - (i * 70),
      y: 35
    };
    lives.push(<Heart key={i} position={heartPosition}/>);
  }

  return (
    // preserveAspectRatio  have used xMaxYMax none on it to force uniform scaling of  canvas and its elements.
    // I have added the onmouse move event listener to the canvas to make the App component aware of the mouse position
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
      onClick={props.shoot}
    >
      {/* Importing the different components to show on screen */}
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />

      {props.gameState.cannonBalls.map(cannonBall => (
        <CannonBall
          key={cannonBall.id}
          position={cannonBall.position}
        />
      ))}
{/* rotation is tied to prop angle */}
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={props.gameState.kills} />
{/* made the StartGame and the Title components incl leaderbord appear only when the gameState.started property is set to false */}
      {!props.gameState.started && (
        <g>
          <StartGame onClick={() => props.startGame()} />
          <Title />
          <Leaderboard currentPlayer={leaderboard[6]} authenticate={signIn} leaderboard={leaderboard} />
        </g>
      )}

      {/* {props.gameState.started && (
        <g>
          <FlyingObject position={{ x: -150, y: -300 }} />
          <FlyingObject position={{ x: 150, y: -300 }} />
        </g>
      )} */}

      {props.gameState.flyingObjects.map((flyingObject) => (
        <FlyingObject key={flyingObject.id} position={flyingObject.position} />
      ))}
      {lives}
    </svg>
  );
};

// explicitly define that this component needs props  
Canvas.propTypes = {
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
  
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
};

export default Canvas;
