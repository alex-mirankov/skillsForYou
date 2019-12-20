import React from 'react';

export class ShareSelect extends React.Component {
  render() {
    let { menuItemObject } = this.props;
    return (
      <select>
        {
          menuItemObject.map((i) => {
            return (
              <option key={i.id} value={i.id}>{i.name}</option>
            );
          })
        }
      </select>
    );
  }
}
