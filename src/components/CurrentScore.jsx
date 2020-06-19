// Here we manage the player score that must tick up with one evertime a nasty space ship is shot from the sky
// We take a single prop: score
import React from 'react';
import PropTypes from 'prop-types';

// Create a nice looking font
const CurrentScore = (props) => {
  const scoreStyle = {
    fontFamily: '"Joti One", cursive',
    fontSize: 80,
    fill: '#d6d33e',
  };

  return (
    <g filter="url(#shadow)">
      <text style={scoreStyle} x="300" y="80">
        {props.score}
      </text>
    </g>
  );
};

CurrentScore.propTypes = {
  score: PropTypes.number.isRequired,
};

export default CurrentScore;