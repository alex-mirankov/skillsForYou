import React from 'react';
import './style.css';

class ButtonAll extends React.Component {
    render() {
        let { content } = this.props;
        return (
            <React.Fragment>
                <button className="button-all">
                    {content}
                </button>
            </React.Fragment>
        );
    }
}

export default ButtonAll;
