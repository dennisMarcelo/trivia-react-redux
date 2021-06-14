import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import GamePlayer from './pages/GamePlayer';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/gameplayer" component={ GamePlayer } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
