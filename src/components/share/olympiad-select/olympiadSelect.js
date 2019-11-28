import React from "react";
import './style.scss';

import { CircularIndeterminate } from '../../share';

export class OlympiadSelect extends React.Component {
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
    console.log(inputValues);

    return (
      <div className="olympiad-select">
        <div className="olympiad-select__label"
          onClick={this.handleClick}
          style={this.props.stylesContainer}>
          {currentValue}
        </div>
        {isOpen && (
          <div className="olympiad-select__pop-up">
            {
              !inputValues
              ? <div className="olympiad-select__loader">
                  <CircularIndeterminate />
                </div>
              : null
            }
            {
              inputValues.length === 0
              ? <div className="olympiad-select__loader-text">
                  Нет созданных олимпиад
                </div>
              : null
            }
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
