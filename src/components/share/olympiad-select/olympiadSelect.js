import React from "react";
import './style.scss';

export class OlympiadSelect extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    console.log(this.state.isOpen);
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { inputValues, currentValue, handleChange } = this.props;

    return (
      <div className="olympiad-select">
        <div className="olympiad-select__label"
          onClick={this.handleClick}
          style={this.props.stylesContainer}>
          {currentValue}
        </div>
        {isOpen && (
          <div className="olympiad-select__pop-up">
            {inputValues.map(item => (
              <div
                className="olympiad-select__pop-up-value"
                key={item.id}
                id={item.id}
                onClick={() => {
                  this.handleClick();
                  handleChange(item.name, item.value);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
