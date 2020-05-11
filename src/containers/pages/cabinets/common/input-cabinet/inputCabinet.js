import React from 'react';
import InputMask from 'react-input-mask';

import './style.scss';

export class InputCabinet extends React.Component {

  render() {
    let { caption, handleChange, placeholder, isMaskThere, name } = this.props;
    const formatChars = {
      '1': '[0-1]',
      '2': '[0-9]',
      '3': '[0-3]',
      '4': '[0-9]',
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
                    placeholder={placeholder}
                    name={name} />
            :
            <InputMask className="input-cabinet__input"
                        mask="12/39/2999"
                        formatChars={formatChars}
                        onChange={handleChange}
                        placeholder={placeholder}
                        name={name}
                        >
            </InputMask>
          }
        </div>
      </>
    );
  }
}