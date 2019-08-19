import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { setNumericOlympiad } from '../../../../../redux/actions/index';

class PagerComponent extends React.Component {
  state = {
    currentPage: '',
  };
  handlePagerChange = (item) => {
    this.setState({
      currentPage: item,
    });
    this.props.SetNumericOlympiad(item.id);
  }
  render() {
    let { allTasks } = this.props;
    return (
      <div className="pager">
        {
          allTasks.map((item, index) => {
            return (
              <div className={`pager__numeric ${item === this.state.currentPage ? 'pager__numeric-active' : null}`}
                onClick={() => this.handlePagerChange(item)}>
                {index + 1}
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  SetNumericOlympiad: (id) => {
    dispatch(setNumericOlympiad(id));
  },
})

export const Pager = connect(null, mapDispatchToProps)(PagerComponent);
