import React from 'react';
import './style.css';

const CustomIunput = (props) => {
    return(
        <input
            className="custom-input"
            placeholder={props.placeHolder}
            style={props.styles}
        />
    );
}

export default CustomIunput;
