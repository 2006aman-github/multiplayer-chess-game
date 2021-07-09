import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chess from '../assets/chess.png';
import { connectedSocket } from './GamePage/GamePage';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  useEffect(() => {
    connectedSocket?.disconnect();
  }, []);
  return (
    <div className="landingPage">
      <div className="hero__left">
        <div>
          <img width="" src={Chess} alt="chess" />
        </div>
      </div>
      <div className="hero__right">
        {/* <h2>Compete against players around the world</h2> */}
        <Link to="/play/online">
          <button type="button" class="btn btn-success p-3">
            Play Online
          </button>
        </Link>
        <br />
        {/* <h2>Get your dude on here and smash with them!</h2> */}
        <button type="button" class="btn btn-success p-3">
          Play with friends
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
