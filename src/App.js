import './App.css';
import ChessBoard from './Components/ChessBoard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { globalReducerActions } from './redux/reducers/globalReducer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GamePage, { connectedSocket } from './Components/GamePage/GamePage';
import LandingPage from './Components/LandingPage';

function App() {
  const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/play/online">
            <GamePage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
