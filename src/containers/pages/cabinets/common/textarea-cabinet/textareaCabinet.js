import React from 'react';
import './style.scss';

export class TextareaCabinet extends React.Component {
  render() {
    let { caption, handleChange, name } = this.props;
    return (
      <>
        <div className="input-cabinet">
          <div className="input-cabinet__caption">{caption}</div>
          <textarea className="input-cabinet__area"
                    onChange={handleChange}
                    name={name} />
        </div>
      </>
    );
  }
}