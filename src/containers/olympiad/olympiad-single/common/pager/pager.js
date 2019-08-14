import React from 'react';
import './style.scss';

const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export class Pager extends React.Component {
  state = {
    currentPage: '',
  };
  handlePagerChange = (item) => {
    this.setState({
      currentPage: item,
    });
  }
  render() {
    let { allTasks } = this.props;
    console.log(allTasks);
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
