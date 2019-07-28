import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export function CheckTasks({ total, currents }) {
  return (
    <Pager
      total={total}
      currents={currents}
    />
  );
}

class Pager extends React.Component {

  renderChecks() {
    const { total } = this.props;
    return range(1, total).map((num, idx) => {
      const isDone = this.props.currents.indexOf(num) !== -1;

      return (
        <Check
          key={idx}
          index={idx}
          isDone={isDone}
          className="btn-page btn-page-number"
        >
          {num}
        </Check>
      );
    });
  }

  render() {
    return (
      <nav className="nav-checks">
        {this.renderChecks()}
      </nav>
    );
  }
}

Pager.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

const Check = props => {
  const fullCss = `checkmark ${
    props.isDone ? "text_bold" : ""
  }`;

  return (
    <div className="task-li">
    <input type="checkbox" className="li-checkbox" key={props.index} checked={props.isDone} disabled />
      <span className={fullCss}>{props.children}</span>
    </div>
  );
};

Check.propTypes = {
  isDone: PropTypes.bool,
  className: PropTypes.string
};

function range(start, end) {
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }

  return res;
}
