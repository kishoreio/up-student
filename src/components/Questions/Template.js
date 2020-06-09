import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Input from '../commonComponents/Input';

function Template({ temp, isClickedOptionValid, quesNumber }) {
  const choices = [temp.correct_answer, ...temp.incorrect_answers].sort();
  return (
    <>
      <h1 className="text-4xl py-6 px-2 text-center italic template-question-font">{`${quesNumber}). ${temp.question}`}</h1>
      <div className="flex flex-col w-2/4">
        {choices.map((options) => {
          return (
            <div className="flex items-center py-8 px-2 my-2 border rounded shadow-xs hover:bg-pink-200" key={uuidv4()}>
              <Input
                type="radio"
                name="choice"
                value={options}
                func={(e) => isClickedOptionValid(e, temp.correct_answer)}
                className=""
                placeholder=""
              />
              <span className="pl-8">{options}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

Template.defaultProps = {
  temp: [],
};

Template.propTypes = {
  temp: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.array,
  }),
  isClickedOptionValid: PropTypes.func.isRequired,
  quesNumber: PropTypes.number.isRequired,
};

export default Template;
