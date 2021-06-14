import React from 'react';
import { Link } from 'react-router-dom';
import Chess from '../assets/chess.png';

function LandingPage() {
  return (
    <div className="landingPage">
      <div className="hero__left">
        <div>
          <img width="" src={Chess} alt="chess" />
        </div>
      </div>
      <div className="hero__right">
        <h2>Compete against players around the world</h2>
        <Link to="/play/online">
          <button>play online</button>
        </Link>
        <br />
        <h2>Get your dude on here and smash with them!</h2>
        <button>Play With Friend</button>
      </div>
    </div>
  );
}

export default LandingPage;
