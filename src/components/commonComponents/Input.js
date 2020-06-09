import React from 'react';
import PropType from 'prop-types';

function Input({ type, name, placeholder, value, func, className }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={func}
      className={className}
      required
    />
  );
}

Input.propTypes = {
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  placeholder: PropType.string.isRequired,
  value: PropType.string.isRequired,
  func: PropType.func.isRequired,
  className: PropType.string.isRequired,
};

export default Input;
