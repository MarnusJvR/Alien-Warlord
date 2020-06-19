import { checkCollision } from '../utils/formulas';
import { gameHeight } from '../utils/constants';

const checkCollisions = (cannonBalls, flyingDiscs) => {
  // the array objectsDestroyed to hold everything that is destroyed
  const objectsDestroyed = [];
  // loop through flyingDiscs array (with the forEach function) to create a rectangular representation of the flying discs
  // remember we are treating them like rectangles to make life easier on us
  // we are using CSS animations to move these objects, you need to calculate their positions over the Y-axis based on their currentLifeTime.
  flyingDiscs.forEach((flyingDisc) => {
    const currentLifeTime = (new Date()).getTime() - flyingDisc.createdAt;
    const calculatedPosition = {
      x: flyingDisc.position.x,
      y: flyingDisc.position.y + ((currentLifeTime / 4000) * gameHeight),
    };
    const rectA = {
      x1: calculatedPosition.x - 40,
      y1: calculatedPosition.y - 10,
      x2: calculatedPosition.x + 40,
      y2: calculatedPosition.y + 10,
    };
    //  now we loop through the cannonBalls array (with the forEach function) to create a rectangular representation of the cannon balls
    cannonBalls.forEach((cannonBall) => {
      const rectB = {
        x1: cannonBall.position.x - 8,
        y1: cannonBall.position.y - 8,
        x2: cannonBall.position.x + 8,
        y2: cannonBall.position.y + 8,
      };
      // checkCollision function with both rectangular representations to decide if these objects must be destroyed
      if (checkCollision(rectA, rectB)) {
        objectsDestroyed.push({
          cannonBallId: cannonBall.id,
          flyingDiscId: flyingDisc.id,
        });
      }
    });
  });
  return objectsDestroyed;
};

export default checkCollisions;