import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/reducer";
import { connect } from "react-redux";
import "./navBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: ""
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

 componentDidMount = async () => {
    const result = await axios.get("/api/userData")
    await this.props.getUser(result.data)
  };


  login = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  };

  logout = async () => {
    const result = await axios.get("/api/logout")
    await this.props.getUser(result.data);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="NavBar__Master">
        <div>
          <Link to="/">
            <h1>HOME</h1>
          </Link>
        </div>
        <div>
          {user && (
            <Link to="/userMessages">
              <h1>MESSAGES</h1>
            </Link>
          )}
        </div>
        <div>
          {user && (
            <Link to="/users">
              <h1>USERS</h1>
            </Link>
          )}
        </div>
        <div className="NavBar__Login">
          {!user ? (
            <Link to="/">
              <h1 onClick={() => this.login()}>LOGIN</h1>
            </Link>
          ) : (
            <Link to="/">
              <h1 onClick={() => this.logout()}>LOGOUT</h1>
            </Link>
          )}
        </div>
      </div>
    );
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
)(NavBar);
