import React from 'react';

import './style.scss';

export class ButtonAll extends React.Component {
  render() {
    let { content, action, styles, isDisabled } = this.props;
    return (
      <button
        className={'button-all ' + (this.props.isDisabled ? 'button-disabled' : '')}
        style={styles}
        onClick={action}
        disabled={isDisabled}
      >
        {content}
      </button>
    );
  }
}
