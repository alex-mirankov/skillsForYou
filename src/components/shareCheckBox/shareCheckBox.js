import React from 'react';
import 'pretty-checkbox/src/pretty-checkbox.scss';

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
            <React.Fragment>
                <lable className="containerRadio">{label}
                    <input
                        className="customRadio"
                        type="radio"
                        checked={this.state.checkedB}
                        onChange={this.handleChange(name)}
                        value="checkedB"
                        name="radio"
                    />
                    <span className="checkmarkRadio"></span>
                </lable>
                <div class="pretty p-icon p-curve p-pulse">
                    <input type="radio" name="radio66" />
                    <div class="state p-info-o">
                        <i class="icon mdi mdi-check"></i>
                        <label> Python</label>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ShareCheckBox;
