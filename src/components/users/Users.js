import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import ProfileCard from "../profileCard/ProfileCard"; 
import { getUser } from "../../redux/reducer";
import { connect } from "react-redux";
import "./users.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.socket = io("localhost:4000");
  }

  componentDidMount = async () => {
    const results = await axios.get(`/api/getUsers/${this.props.user.user_id}`)
    await this.setState({
      users: results.data 
    })
  }

  connectUsers = (auth0_id, user_id) => {
    const { user } = this.props
    let room_info = {
      user1_id: user.user_id,
      user1_profileName: user.auth0_id,
      user2_id: user_id,
      user2_profileName: auth0_id
    }
    this.socket.emit("CONNECT_USERS", room_info)
  }

  render() {
    const { users } = this.state
    const userCards = users.map(user => {
      return <ProfileCard 
        key={user.user_id}
        auth0_id={user.auth0_id}
        picture={user.picture}
        user_id={user.user_id}
        me={this.props.user.user_id}
        connectUsers={this.connectUsers}
      />
    })

    return (
      <div className="Users__Master">
        <h1>USERS</h1>
        <div>
          {userCards}
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Users);
