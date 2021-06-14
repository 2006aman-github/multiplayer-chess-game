import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalReducerActions } from '../redux/reducers/globalReducer';
import {
  bishopRules,
  kingRules,
  knightRules,
  pawnRules,
  queenRules,
  rookRules,
} from '../rules';
import { horizontalAxis } from '../utils';
import './boardblock.css';

function BoardBlock({
  isTileOrdinateSumEven,
  verticalPoint,
  horizontalPoint,
  selectedBlock,
}) {
  const [renderPiece, setRenderPiece] = useState(null);
  const blockPos = verticalPoint + horizontalPoint;
  const state = useSelector((state) => state.globalReducer);
  const {
    initialPiecesPosition,

    movableBlocks,
    myColor,
    myTurn,
    opponent,
  } = state;
  const dispatch = useDispatch();
  const blockEl = useRef(null);
  // console.log(initialPiecesPosition);
  const currentBlockPiece = initialPiecesPosition[blockPos];
  // console.log(initialPiecesPosition);

  useEffect(() => {
    // console.log(state);
    // debugger;

    if (currentBlockPiece) {
      // console.log(currentBlockPiece, blockPos);
      // console.log(currentBlockPiece);
      setRenderPiece(currentBlockPiece);
    } else {
      setRenderPiece(null);
    }
  }, [state]);

  const handleMovementBlock = () => {
    const pieceType = currentBlockPiece?.split('-')[1];
    let movementBlocks;
    if (pieceType === 'soldier') {
      movementBlocks = pawnRules(
        verticalPoint,
        horizontalPoint,
        initialPiecesPosition,
        myColor
      );
    } else if (pieceType === 'rook') {
      // shit
      movementBlocks = rookRules(
        horizontalPoint,
        verticalPoint,
        blockPos,
        initialPiecesPosition,
        myColor
      );
    } else if (pieceType === 'king') {
      // console.log("king selected");
      movementBlocks = kingRules(verticalPoint, horizontalPoint);
      // console.log(movementBlocks);
    } else if (pieceType === 'knight') {
      movementBlocks = knightRules(
        verticalPoint,
        horizontalPoint,
        initialPiecesPosition,
        myColor
      );
    } else if (pieceType === 'bishop') {
      movementBlocks = bishopRules(
        verticalPoint,
        horizontalPoint,
        initialPiecesPosition,
        myColor
      );
    } else if (pieceType === 'queen') {
      movementBlocks = queenRules(
        verticalPoint,
        horizontalPoint,
        blockPos,
        initialPiecesPosition,
        myColor
      );
    }
    // console.log(pieceType);
    dispatch({
      type: globalReducerActions.handleMovableBlocks,
      payload: {
        movableBlocks: {
          currentBlock: blockPos,
          movableBlocks: movementBlocks,
        },
      },
    });
    // console.log(movementBlocks);
  };

  useEffect(() => {
    // console.log(selectedBlock);
    if (selectedBlock) {
      blockEl.current.style.backgroundColor = '#BACA2B';
      // blockEl.current.style.outline = '3px solid #e7e722';
      handleMovementBlock();
    } else {
      blockEl.current.style.backgroundColor = null;
      // blockEl.current.style.outline = 'none';
      // console.log(selectedBlock, currentBlockPiece);
    }
  }, [selectedBlock, currentBlockPiece]);

  const handleClick = () => {
    if (myTurn && opponent?.id) {
      if (renderPiece && renderPiece.includes(myColor)) {
        // console.log(renderPiece, myColor, "damn");

        //  select the block logic...
        dispatch({
          type: globalReducerActions.handleBlockSelection,
          payload: {
            blockPos,
          },
        });
      } else if (
        !renderPiece?.includes(myColor) &&
        movableBlocks?.movableBlocks?.includes(blockPos)
      ) {
        //  move the block logic...
        dispatch({
          type: globalReducerActions.handlePieceMovement,
          payload: {
            updatedPos: blockPos,
          },
        });
      } else {
        console.log(myColor);
      }
    } else {
      console.log('not your turn!!');
    }
  };
  // console.log(movableBlocks);

  return (
    <div
      className={`board__block ${
        isTileOrdinateSumEven === 0 ? 'odd__block' : 'even__block'
      } ${
        !renderPiece &&
        movableBlocks?.movableBlocks?.includes(blockPos) &&
        'movable__block'
      }`}
      ref={blockEl}
      onClick={handleClick}
    >
      {/* {verticalPoint + horizontalPoint} */}

      {renderPiece && (
        <img
          // onClick={handleMove}
          className={'block__img'}
          src={require(`./assets/pieces/${renderPiece}.svg`).default}
          alt="block"
        />
      )}
    </div>
  );
}

export default BoardBlock;
