import React from 'react';
import './style.scss';

export const InputRegistrationForm = (props) => {
	return (
		<input
			className="custom-input"
			placeholder={props.placeHolder}
			style={props.styles}
		/>
	);
}
