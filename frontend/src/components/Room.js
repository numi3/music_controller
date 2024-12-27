import React, { Component } from "react";
import { useParams } from "react-router-dom";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.roomCode;
  }

  render() {
    return (
      <>
        <h3>RoomCode: {this.roomCode}</h3>
        <p>Votes: {this.state.votesToSkip}</p>
        <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
        <p>isHost: {this.state.isHost.toString()}</p>
      </>
    );
  }
}

export default function RoomWrapper() {
  const { roomCode } = useParams();
  return <Room roomCode={roomCode} />;
}