import React from 'react';
import './style.scss';
import { element } from 'prop-types';

export class InputCabinet extends React.Component {
  componentDidMount() {
    var dateStart = document.querySelectorAll('.input-cabinet__date')[0];
    var dateEnd = document.querySelectorAll('.input-cabinet__date')[1];
    var dateInputMask = function dateInputMask(elm) {
      elm.addEventListener('keypress', function (e) {
        if ((e.keyCode < 48) || (e.keyCode >= 57 && e.keyCode <= 96) || (e.keyCode >= 105)) {
          e.preventDefault();
        }
        var len = elm.value.length;
        if (len !== 1 || len !== 3) {
          if (e.keyCode === 47) {
            e.preventDefault();
          }
        }
    
        if (len === 2) {
          if(parseInt(elm.value)>12){
            elm.value="12"
          }
          elm.value += '/';
        }
        if (len === 5) {
          elm.value += '/';
        }

      });
    };

    dateInputMask(dateStart);
    dateInputMask(dateEnd);
  }
  render() {
    let { caption, handleChange, placeholder, dateClass } = this.props;
    return (
      <>
        <div className="input-cabinet">
          <div className="input-cabinet__caption">{caption}</div>
          <input className={"input-cabinet__input " + dateClass}
            maxLength={dateClass ? 10 : null}
            type="text"
            onChange={handleChange}
            placeholder={placeholder} />
        </div>
      </>
    );
  }
}