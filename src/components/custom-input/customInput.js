import React from "react";
import "./style.css";

export class CustomInput extends React.Component {
  state = {
    isOpen: false
  };

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { inputValues, currentValue, handleChange } = this.props;

    return (
      <div className="custom-input-container">
        <div className="custom-input__text" onClick={this.handleClick}>
          {currentValue}
        </div>
        {isOpen && (
          <div className="custom-input__pop-up-panel">
            {inputValues.map(item => (
              <div
                className="custom-input__value custom-input__value_hover"
                key={item.value}
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
