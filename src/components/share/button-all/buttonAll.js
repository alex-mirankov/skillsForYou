import React from 'react';
import './style.scss';

export class ButtonAll extends React.Component {
  render() {
    let { content, action, styles } = this.props;
    return (
      <button
        className="button-all"
        style={styles}
        onClick={action}
      >
        {content}
      </button>
    );
  }
}
