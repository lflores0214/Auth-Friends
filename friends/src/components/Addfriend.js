import React from "react";
import { axiosWithAuth } from "./Friends";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "../theme/Button";

class AddFriend extends React.Component {
  state = {
    friends: [{ name: "", age: "", email: "" }]
  };

  addFriend = (name, age, email) => {
    const friend = { name: name, age: age, email: email };
    const authAxios = axiosWithAuth();
    authAxios
      .post("http://localhost:5000/api/friends", friend)

      // axios
      //   .post(
      //     "http://localhost:5000/api/friends",
      //     {
      //       name,
      //       age,
      //       email
      //     },
      //     {
      //       headers: {
      //         authorization: localStorage.getItem("token")
      //       }
      //     }
      //   )

      .then(response => {
        console.log("SUCCESS", response.data);
        localStorage.setItem(
          "friend",
          JSON.stringify({ name: name, age: age, email: email })
        );
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
  handleChange = e => {
    this.setState({
      friends: {
        ...this.state.friends,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.addFriend(
      this.state.friends.name,
      this.state.friends.age,
      this.state.friends.email
    );
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <legend>Add A Friend</legend>
          <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          label="Name"
            type="text"
            name="name"
            value={this.state.friends.name}
            onChange={this.handleChange}
          />

          <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          label="Age"
            type="text"
            name="age"
            value={this.state.friends.age}
            onChange={this.handleChange}
          />

          <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          label="Email"
            type="text"
            name="email"
            value={this.state.friends.email}
            onChange={this.handleChange}
          />

          <Button type="submit">Add Friend</Button>
        </form>
      </div>
    );
  }
}
export default AddFriend;
