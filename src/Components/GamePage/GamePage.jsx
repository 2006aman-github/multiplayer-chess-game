import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalReducerActions } from '../../redux/reducers/globalReducer';
import { connectSocket, ENDPOINT } from '../../socket.config';
import ChessBoard from '../ChessBoard';
import './gamepage.css';

let connectedSocket;

function GamePage() {
  const { opponent, gameplayStatusMessage } = useSelector(
    (state) => state.globalReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('caling connectSocket');
    connectedSocket = connectSocket();
    let socket = connectedSocket;
    const playerName = `Guest${Math.random() * 1000000}`;
    (async () => {
      try {
        // const result = await fetch("http://localhost:8000");
        socket.on('server-connection-message', (data) => {
          console.log('data from server', data);
          if (data.opponent) {
            dispatch({
              type: globalReducerActions.handleGamePlayStatus,
              payload: {
                message: '',
              },
            });
          }
          dispatch({
            type: globalReducerActions.handlePlayerColor,
            payload: {
              myColor: data?.color,
            },
          });
        });
        socket.emit('player-joined-verify', playerName);
        socket.on('opponent-connected', (data) => {
          // console.log(data.message);

          if (data?.data) {
            dispatch({
              type: globalReducerActions.handleOpponentData,
              payload: {
                id: data?.data?.id,
              },
            });
            dispatch({
              type: globalReducerActions.handleGamePlayStatus,
              payload: {
                message: '',
              },
            });
          } else {
            dispatch({
              type: globalReducerActions.handleOpponentData,
              payload: {},
            });
          }
        });
        socket.on('opponent-piece-moved', (data) => {
          console.log('the opponent moved: ', data);
          dispatch({
            type: globalReducerActions.updateOpponentMove,
            payload: data,
          });
        });
        socket.on('your-turn', () => {
          dispatch({
            type: globalReducerActions.handleMyTurn,
            payload: {
              myTurn: true,
            },
          });
        });
        socket.on('opponent-disconnected', (data) => {
          console.log(data);
          dispatch({
            type: globalReducerActions.handleResetBoard,
          });
          alert('Opponent Disconnected');
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="gamePage">
      <span>{opponent && gameplayStatusMessage}</span>
      <br />
      <div className="opponent__Details">
        <section>
          <h4>Aman</h4>
        </section>
        <section></section>
      </div>
      <ChessBoard />
    </div>
  );
}

export default GamePage;
export { connectedSocket };
