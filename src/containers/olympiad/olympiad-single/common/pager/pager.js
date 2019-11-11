import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { setNumericOlympiad } from '../../../../../redux/actions/index';

class PagerComponent extends React.Component {
  state = {
    currentPage: this.props.currentPage,
  };

  handlePagerChange = (item) => {
    if (item !== this.state.currentPage) {
      this.setState({
        currentPage: item,
      });
      this.props.SetNumericOlympiad(item);
    }
  }

  render() {
    let { allTasks } = this.props;
    return (
      <div className="pager">
        {
          allTasks.map((item, index) => {
            return (
              <div className={`pager__numeric ${item.id === this.state.currentPage ? 'pager__numeric-active' : null}`}
                onClick={() => this.handlePagerChange(item.id)}>
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
