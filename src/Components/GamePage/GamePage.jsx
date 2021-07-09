import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalReducerActions } from '../../redux/reducers/globalReducer';
import { connectSocket, ENDPOINT } from '../../socket.config';
import ChessBoard from '../ChessBoard';
import './gamepage.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

let connectedSocket;

function GamePage() {
  const { opponent, gameplayStatusMessage } = useSelector(
    (state) => state.globalReducer
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const [myName, setMyName] = useState('Mr. Random');

  useEffect(() => {
    console.log('calling connectSocket');
    setShowModal(true);

    connectedSocket = connectSocket();
    let socket = connectedSocket;
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
        socket.emit('player-joined-verify', myName);
        socket.on('opponent-connected', (data) => {
          console.log('lol', data);
          if (data?.data) {
            dispatch({
              type: globalReducerActions.handleOpponentData,
              payload: {
                id: data?.data?.id,
                name: data?.data?.name || 'Mr. Random',
              },
            });
            dispatch({
              type: globalReducerActions.handleGamePlayStatus,
              payload: {
                message: '',
              },
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

  // functions here
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  function handleMyName(e) {
    if (
      myName.trim().length <= 20 &&
      myName.trim().length < e.target.value.trim().length
    ) {
      setMyName(e.target.value);
      return;
    } else if (myName.trim().length > e.target.value.trim().length) {
      console.log(e.target.value.trim().length);
      setMyName(e.target.value);
    }
  }

  return (
    <div className="gamePage">
      {/* modal starts here  */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onChange={handleMyName}
              value={myName}
              type="text"
              placeholder="Joi"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={toggleModal} variant="secondary">
            Close
          </Button>
          <Button onClick={toggleModal} variant="primary">
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal ends here  */}
      <span>{opponent && gameplayStatusMessage}</span>
      <br />
      <div className="opponent__Details">
        <div>
          <img
            width="100"
            src="https://betacssjs.chesscomfiles.com/bundles/web/images/noavatar_l.84a92436.gif"
            alt=""
          />
        </div>
        <h3>{opponent?.name || 'searching...'}</h3>
      </div>
      <ChessBoard />
      <div className="my__Details">
        <div>
          <img
            width="100"
            src="https://betacssjs.chesscomfiles.com/bundles/web/images/noavatar_l.84a92436.gif"
            alt=""
          />
        </div>
        <h3>{myName}</h3>
      </div>
    </div>
  );
}

export default GamePage;
export { connectedSocket };
