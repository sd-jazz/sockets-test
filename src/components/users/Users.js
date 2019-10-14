import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../../redux/reducer";
import { connect } from "react-redux";
import "./users.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = async () => {
    const results = await axios.get(`/api/getUsers/${this.props.user.user_id}`)
    await this.setState({
      users: results.data 
    })
    await console.log(this.state.users)
  }

  render() {
    const { users } = this.state
    return <div>USERS</div>;
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
