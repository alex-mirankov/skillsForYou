import React from 'react';
import './style.scss';

export const InputRegistrationForm = (props) => {
	return (
		<input
			className="custom-input"
			placeholder={props.placeHolder}
			onChange={props.action}
			style={props.styles}
			type={props.type}
		/>
	);
}
