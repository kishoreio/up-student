import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Template from './Template';
import Result from '../Result/Result';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      wrong: 0,
      iteration: 0,
      question: [],
    };
    this.isClickedOptionValid = this.isClickedOptionValid.bind(this);
    this.generateNextQuestion = this.generateNextQuestion.bind(this);
    this.clearTimeoutFunction = null;
    this.questionSet = null;
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    clearTimeout(this.clearTimeoutFunction);
  }

  componentDidMount() {
    const { selectQuiz } = this.props;
    this.questionSet = selectQuiz;
    this.setState({
      question: [selectQuiz[0]],
    });
  }

  isClickedOptionValid(e, correctAnswer) {
    const answer = e.target.value;
    const { incrementQuestionCount } = this.props;
    if (answer === correctAnswer) {
      this.setState((prevState) => {
        return { correct: prevState.correct + 1, iteration: prevState.iteration + 1 };
      });
      toast.success('Correct Answer !', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
      incrementQuestionCount();
    } else {
      this.setState((prevState) => {
        return { wrong: prevState.wrong + 1, iteration: prevState.iteration + 1 };
      });
      toast.error('Wrong Answer !', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
      incrementQuestionCount();
    }
    this.generateNextQuestion();
  }

  generateNextQuestion() {
    this.clearTimeoutFunction = setTimeout(() => {
      const { iteration } = this.state;
      const currentQuestion = this.questionSet.find((ques, index) => iteration === index);
      this.setState({
        question: [currentQuestion],
      });
    }, 1500);
  }

  render() {
    const { question, correct, wrong, iteration } = this.state;
    const { count } = this.props;
    if (count >= 10) {
      return <Result correct={correct} wrong={wrong} />;
    }
    return (
      <section className="w-full h-full flex flex-col items-center">
        {question.map((temp) => (
          <Template
            key={uuidv4()}
            temp={temp}
            isClickedOptionValid={this.isClickedOptionValid}
            quesNumber={iteration + 1}
          />
        ))}
      </section>
    );
  }
}

Questions.defaultProps = {
  selectQuiz: [],
};

Questions.propTypes = {
  selectQuiz: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.array.isRequired,
      correct_answer: PropTypes.string.isRequired,
    })
  ),
};

Questions.propTypes = {
  count: PropTypes.number.isRequired,
  incrementQuestionCount: PropTypes.func.isRequired,
};

export default Questions;
