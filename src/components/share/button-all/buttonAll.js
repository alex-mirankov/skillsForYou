import React from 'react';
import './style.css';

class ButtonAll extends React.Component {
    render() {
        let { content, action } = this.props;
        return (
            <React.Fragment>
                <button
                    className="button-all"
                    onClick={action}
                >
                    {content}
                </button>
            </React.Fragment>
        );
    }
}

export default ButtonAll;
