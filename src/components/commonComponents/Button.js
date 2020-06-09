import React from 'react';
import PropTypes from 'prop-types';

function Button({ func, buttonClass, textClass, text }) {
  return (
    <button type="submit" onClick={func} className={`${buttonClass} cursor-pointer`}>
      <span className={textClass}>{text}</span>
    </button>
  );
}

Button.propTypes = {
  func: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
  textClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
