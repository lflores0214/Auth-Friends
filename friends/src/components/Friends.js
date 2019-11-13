import React from "react";
import axios from "axios";
import styled from "styled-components"
import Button from "../theme/Button"

const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

const Card = styled.div`
width: 25%;
height: 25%;
display: flex;
flex-direction: column;
margin: 2%;
background:linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
padding-bottom: 2%;
border-radius: 10%;
`;

const DeleteBtn = styled.button`
width: 50%;
margin-left: 25%;
border-radius: 5px;
background:linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)
`;


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
    authAxios.get("api/friends/").then(response => {
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
        localStorage.removeItem("friend");
      })
      .catch(error => console.log("ERROR", error));
  };

  render() {
    return (
      <Container>
        {this.state.friends.map(friend => (
          <Card>
            <p>{friend.name}</p>
            <p>{friend.age}</p>
            <p>{friend.email}</p>
            <DeleteBtn onClick={()=> this.deleteFriend(friend.id)} >Delete</DeleteBtn>
          </Card>
        ))}
      </Container>
    );
  }
}
export default Friends;
