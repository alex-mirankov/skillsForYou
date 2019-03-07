import React from 'react';
import './style.css';

class ButtonAll extends React.Component {
    render() {
        let { content, action, styles } = this.props;
        return (
            <React.Fragment>
                <button
                    className="button-all"
                    style={styles}
                    onClick={action}
                >
                    {content}
                </button>
            </React.Fragment>
        );
    }
}

export default ButtonAll;
