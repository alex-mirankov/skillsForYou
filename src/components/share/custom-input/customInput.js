import React from 'react';

import './style.scss';

export class CustomSelect extends React.Component {
  state = {
    isOpen: false,
  }

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  handleChangeColor = (id, color) => {
    let idElement = document.getElementById(id);
    idElement.style.background = color;
    idElement.style.transition = '0.5s';
    idElement.style.color = 'white';
  }

  handleChangeColorInit = (id) => {
    let idElement = document.getElementById(id);
    idElement.style.background = 'white';
    idElement.style.color = 'black';
    idElement.style.transition = '0.5s';
  }

  render() {
    const { isOpen } = this.state;
    const { inputValues, currentValue, handleChange } = this.props;

    return (
      <div className="select">
        <div className="select__label"
          onClick={this.handleClick}
          style={this.props.stylesContainer}>
          {currentValue}
        </div>
        {isOpen && (
          <div className="select__pop-up">
            {inputValues.map(item => (
              <div
                className="select__pop-up-value custom-input__value_hover"
                key={item.value}
                id={item.value}
                onClick={() => {
                  this.handleClick();
                  handleChange(item.text);
                }}
                onMouseOver={() => {
                  this.handleChangeColor(item.value, item.color);
                }}
                onMouseLeave={() => {
                  this.handleChangeColorInit(item.value);
                }}
              >
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
