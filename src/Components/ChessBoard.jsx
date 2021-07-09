import React, { useState, useEffect } from 'react';
import BoardBlock from './BoardBlock';
import './chessboard.css';
import { horizontalAxis, initialPiecesPosition, pieceImages } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { globalReducerActions } from '../redux/reducers/globalReducer';

function ChessBoard() {
  const [focusBlock, setFocusBlock] = useState(null);
  const [movalbleBlocks, setMovalbleBlocks] = useState([]);
  const [board, setBoard] = useState([]);
  const dispatch = useDispatch();

  const { selectedBlock } = useSelector((state) => state.globalReducer);

  useEffect(() => {
    let boardPos = [];
    for (let j = 8; j >= 1; j--) {
      for (let i in horizontalAxis) {
        const isTileOrdinateSumEven = (parseInt(i) + parseInt(j) + 2) % 2;
        const pos = j + horizontalAxis[i];
        // console.log(j, horizontalAxis[i]);
        boardPos.push({
          verticalAxis: j,
          horizontalAxis: horizontalAxis[i],
          isTileOrdinateSumEven,
          pos,
        });
      }
    }
    setBoard(
      boardPos.map(
        ({
          verticalAxis,
          horizontalAxis,
          renderPieceImg,
          pos,
          isTileOrdinateSumEven,
        }) => {
          return (
            <BoardBlock
              onClickFunc={() => {
                setFocusBlock(pos);
              }}
              selectedBlock={selectedBlock === pos}
              // movableLablel={movalbleBlocks.includes(pos)}
              // focusBlock={focusBlock}
              isTileOrdinateSumEven={isTileOrdinateSumEven}
              verticalPoint={verticalAxis?.toString()}
              horizontalPoint={horizontalAxis}
            />
          );
        }
      )
    );
  }, [selectedBlock]);

  // buggy code i will add later
  // useEffect(() => {
  //   // removing piece selection on click anywhere on the webpage
  //   document.onclick = function (event) {
  //     console.log("hey you clicked");
  //     if (event === undefined) event = window.event;
  //     if (selectedBlock) {
  //       console.log("yes selected block");
  //       dispatch({
  //         type: globalReducerActions.handleBlockSelection,
  //         payload: {
  //           blockPos: null,
  //         },
  //       });
  //     } else {
  //       console.log("no selected block", selectedBlock);
  //     }
  //   };
  // }, []);

  return <div className="board">{board}</div>;
}

export default ChessBoard;
