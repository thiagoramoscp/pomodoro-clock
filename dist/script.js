const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const PLAY_PAUSE = 'PLAY_PAUSE';

let incrementAction = { type: INCREMENT };
let decrementAction = { type: DECREMENT };
let resetAction = { type: RESET };
let playPauseAction = { type: PLAY_PAUSE };

function incrementActionCreator() {
  return incrementAction;
};
function decrementActionCreator() {
  return decrementAction;
};
function resetActionCreator() {
  return resetAction;
};
function playPauseActionCreator() {
  return playPauseAction;
};

const defaultState = {
  isClockRunning: false,
  sessionLength: 25,
  breakLength: 5,
  timerLabel: 'Session',
  minutes: 25,
  seconds: 0 };


const reducer = (state = defaultState, action) => {
  return state;
};

const store = Redux.createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.playTimer = this.playTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
    this.state = {
      secondsElapsed: 1500,
      isClockRunning: false,
      sessionLength: 25,
      breakLength: 5,
      isBreakOn: false,
      timerLabel: 'SESSION' };

  }
  sessionIncrement() {
    if (this.state.isClockRunning === false && this.state.sessionLength < 60) {
      let newSessionLength = this.state.sessionLength + 1;
      this.setState({ secondsElapsed: newSessionLength * 60,
        sessionLength: newSessionLength });
    }
  }
  sessionDecrement() {
    if (this.state.isClockRunning === false && this.state.sessionLength > 1) {
      let newSessionLength = this.state.sessionLength - 1;
      this.setState({ secondsElapsed: newSessionLength * 60,
        sessionLength: newSessionLength });
    }
  }
  breakIncrement() {
    if (this.state.isClockRunning === false && this.state.breakLength < 60) {
      this.setState({ breakLength: this.state.breakLength + 1 });
    }
  }
  breakDecrement() {
    if (this.state.isClockRunning === false && this.state.breakLength > 1) {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }
  }

  getMinutes() {
    return ("0" + Math.floor(this.state.secondsElapsed % 3600 / 60)).slice(
    -2);

  }

  getSeconds() {
    return ("0" + this.state.secondsElapsed % 60).slice(-2);
  }

  playTimer() {
    const beep = document.getElementById('beep');
    this.setState({ isClockRunning: true });
    this.timer = setInterval(() => {

      if (this.state.secondsElapsed == 0) {
        beep.play();
        if (this.state.timerLabel == 'SESSION') {
          this.setState(({ breakLength }) => ({ secondsElapsed: breakLength * 60,
            timerLabel: 'BREAK' }));
        } else {
          this.setState(({ sessionLength }) => ({ secondsElapsed: sessionLength * 60,
            timerLabel: 'SESSION' }));
        }
      } else {
        this.setState(({ secondsElapsed }) => ({ secondsElapsed: secondsElapsed - 1 }));
      }

    }, 1000);

  }
  pauseTimer() {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;

    clearInterval(this.timer);
    this.setState({ isClockRunning: false });
  }

  resetTimer() {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;

    clearInterval(this.timer);
    this.setState({
      secondsElapsed: 1500,
      isClockRunning: false,
      sessionLength: 25,
      breakLength: 5,
      isBreakOn: false,
      timerLabel: 'SESSION' });

  }


  render() {
    return (
      React.createElement("div", { className: "app" },
      React.createElement("h1", null, "POMODORO CLOCK"),
      React.createElement("div", { className: "session-break-boxes" },
      React.createElement("div", { className: "session-box" },
      React.createElement("h2", { className: "session-break-labels", id: "session-label" }, "Session Length"),
      React.createElement("div", { className: "session-break-settings" },
      React.createElement("button", { className: "set-time-btns", onClick: this.sessionIncrement, id: "session-increment" }, React.createElement("i", { class: "fas fa-chevron-circle-up fa-3x" })),
      React.createElement(SessionLength, { sessionTime: this.state.sessionLength }),
      React.createElement("button", { className: "set-time-btns", onClick: this.sessionDecrement, id: "session-decrement" }, React.createElement("i", { class: "fas fa-chevron-circle-down fa-3x" })))),


      React.createElement("div", { className: "break-box" },
      React.createElement("h2", { className: "session-break-labels", id: "break-label" }, "Break Length"),
      React.createElement("div", { className: "session-break-settings" },
      React.createElement("button", { className: "set-time-btns", onClick: this.breakIncrement, id: "break-increment" }, React.createElement("i", { class: "fas fa-chevron-circle-up fa-3x" })),
      React.createElement(BreakLength, { breakTime: this.state.breakLength }),
      React.createElement("button", { className: "set-time-btns", onClick: this.breakDecrement, id: "break-decrement" }, React.createElement("i", { class: "fas fa-chevron-circle-down fa-3x" }))))),



      React.createElement("div", { className: "ring-container" },
      React.createElement("div", { className: "clock ring" }),
      React.createElement("div", { class: "ring-inside-content" },
      React.createElement(TimerLabel, { timerLabel: this.state.timerLabel }),
      React.createElement(TimeLeft, { getMinutes: this.getMinutes(), getSeconds: this.getSeconds() }),
      React.createElement("audio", { id: "beep", src: "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg" }),
      React.createElement("div", { className: "clock-btns-box" },
      React.createElement("button", { className: "clock-btns", onClick: this.state.isClockRunning ? this.pauseTimer : this.playTimer, id: "start_stop" },
      React.createElement("i", { class: "fas fa-play fa-2x" }),
      React.createElement("i", { class: "fas fa-pause fa-2x" })),

      React.createElement("button", { className: "clock-btns", onClick: this.resetTimer, id: "reset" }, React.createElement("i", { class: "fas fa-sync-alt fa-2x" })))))));





  }}

const SessionLength = props => {
  return React.createElement("div", { className: "set-time-number", id: "session-length" }, React.createElement("span", null, props.sessionTime));
};
const BreakLength = props => {
  return React.createElement("div", { className: "set-time-number", id: "break-length" }, React.createElement("span", null, props.breakTime));
};
const TimerLabel = props => {
  return React.createElement("h2", { className: "timer-label", id: "timer-label" }, props.timerLabel);
};
const TimeLeft = props => {
  return React.createElement("div", { className: "time-left", id: "time-left" }, props.getMinutes, ":", props.getSeconds);
};


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));