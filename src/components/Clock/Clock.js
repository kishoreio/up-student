import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minutes: 0,
      seconds: 0,
      clock: '',
    };
    this.interval = null;
  }

  UNSAFE_componentWillMount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { hour, minutes, seconds } = this.state;
      let incrementSeconds = 0;
      let incrementMinutes = 0;
      let incrementHour = 0;
      incrementSeconds = seconds + 1;
      this.setState({ seconds: incrementSeconds });
      if (incrementSeconds === 60) {
        incrementSeconds = 0;
        incrementMinutes = minutes + 1;
        this.setState({ seconds: incrementSeconds, minutes: incrementMinutes });
      } else if (incrementMinutes === 60) {
        incrementSeconds = 0;
        incrementMinutes = 0;
        incrementHour = hour + 1;
        this.setState({ seconds: incrementSeconds, minutes: incrementSeconds, hour: incrementHour });
      }
      const newClock = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
      this.setState({ clock: newClock });
    }, 1000);
  }

  shouldComponentUpdate(nextProp) {
    if (nextProp.count >= 10) {
      clearInterval(this.interval);
      return false;
    }
    return true;
  }

  render() {
    const { clock } = this.state;
    return <h3 className="px-2 text-white">{clock}</h3>;
  }
}

export default Clock;
