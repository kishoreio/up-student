import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Submission from '../Submission/Submission';

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      difficulty: '',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      questionArr: [],
      count: 1,
    };
    this.handleFormData = this.handleFormData.bind(this);
    this.submitFormData = this.submitFormData.bind(this);
  }

  handleFormData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitFormData() {
    const { option1, option2, option3, option4, correctAnswer, question, questionArr, count } = this.state;
    let incorrect = `${option1} ${option2} ${option3} ${option4}`.split(' ');
    incorrect = incorrect.filter((option) => option !== correctAnswer);
    const ques = { question, correct_answer: correctAnswer, incorrect_answers: incorrect };
    this.setState({
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      question: '',
      correctAnswer: '',
      questionArr: [...questionArr, ques],
      count: count + 1,
    });
  }

  render() {
    const { isLoggedIn } = this.props;
    const {
      category,
      difficulty,
      option1,
      option2,
      option3,
      option4,
      correctAnswer,
      question,
      questionArr,
      count,
    } = this.state;
    if (!isLoggedIn) return <Redirect to="/" />;
    if (count > 10) return <Submission category={category} difficulty={difficulty} questionArr={questionArr} />;
    return (
      <section className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl">{`Enter your ${count} Question`}</h1>
        <div className="flex py-2">
          <h1 className="text-lg pr-2">Category</h1>
          <input
            type="text"
            name="category"
            value={category}
            onChange={this.handleFormData}
            className="border shadow-md py-1"
          />
        </div>
        <div className="flex py-2">
          <h1 className="text-lg pr-2">Difficulty</h1>
          <input
            type="text"
            name="difficulty"
            value={difficulty}
            onChange={this.handleFormData}
            className="border shadow-md py-1"
          />
        </div>
        <div className="flex py-2">
          <h1 className="text-lg pr-2">Question</h1>
          <textarea
            name="question"
            value={question}
            onChange={this.handleFormData}
            cols="20"
            rows="5"
            className="border shadow-md py-1"
          />
        </div>
        <div className="flex py-2 items-center justify-center">
          <div className="flex flex-col pr-1">
            <h1 className="text-lg pr-2">Option 1</h1>
            <input
              type="text"
              name="option1"
              value={option1}
              onChange={this.handleFormData}
              className="border shadow-md py-1"
            />
            <h1 className="text-lg pr-2">Option 2</h1>
            <input
              type="text"
              name="option2"
              value={option2}
              onChange={this.handleFormData}
              className="border shadow-md py-1"
            />
          </div>
          <div className="flex flex-col pl-1">
            <h1 className="text-lg pr-2">Option 3</h1>
            <input
              type="text"
              name="option3"
              value={option3}
              onChange={this.handleFormData}
              className="border shadow-md py-1"
            />
            <h1 className="text-lg pr-2">Option 4</h1>
            <input
              type="text"
              name="option4"
              value={option4}
              onChange={this.handleFormData}
              className="border shadow-md py-1"
            />
          </div>
        </div>
        <div className="flex py-4">
          <h1 className="text-lg pr-2">Correct Answer</h1>
          <input
            type="text"
            name="correctAnswer"
            value={correctAnswer}
            onChange={this.handleFormData}
            className="border shadow-md py-1"
          />
        </div>
        <button
          type="submit"
          onClick={this.submitFormData}
          className="border border-red-600 bg-red-400 text-white py-2 px-2 hover:bg-red-600"
        >
          Submit
        </button>
      </section>
    );
  }
}

Teacher.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Teacher;
