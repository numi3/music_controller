import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  responsiveFontSizes,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
  }

  handleVotesChange(event) {
    this.setState({
      votesToSkip: parseInt(event.target.value),
    });
  }

  handleGuestCanPauseChange(event) {
    this.setState({
      guestCanPause: event.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              onChange={this.handleVotesChange}
              type="number"
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required to Skip Song</div>
            </FormHelperText>
          </FormControl>
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleRoomButtonPressed}
              >
                Create A Room
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                color="secondary"
                variant="contained"
                to="/"
                component={Link}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
