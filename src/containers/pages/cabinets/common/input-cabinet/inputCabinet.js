import React from 'react';
import './style.scss';
import InputMask from 'react-input-mask';
export class InputCabinet extends React.Component {

  render() {
    let { caption, handleChange, placeholder, isMaskThere } = this.props;
    const formatChars = {
      '1': '[0-1]',
      '2': '[0-2]',
      '3': '[0-9]',
      '9': '[0-9]',
    }
    return (
      <>
        <div className="input-cabinet">
          <div className="input-cabinet__caption">{caption}</div>
          {!isMaskThere 
            ? 
            <input className="input-cabinet__input"
            maxLength={isMaskThere ? 10 : null}
            type="text"
            onChange={handleChange}
            placeholder={placeholder} />
            :
            <InputMask
              className="input-cabinet__input"
              mask="12/39/2999"
              formatChars={formatChars}
              onChange={handleChange}
              placeholder={placeholder}>
            </InputMask>
          }
        </div>
      </>
    );
  }
}