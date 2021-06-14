import emitPieceMovement from '../../SocketActions/pieceMovement';
import { horizontalAxis, pieceImages, StartBoardPosition } from '../../utils';

const initialGlobalState = {
  initialPiecesPosition: StartBoardPosition,
  validRows: ['1', '2'],
  myColor: true,
  selectedBlock: null,
  movableBlocks: {},
  playerName: null,
  myTurn: null,
  opponent: {},
  gameplayStatusMessage: 'Searching for player...',
};

export const globalReducerActions = {
  handlePieceMovement: 'HNALDE_PIECE_MOVEMENT',
  handlePlayerColor: 'HANDLE_PLAYER_COLOR',
  handleBlockSelection: 'HANDLE_BLOCK_SELECTION',
  handleMovableBlocks: 'HANDLE_MOVABEL_BLOCKS',
  updateOpponentMove: 'UPDATE_OPPONENT_MOVE',
  handleResetBoard: 'HANDLE_RESET_BOARD',
  handleMyTurn: 'HANDLE_MY_TURN',
  handleOpponentData: 'HANDLE_OPPONENT_DATA',
  handleGamePlayStatus: 'HANDLE_GAMEPLAY_STATUS',
};

export const globalReducer = (state = initialGlobalState, action) => {
  const {
    handlePieceMovement,
    handlePlayerColor,
    handleBlockSelection,
    handleMovableBlocks,
    updateOpponentMove,
    handleResetBoard,
    handleGamePlayStatus,
    handleMyTurn,
    handleOpponentData,
  } = globalReducerActions;
  switch (action?.type) {
    case handlePieceMovement:
      let { initialPiecesPosition, selectedBlock, myColor } = state;
      let newPiece = initialPiecesPosition[selectedBlock];
      if (
        parseInt(action.payload.updatedPos.split('')[0]) === 8 &&
        initialPiecesPosition[selectedBlock]?.includes('soldier')
      ) {
        console.log('pawn entered the opponent area');
        if (myColor === 'black') {
          newPiece = pieceImages.blackQueen;
        } else {
          newPiece = pieceImages.whiteQueen;
        }
      } else {
        console.log(
          action.payload.updatedPos.split('')[0] == 8,
          initialPiecesPosition[selectedBlock]?.includes('soldier')
        );
      }
      const updatedState = {
        ...initialPiecesPosition,
        [action.payload.updatedPos]: newPiece,
        [selectedBlock]: null,
      };

      emitPieceMovement({ ...action.payload, selectedBlock });
      // console.log({ ...state, initialPiecesPosition: updatedState });
      return {
        ...state,
        initialPiecesPosition: updatedState,
        selectedBlock: null,
        myTurn: false,
      };
    case handleGamePlayStatus:
      return {
        ...state,
        gameplayStatusMessage: action.payload?.message,
      };
    case handleOpponentData:
      return {
        ...state,
        opponent: action.payload,
      };
    case handlePlayerColor:
      let initialPiecesPositionNew = { ...state.initialPiecesPosition };

      if (action.payload.myColor === 'black') {
        Object.entries(initialPiecesPositionNew).forEach(([key, value]) => {
          const splitKey = key.split('');
          if (splitKey[0].includes('1')) {
            // console.log(initialPiecesPositionNew[8 + splitKey[1]]);
            initialPiecesPositionNew[key] =
              initialPiecesPositionNew[8 + splitKey[1]];
            initialPiecesPositionNew[8 + splitKey[1]] = value;
          } else if (splitKey[0].includes('2')) {
            initialPiecesPositionNew[key] =
              initialPiecesPositionNew[7 + splitKey[1]];
            initialPiecesPositionNew[7 + splitKey[1]] = value;
          }
        });
        // console.log(initialPiecesPositionNew);
      }
      return {
        ...state,
        initialPiecesPosition: initialPiecesPositionNew,
        myColor: action.payload.myColor,
        playerName: action.payload.playerName || null,
      };

    case handleBlockSelection:
      const { blockPos } = action.payload;
      return {
        ...state,
        selectedBlock: blockPos,
      };
    case handleMovableBlocks:
      // console.log(action.payload);
      return {
        ...state,
        movableBlocks: action.payload.movableBlocks,
      };

    case updateOpponentMove:
      if (!action.payload) {
        return state;
      }
      const updatedX = action.payload.updatedPos?.split('')[1];
      const updatedY = action.payload.updatedPos?.split('')[0];

      action.payload.updatedPos =
        9 -
        updatedY +
        horizontalAxis[
          horizontalAxis.length -
            (1 -
              horizontalAxis.indexOf(action.payload.updatedPos?.split('')[1]))
        ];

      action.payload.selectedBlock =
        9 -
        action.payload.selectedBlock?.split('')[0] +
        horizontalAxis[
          horizontalAxis.length -
            1 -
            horizontalAxis.indexOf(action.payload.selectedBlock?.split('')[1])
        ];
      return {
        ...state,
        initialPiecesPosition: {
          ...state.initialPiecesPosition,
          [action.payload.updatedPos]:
            state.initialPiecesPosition[action.payload.selectedBlock],
          [action.payload.selectedBlock]: null,
        },
      };

    case handleResetBoard:
      return {
        ...state,
        initialPiecesPosition: StartBoardPosition,
        myColor: 'white',
        opponent: {},
        selectedBlock: '',
        movableBlocks: [],
        gameplayStatusMessage: 'Searching for player...',
      };

    case handleMyTurn:
      if (!action?.payload?.myTurn) {
        return state;
      }
      return {
        ...state,
        myTurn: action.payload.myTurn,
      };

    default:
      return state;
  }
};
