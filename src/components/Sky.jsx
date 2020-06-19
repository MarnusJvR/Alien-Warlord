// Here I create the sky 
import React from 'react';

const Sky = () => {
  const skyStyle = {
    fill: '#30abef',
  };

  // I set width to a massive number to ensure it fits the screen. Its not important to the game
  const skyWidth = 5000;
  // Height is important. I force the browser to show 1200 points no matter resolution screen ect
  const gameHeight = 1200;
  return (
    <rect
      style={skyStyle}
      x={skyWidth / -2}
      y={100 - gameHeight}
      width={skyWidth}
      height={gameHeight}
    />
  );
};
export default Sky;