import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import { getUser } from "../../redux/reducer";
import { connect } from "react-redux";
import "./message.css";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
      newMessage: "",
      messages: [],
      oldMessages: []
    };
    this.socket = io("localhost:4000");
    this.socket.on("SEND_MESSAGE", data => {
      this.addMessage(data);
    });
  }

  componentDidMount = async () => {
    const { user1, user2 } = this.props.match.params;
    const room = await axios.get(`/api/getRoomName/${user1}/${user2}`);
    const { room_name } = room.data[0];
    const getMessages = await axios.get(`/api/getMessages/${room_name}`);
    await this.setState({
      oldMessages: getMessages.data,
      room: room.data[0]
    });
    await this.socket.emit("JOIN_ROOM", {
      room: this.state.room
    });
  };

  componentWillUnmount = () => {
    this.socket.emit("LEAVE_ROOM", {
      room: this.state.room
    });
  };

  messageHandler = value => {
    this.setState({ newMessage: value });
  };

  addMessage = data => {
    this.setState({
      messages: [...this.state.messages, data],
    });
  };

  sendMessage = event => {
      event.preventDefault()
      const { user1, user2} = this.state.room
      let recipient

      if(this.props.user_id === user1){
          recipient = user1
      } else {
          recipient = user2
      }

      this.socket.emit("SEND_MESSAGE", {
        room: this.state.room.room_name,
        newMessage: this.state.newMessage,
        sender: this.props.user.user_id,
        recipient: recipient 
      })

      this.setState({ newMessage: "" })
  }

  render() {
    const { messages, oldMessages } = this.state;
    const { user_id } = this.props.user
    const mappedMessages = messages.map(message => {
      if (this.props.user.user_id === message.sender) {
        return <p key={message.id} style={{ alignSelf: "flex-start" }}>{message.message}</p>;
      } else {
        return <p key={message.id} style={{ alignSelf: "flex-end" }}>{message.message}</p>;
      }
    });
    const mappedOldMessages = oldMessages.map(message => {
        if(user_id === oldMessages.sender){
            return <p key={message.id} style={{ alignSelf: "flex-start" }}>{message.message}</p>;
        } else {
          return <p key={message.id} style={{ alignSelf: "flex-end" }}>{message.message}</p>;
          }
    })

    return (
      <div className="Message__Master">
        <div>
          <h1>MESSAGE</h1>
        </div>
    <div className="Message__Messages">
        {mappedOldMessages}
        {mappedMessages}
    </div>
          <input
            className="Message__Input"
            value={this.state.newMessage}
            onChange={e => this.messageHandler(e.target.value)}
            type="text"
          />
        <button onClick={(e) => this.sendMessage(e)}>Send</button>
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
)(Message);
