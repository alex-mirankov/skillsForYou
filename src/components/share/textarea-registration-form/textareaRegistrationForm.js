import React from 'react';

import './style.scss';

export const TextareaRegistrationForm = (props) => {
  return (
    <textarea
      className="custom-textarea"
      placeholder={props.placeholder}
      onChange={props.action}
      name={props.name}
      style={props.styles}
    />
  )
}
