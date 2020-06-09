import React, { Component } from 'react';
import PropTypes from 'prop-types';
import submit from '../../resources/submit.svg';
import postData from '../../services/postData';
import Button from '../commonComponents/Button';

class Submission extends Component {
  componentDidMount() {
    const { category, difficulty, questionArr } = this.props;
    const data = { results: [{ category, difficulty, data: questionArr }] };
    postData('teacher', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <figure className="flex flex-col items-center justify-evenly submit-height">
        <img src={submit} alt="submit" className="h-64" />
        <figcaption className="text-2xl">Your Question Submitted</figcaption>
        <Button
          func={() => window.location.reload()}
          buttonClass="border-4 border-orange-500 bg-orange-300 text-white font-bold p-4 shadow-md"
          text="Submit Another Question"
          textClass=""
        />
      </figure>
    );
  }
}

Submission.defaultProps = {
  questionArr: [],
};

Submission.propTypes = {
  questionArr: PropTypes.arrayOf(
    PropTypes.shape({
      questions: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.array.isRequired,
    })
  ),
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default Submission;
