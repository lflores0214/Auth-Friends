import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//Components
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Friends from "./components/Friends";
import AddFriend from "./components/Addfriend";
//Style
import "./App.css";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  height: 5%;
  padding: 2%;
  border-radius: 5px;
`;
const LinkCont = styled.div`
  width: 25%;

  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const NavLink = styled(Link)`
  margin: 1%;
  text-decoration: none;
  color: whitesmoke;
  margin-top: 5%;
`;

const Title = styled.legend`
  font-size: 2rem;
  color: whitesmoke;
`;

function App() {
  return (
    <Router>
      <div className="App">
        <Nav>
          <div>
            <Title>FriendBook</Title>
          </div>
          <LinkCont>
            <NavLink to="/login">Login</NavLink>
            <br />
            <NavLink to="/addfriend">Add Friend</NavLink>
            <br />
            <NavLink to="/friends">Friends</NavLink>
          </LinkCont>
        </Nav>
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
