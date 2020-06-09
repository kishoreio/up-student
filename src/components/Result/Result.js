import React from 'react';
import PropTypes from 'prop-types';
import { BsCheck, BsX } from 'react-icons/bs';
import '../../style.css';

function Result({ correct, wrong }) {
  const percentage = correct * 10;
  return (
    <section className="flex flex-col items-center">
      <h1 className="py-8 text-5xl">Quiz Scorecard</h1>
      <div className="flex flex-col items-center justify-between border score-height score-width shadow-md">
        <div className="flex flex-col items-center justify-around score-text-height">
          <h1 className="text-4xl">{`${percentage}%`}</h1>
          <span className="text-5xl">{percentage > 50 ? '🥳' : '😔'}</span>
          <h4 className="text-3xl">{percentage > 50 ? 'PASS' : 'FAIL'}</h4>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex justify-around w-2/4 py-4 score-border">
            <BsX size="2rem" color="red" />
            <h1>{wrong}</h1>
          </div>
          <div className="flex justify-around w-2/4 py-4 score-border">
            <BsCheck size="2rem" color="green" />
            <h1>{correct}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

Result.propTypes = {
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
};

export default Result;
