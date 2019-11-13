import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//Components
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Friends from "./components/Friends";
import AddFriend from "./components/Addfriend";
//Style
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/friends">Friends</Link>
          <br />
          <Link to="/addfriend">Add Friend</Link>
        </div>
        <Switch>
          <PrivateRoute path="/friends">
            <Route exact path="/friends" component={Friends} />
          </PrivateRoute>
          <PrivateRoute path="/addfriend">
            <Route exact path="/addfriend" component={AddFriend} />
          </PrivateRoute>
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
