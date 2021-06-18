import React from 'react';

const ONE_SECOND = 1000;
const TIMER = 30;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
    this.setTimerState = this.setTimerState.bind(this);
  }

  componentDidMount() {
    this.setTimerState();
  }

  setTimerState() {
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer > 0 ? prevState.timer - 1 : TIMER,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    return (
      <p id="timer">{timer}</p>
    );
  }
}

export default Timer;
