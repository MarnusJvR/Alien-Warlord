// What we do here is we use CSS animation
//  we add elements tthat carry a transformation (a CSS rule) to move them from their starter position
// (transform: translateY(0);) to the very bottom of the game (transform: translateY(${gameHeight}px);).

import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import FlyingObjectBase from './FlyingObjectBase';
import FlyingObjectTop from './FlyingObjectTop';
import { gameHeight } from '../utils/constants';

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`;
// move component is simply a g SVG element styled to use the moveVertically transformation. 
const FlyingObject = props => (
  <Move>
    <FlyingObjectBase position={props.position} />
    <FlyingObjectTop position={props.position} />
  </Move>
);

FlyingObject.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default FlyingObject;