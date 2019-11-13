import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "../theme/Button"


class Login extends React.Component {
  state = {
    creds: {
      username: "",
      password: ""
    },
    isLoggedIn: false
  };

  useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    }
    
  }));
  

  logout = e => {
    e.preventDefault();
    localStorage.clear();
    this.setState({ ...this.state, isLoggedIn: false });
  };

  login = () => {
    axios
      .post("http://localhost:5000/api/login", this.state.creds)
      .then(response => {
        console.log("RESPONSE", response);
        const { data } = response;

        localStorage.setItem("token", data.payload);
        this.setState({ ...this.state, isLoggedIn: true });
      });
  };
  handleChange = e => {
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.login();
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ ...this.state, isLoggedIn: true });
    } else {
      this.setState({ ...this.state, isLoggedIn: false });
    }
  }

  render() {
    return (
      <div className="form">
        <legend>{this.state.isLoggedIn ? "Logged in" : "Please login"}</legend>
        <form onSubmit={this.handleSubmit}>
          <TextField
            className={this.useStyles.textfield}
            id="outlined-name"
            margin="normal"
            variant="outlined"
            label="Username"
            type="text"
            name="username"
            value={this.state.creds.username}
            onChange={this.handleChange}
          />

          <TextField
            className={this.useStyles.textfield}
            id="outline-name"
            margin="normal"
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={this.state.creds.password}
            onChange={this.handleChange}
          />

          <Button color="blue" type="submit">Login</Button>
          <Button color="red" onClick={this.logout}>Logout</Button>
        </form>
      </div>
    );
  }
}
export default Login;
