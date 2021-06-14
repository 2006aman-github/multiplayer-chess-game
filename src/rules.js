import { horizontalAxis } from "./utils";

export const rookRules = (
  horizontalPoint,
  verticalPoint,
  blockPos,
  initialPiecesPosition,
  myColor
) => {
  let horizontalMovableBlocks = [];
  let verticalMovableBlocks = [];
  let movementBlocks = [];

  // making the horizontal path for rook to move by rules
  for (let x in horizontalAxis) {
    const myPieceOnWay =
      initialPiecesPosition[verticalPoint + horizontalAxis[x]]?.includes(
        myColor
      );
    if (
      initialPiecesPosition[verticalPoint + horizontalAxis[x]] &&
      verticalPoint + horizontalAxis[x] !== blockPos &&
      horizontalAxis[x] < horizontalPoint
    ) {
      if (myPieceOnWay) {
        horizontalMovableBlocks = [];
        continue;
      }
      horizontalMovableBlocks.push(verticalPoint + horizontalAxis[x]);
      // console.log(horizontalMovableBlocks);
      horizontalMovableBlocks = horizontalMovableBlocks.filter(
        (block) => block === verticalPoint + horizontalAxis[x]
      );
      // console.log(horizontalMovableBlocks);
      continue;
    } else if (
      initialPiecesPosition[verticalPoint + horizontalAxis[x]] &&
      verticalPoint + horizontalAxis[x] !== blockPos &&
      horizontalAxis[x] > horizontalPoint
    ) {
      if (myPieceOnWay) {
        break;
      } else {
        console.log("bruhh");
        horizontalMovableBlocks.push(verticalPoint + horizontalAxis[x]);
        break;
      }
    }
    if (verticalPoint + horizontalAxis[x] !== blockPos) {
      horizontalMovableBlocks.push(verticalPoint + horizontalAxis[x]);
    }
  }

  // making the vertical path for rook to move by rules
  for (let y = 1; y <= 8; y++) {
    const myPieceOnWay =
      initialPiecesPosition[y + horizontalPoint]?.includes(myColor);
    if (
      initialPiecesPosition[y + horizontalPoint] &&
      y + horizontalPoint !== blockPos &&
      y < verticalPoint
    ) {
      if (myPieceOnWay) {
        verticalMovableBlocks = [];
        continue;
      }
      verticalMovableBlocks.push(y + horizontalPoint);
      verticalMovableBlocks = verticalMovableBlocks.filter(
        (block) => block === y + horizontalPoint
      );
      continue;
    } else if (
      initialPiecesPosition[y + horizontalPoint] &&
      y + horizontalPoint !== blockPos &&
      y > verticalPoint
    ) {
      if (myPieceOnWay) {
        break;
      } else {
        verticalMovableBlocks.push(y + horizontalPoint);
        break;
      }
    }
    if (y + horizontalPoint !== blockPos) {
      verticalMovableBlocks.push(y + horizontalPoint);
    }
  }

  movementBlocks = horizontalMovableBlocks.concat(verticalMovableBlocks);

  return movementBlocks;
};

// pawn rules are Here..
const pawnRules = (
  verticalPoint,
  horizontalPoint,
  initialPiecesPosition,
  myColor
) => {
  let movableBlocks = [];

  for (
    let x = horizontalAxis.indexOf(horizontalPoint) - 1;
    x <= horizontalAxis.indexOf(horizontalPoint) + 1;
    x++
  ) {
    movableBlocks.push(parseInt(verticalPoint) + 1 + horizontalAxis[x]);
    // if (
    //   !initialPiecesPosition[verticalPoint + horizontalPoint]?.includes(myColor)
    // ) {
    //   if (x !== horizontalAxis.indexOf(horizontalPoint)) {
    //   }
    //   console.log(horizontalAxis[x], horizontalPoint);
    // }
    // console.log("hey");
  }

  // console.log(movableBlocks);

  return movableBlocks;
};

// king rules here
const kingRules = (verticalPoint, horizontalPoint) => {
  let movableBlocks = [
    parseInt(verticalPoint) - 1 + horizontalPoint,
    parseInt(verticalPoint) + 1 + horizontalPoint,
    verticalPoint + horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 1],
    verticalPoint + horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 1],
    parseInt(verticalPoint) +
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 1],
    parseInt(verticalPoint) +
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 1],
    parseInt(verticalPoint) -
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 1],
    parseInt(verticalPoint) -
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 1],
  ];
  return movableBlocks;
};

// bishop rules here
const bishopRules = (
  verticalPoint,
  horizontalPoint,
  initialPiecesPosition,
  myColor
) => {
  let movableBlocks = [];
  let x, y;
  // top right movable blocks finding logic
  for (
    y = parseInt(verticalPoint) + 1,
      x = horizontalAxis.indexOf(horizontalPoint) - 1;
    y <= 8;
    y++, x--
  ) {
    if (x === 0 || initialPiecesPosition[y + horizontalAxis[x]]) {
      if (initialPiecesPosition[y + horizontalAxis[x]]?.includes(myColor)) {
        break;
      } else {
        movableBlocks.push(y + horizontalAxis[x]);

        break;
      }
    }
    movableBlocks.push(y + horizontalAxis[x]);
  }

  // top left movable blocks finding logic
  for (
    y = parseInt(verticalPoint) + 1,
      x = horizontalAxis.indexOf(horizontalPoint) + 1;
    y <= 8;
    y++, x++
  ) {
    if (x === 8 || initialPiecesPosition[y + horizontalAxis[x]]) {
      if (initialPiecesPosition[y + horizontalAxis[x]]?.includes(myColor)) {
        break;
      } else {
        movableBlocks.push(y + horizontalAxis[x]);

        break;
      }
    }
    movableBlocks.push(y + horizontalAxis[x]);
  }

  // bottom right movable blocks finding logic
  for (
    y = parseInt(verticalPoint) - 1,
      x = horizontalAxis.indexOf(horizontalPoint) - 1;
    y >= 1;
    y--, x--
  ) {
    if (x === 0 || initialPiecesPosition[y + horizontalAxis[x]]) {
      if (initialPiecesPosition[y + horizontalAxis[x]]?.includes(myColor)) {
        break;
      } else {
        movableBlocks.push(y + horizontalAxis[x]);

        break;
      }
    }

    movableBlocks.push(y + horizontalAxis[x]);
  }

  // top left movable blocks finding logic
  for (
    y = parseInt(verticalPoint) - 1,
      x = horizontalAxis.indexOf(horizontalPoint) + 1;
    y >= 1;
    y--, x++
  ) {
    if (x === 8 || initialPiecesPosition[y + horizontalAxis[x]]) {
      if (initialPiecesPosition[y + horizontalAxis[x]]?.includes(myColor)) {
        break;
      } else {
        movableBlocks.push(y + horizontalAxis[x]);

        break;
      }
    }
    movableBlocks.push(y + horizontalAxis[x]);
  }

  return movableBlocks;
};

// knight rules here
const knightRules = (
  verticalPoint,
  horizontalPoint,
  initialPiecesPosition,
  myColor
) => {
  let movableBlocks = [
    // top blocks to move
    parseInt(verticalPoint) +
      2 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 1],
    parseInt(verticalPoint) +
      2 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 1],

    // bottom blocks to move
    parseInt(verticalPoint) -
      2 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 1],
    parseInt(verticalPoint) -
      2 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 1],

    // right blocks to move

    parseInt(verticalPoint) -
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 2],
    parseInt(verticalPoint) +
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) + 2],
    // left blocks to move

    parseInt(verticalPoint) -
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 2],
    parseInt(verticalPoint) +
      1 +
      horizontalAxis[horizontalAxis.indexOf(horizontalPoint) - 2],
  ];

  movableBlocks.map((block) => {
    if (initialPiecesPosition[block]?.includes(myColor)) {
      movableBlocks.splice(movableBlocks.indexOf(block), 1);
    } else if (!Boolean(block)) {
      movableBlocks = movableBlocks.filter((b) => {
        return Boolean(b) === true;
      });
    }
  });
  // console.log(movableBlocks);

  return movableBlocks;
};

const queenRules = (
  verticalPoint,
  horizontalPoint,
  blockPos,
  initialPiecesPosition,
  myColor
) => {
  const diagonalMovableBlocks = bishopRules(
    verticalPoint,
    horizontalPoint,
    initialPiecesPosition,
    myColor
  );
  const straightMovableBlocks = rookRules(
    horizontalPoint,
    verticalPoint,
    blockPos,
    initialPiecesPosition,
    myColor
  );
  return diagonalMovableBlocks.concat(straightMovableBlocks);
};

export { pawnRules, kingRules, knightRules, bishopRules, queenRules };
