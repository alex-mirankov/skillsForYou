import React from 'react';

import './style.scss';

export class Warning extends React.Component {
  render() {
    return (
      <div className="warning">
        <p className="warning__text">
          {this.props.warningText}
        </p>
      </div>
    );
  }
}
