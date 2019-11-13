import React from "react";
import axios from "axios";

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem("token")
    }
  });
};

class Friends extends React.Component {
  state = {
    friends: []
  };

  componentDidMount() {
    this.getFriends();
    if (!localStorage.getItem("token")) {
      console.error("Please log in");
    } else {
      console.info("Logged in");
    }
  }

  getFriends = () => {
    const authAxios = axiosWithAuth();
    authAxios.get("http://localhost:5000/api/friends").then(response => {
      this.setState({ friends: response.data });
    });
  };

  render() {
    return (
      <div>
        {this.state.friends.map(friend => (
          <div>
            <p>{friend.name}</p>
            <p>{friend.age}</p>
            <p>{friend.email}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default Friends