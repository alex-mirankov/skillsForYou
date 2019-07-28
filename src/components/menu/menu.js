import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import "./style.css";

const ITEM_HEIGHT = 48;

export class LongMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = action => {
    if (typeof action === "function") {
      action();
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { options } = this.props;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className="menu__icon_color"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 'auto',
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option.text}
              onClick={() => this.handleClose(option.onClick)}
            >
              <div className="menu-item__text">{option.text}</div>
            </MenuItem>
          ))}
        </Menu>
        </React.Fragment>
    );
  }
}

LongMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({}))
};

LongMenu.defaultProps = {
  options: null
};
