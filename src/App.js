import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import QuizScreen from './components/QuizScreen/QuizScreen';
import './style.css';
import Teacher from './components/Teacher/Teacher';
import DashBoard from './components/DashBoard/DashBoard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      selectQuiz: [],
      role: '',
      name: '',
    };
    this.changeLoggedStatus = this.changeLoggedStatus.bind(this);
    this.changeToQuizScreen = this.changeToQuizScreen.bind(this);
    this.changeToDashBoardScreen = this.changeToDashBoardScreen(this);
  }

  changeLoggedStatus(bool, roleLogged, name) {
    this.setState({
      isLoggedIn: bool,
      role: roleLogged,
      name,
    });
  }

  changeToQuizScreen(data) {
    this.setState({ selectQuiz: data });
  }

  changeToDashBoardScreen() {
    this.setState({ selectQuiz: [] });
  }

  render() {
    const { isLoggedIn, selectQuiz, role, name } = this.state;
    const quizScreen = selectQuiz.length > 0;
    return (
      <>
        <Router>
          <Header isLoggedIn={isLoggedIn} changeLoggedStatus={this.changeLoggedStatus} name={name} />
          <Route exact path="/">
            {/* eslint-disable no-nested-ternary */}
            {isLoggedIn && role === 'student' ? (
              <Redirect to="/dashboard" />
            ) : isLoggedIn && role === 'teacher' ? (
              <Redirect to="/teacher" />
            ) : (
              <Login changeLoggedStatus={this.changeLoggedStatus} />
            )}
          </Route>
          <Route path="/dashboard">
            {quizScreen ? (
              <Redirect to="/quiz-screen" />
            ) : (
              <DashBoard changeToQuizScreen={this.changeToQuizScreen} isLoggedIn={isLoggedIn} />
            )}
          </Route>
          <Route path="/quiz-screen">
            <QuizScreen selectQuiz={selectQuiz} changeToQuizScreen={this.changeToQuizScreen} />
          </Route>
          <Route path="/teacher">
            <Teacher isLoggedIn={isLoggedIn} />
          </Route>
        </Router>
      </>
    );
  }
}

export default App;
