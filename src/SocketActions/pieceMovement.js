import { connectedSocket } from '../Components/GamePage/GamePage';

const emitPieceMovement = (data) => {
  connectedSocket.emit('piece-moved', data);
};

export default emitPieceMovement;
