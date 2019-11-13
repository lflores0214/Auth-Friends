import React from "react";
import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: 'http://localhost:5000/',
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
    authAxios.get(`api/friends/`).then(response => {
      this.setState({ friends: response.data });
    });
  };

  deleteFriend = id => {
    console.log("ID", id)
    const authAxios = axiosWithAuth();
    authAxios
      .delete(`api/friends/${id}`, this.state.friends.id)
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(error => console.log("ERROR", error));
  };

  render() {
    return (
      <div>
        {this.state.friends.map(friend => (
          <div>
            <p>{friend.name}</p>
            <p>{friend.age}</p>
            <p>{friend.email}</p>
            <button onClick={()=> this.deleteFriend(friend.id)} >Delete</button>
          </div>
        ))}
      </div>
    );
  }
}
export default Friends;
