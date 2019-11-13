import React from "react";
import axios from "axios";

class AddFriend extends React.Component {
  state = {
    friends: [{ name: "", age: "", email: "" }]
  };

  addFriend = (name, age, email) => {
    // const friend = { name: name, age: age, email: email };
    axios
      .post(
        "http://localhost:5000/api/friends",
        {
          name,
          age,
          email
        },
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      )

      .then(response => {
        console.log("SUCCESS", response);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            {" "}
            Name:
            <input
              type="text"
              name="name"
              value={this.state.friends.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={this.state.friends.age}
              onChange={this.handleChange}
            />
          </label>
          <label>
            {" "}
            Email:
            <input
              type="text"
              name="email"
              value={this.state.friends.email}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add Friend</button>
        </form>
      </div>
    );
  }
}
export default AddFriend;
