import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FadeLoader from 'react-spinners/FadeLoader';
import fetchData from '../../services/fetchData';
import Button from '../commonComponents/Button';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: [],
      isLoading: true,
    };
    this.sendQuizDataToApp = this.sendQuizDataToApp.bind(this);
  }

  componentDidMount() {
    fetchData()
      .then((data) => {
        this.setState({
          quizData: data.quizData,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  sendQuizDataToApp(data) {
    const { changeToQuizScreen } = this.props;
    changeToQuizScreen(data);
  }

  render() {
    const { isLoading, quizData } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoading) {
      return (
        <section className="w-full flex items-center justify-center loading-height">
          <FadeLoader color="#3672D7" />
        </section>
      );
    }
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <section className="w-full px-8">
        <h1 className="py-4 text-5xl text-purple-600">Available Quiz</h1>
        <div className="flex flex-wrap items-center justify-center flex-mobile">
          {quizData.map((items) => {
            const { category, difficulty, data } = items.results[0];
            return (
              <div
                className="flex flex-col border-4 border-pink-600 w-1/4 items-center py-4 mx-2 my-2 h-40 justify-around width-mobile shadow bg-custom"
                key={uuidv4()}
              >
                <h1>
                  <span className="pr-1">Category:</span>
                  {category}
                </h1>
                <h1>
                  <span className="pr-1">Difficulty:</span>
                  {difficulty}
                </h1>
                <Button
                  func={() => this.sendQuizDataToApp(data)}
                  buttonClass="bg-blue-600 py-1 px-2 hover:bg-blue-400 outline-none"
                  textClass="text-white"
                  text="Start"
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

DashBoard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  changeToQuizScreen: PropTypes.func.isRequired,
};

export default DashBoard;
