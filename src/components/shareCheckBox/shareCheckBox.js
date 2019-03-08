import React from 'react';
import './style.css';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class ShareCheckBox extends React.Component {
    state = {
        checkedYes: true,
        checkedNo: true,
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    render() {
        let { label, name } = this.props;
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.state.checkedB}
                        onChange={this.handleChange(name)}
                        value="checkedB"
                        color="primary"
                    />
                }
                label={label}
            />
        );
    }
}

export default ShareCheckBox;
