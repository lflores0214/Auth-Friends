import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    creds: {
      username: "",
      password: ""
    },
    isLoggedIn: false
  };

  logout = e => {
    e.preventDefault();
    localStorage.clear();
    this.setState({...this.state, isLoggedIn: false});
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
      <div>
        <h2>{this.state.isLoggedIn ? "Logged in" : "Please login"}</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            {" "}
            Username:
            <input
              type="text"
              name="username"
              value={this.state.creds.username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            {" "}
            Password:
            <input
              type="password"
              name="password"
              value={this.state.creds.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Login</button>
          <button onClick={this.logout}>Logout</button>
        </form>
      </div>
    );
  }
}
export default Login;
