import React from "react";
import { Link } from "react-router-dom";
import "./profileCard.css";

const ProfileCard = props => {
  return (
    <div className="ProfileCard__Master">
      <div className="ProfileCard__Username">
        <h1>{props.auth0_id}</h1>
      </div>
      <div>
        <img
          className="ProfileCard__Avatar"
          src={props.picture}
          alt={props.auth0_id}
        />
      </div>
      <Link
        to={`/message/${props.user_id}/${props.me}`}
        onClick={() => props.connectUsers(props.auth0_id, props.user_id)}
      >
        <button>
          <h2>CHAT</h2>
        </button>
      </Link>
    </div>
  );
};

export default ProfileCard;
