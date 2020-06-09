import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiFillHome, AiOutlineClockCircle } from 'react-icons/ai';
import { MdQuestionAnswer } from 'react-icons/md';
import Questions from '../Questions/Questions';
import Clock from '../Clock/Clock';

class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.incrementQuestionCount = this.incrementQuestionCount.bind(this);
  }

  incrementQuestionCount() {
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
  }

  render() {
    const { count } = this.state;
    const { selectQuiz, changeToQuizScreen } = this.props;
    if (selectQuiz.length < 1) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <section className="flex flex-col">
        <div className="flex justify-around">
          <div className="flex items-center justify-center bg-orange-400 w-1/3 h-12">
            <AiOutlineClockCircle size="1.5rem" color="white" />
            <Clock count={count} />
          </div>
          <div className="flex items-center justify-center bg-green-400 w-1/3 h-12">
            <MdQuestionAnswer size="1.5rem" color="white" />
            <h3 className="px-2 text-white">{`${count}/10`}</h3>
          </div>
          <div className="flex items-center justify-center bg-teal-400 w-1/3 h-12">
            <AiFillHome size="1.5rem" color="white" />
            <Link to="/dashboard" onClick={() => changeToQuizScreen([])}>
              <h3 className="px-2 text-white">Dashboard</h3>
            </Link>
          </div>
        </div>
        <Questions count={count} incrementQuestionCount={this.incrementQuestionCount} selectQuiz={selectQuiz} />
      </section>
    );
  }
}

QuizScreen.defaultProps = {
  selectQuiz: [],
};

QuizScreen.propTypes = {
  selectQuiz: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.array.isRequired,
      correct_answer: PropTypes.string.isRequired,
    })
  ),
  changeToQuizScreen: PropTypes.func.isRequired,
};

export default QuizScreen;
