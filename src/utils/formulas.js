// Here I created a template to avoid repeating calculations in my code
// Cubic Bezier curve below depends on four points
// starting point, the ending point, and two control points
export const pathFromBezierCurve = (cubicBezierCurve) => {
  // Here we extract 4 attributes initialAxis, initialControlPoint, endingControlPoint, endingAxis from a parameter called cubicBezierCurve
  // It then passes it to the ttemplate that builds the actual curve

    const {
      initialAxis, initialControlPoint, endingControlPoint, endingAxis,
    } = cubicBezierCurve;
    return `
      M${initialAxis.x} ${initialAxis.y}
      c ${initialControlPoint.x} ${initialControlPoint.y}
      ${endingControlPoint.x} ${endingControlPoint.y}
      ${endingAxis.x} ${endingAxis.y}
    `;
  };
//  The atan function returns results in radians. I convert values to degrees so i use radiansToDegrees function
  export const radiansToDegrees = radians => ((radians * 180) / Math.PI);

// https://math.stackexchange.com/questions/714378/find-the-angle-that-creating-with-y-axis-in-degrees
// We calculate the angle of the canon based on mouse position
// this is complicated. I dont understand the math. Just o=used the online resource
export const calculateAngle = (x1, y1, x2, y2) => {
  if (x2 >= 0 && y2 >= 0) {
    return 90;
  } else if (x2 < 0 && y2 >= 0) {
    return -90;
  }

  const dividend = x2 - x1;
  const divisor = y2 - y1;
  const quotient = dividend / divisor;
  return radiansToDegrees(Math.atan(quotient)) * -1;
};

export const getCanvasPosition = (event) => {
    // mouse position on auto-scaling canvas
    // https://stackoverflow.com/a/10298843/1232793
    // Its all about the mouseposition relative to the canvas
  
    const svg = document.getElementById('aliens-go-home-canvas');
    const point = svg.createSVGPoint();
  
    point.x = event.clientX;
    point.y = event.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    return {x, y};
  };

  const degreesToRadian = degrees => ((degrees * Math.PI) / 180);

export const calculateNextPosition = (x, y, angle, divisor = 300) => {
  const realAngle = (angle * -1) + 90;
  const stepsX = radiansToDegrees(Math.cos(degreesToRadian(realAngle))) / divisor;
  const stepsY = radiansToDegrees(Math.sin(degreesToRadian(realAngle))) / divisor;
  return {
    x: x +stepsX,
    y: y - stepsY,
  }
};
// we are treating objects as rectangles
// So i can check if they overlapse with a simple function
export const checkCollision = (rectA, rectB) => (
  rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 &&
  rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1
);