import React from 'react';
import './style.scss';

export class SelectOlympiad extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };
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