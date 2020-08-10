import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import LoginForm from './components/Login';
import FriendsList from './components/FriendsList';
function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">View Friends</Link>
          </li>
        </ul>
      </div>
          <Switch> 
            <PrivateRoute exact path="/protected" component={FriendsList} />
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route>
                <LoginForm />
              </Route>
          </Switch>
    </Router>
  )
}

export default App;
