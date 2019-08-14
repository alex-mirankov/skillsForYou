import React from 'react';
import './style.scss';

export class SelectCabinet extends React.Component {
  state = {
    isOpen: false,
  };
  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };
  render() {
    let { caption, handleChange, inputValues, currentValue } = this.props;
    return (
      <>
        <div className="select-cabinet">
          <div className="select-cabinet__caption">{caption}</div>
          <div className="select-cabinet__contol"
                onClick={this.handleClick}>
            <div className="select-cabinet__text">{currentValue}</div>
            <div className="select-cabinet__icon"></div>
          </div>
          {this.state.isOpen && (
            <div className="select-cabinet__pop-up">
              {inputValues.map(item => (
                <div
                  className="select-cabinet__pop-up-value"
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
      </>
    );
  }
}