import React from 'react';
import './style.scss';

export class InputCabinet extends React.Component {
  render() {
    let { caption, handleChange, placeholder } = this.props;
    return (
      <>
        <div className="input-cabinet">
          <div className="input-cabinet__caption">{caption}</div>
          <input className="input-cabinet__input"
                  type="text"
                  onChange={handleChange}
                  placeholder={placeholder} />
        </div>
      </>
    );
  }
}