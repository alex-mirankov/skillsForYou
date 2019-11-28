import React from 'react';
import './style.scss';

export class InputCabinet extends React.Component {
  componentDidMount() {
    var dateStart = document.querySelectorAll('.input-cabinet__date')[0];
    var dateEnd = document.querySelectorAll('.input-cabinet__date')[1];
    var dateInputMask = function dateInputMask(elm) {
      elm.addEventListener('keypress', function (e) {
        if (e.keyCode < 47 || e.keyCode > 57) {
          e.preventDefault();
        }
        var len = elm.value.length;
        if (len !== 1 || len !== 3) {
          if (e.keyCode === 47) {
            e.preventDefault();
          }
        }
        if (len === 2) {
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
          <input className={"input-cabinet__input" + " " + dateClass}
            type="text"
            onChange={handleChange}
            placeholder={placeholder} />
        </div>
      </>
    );
  }
}