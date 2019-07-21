import React from 'react';
import './style.css';
import 'pretty-checkbox/src/pretty-checkbox.scss';

export class ShareCheckBox extends React.Component {
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
      <div className="pretty p-icon p-smooth">
        <input
          type="radio"
          name="radio"
          value="checkedB"
          checked={this.state.checkedB}
          onChange={this.handleChange(name)}
        />
        <div className="state p-success">
          <i className="icon icon-radio fa fa-check"></i>
          <label className="radio-text">{label}</label>
        </div>
      </div>
    );
  }
}
