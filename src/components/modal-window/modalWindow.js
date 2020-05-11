import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import './style.scss';

import { closeWindow } from '../../redux/actions/index';


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '488px',
    height: '282px',
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    border: '1px solid rgba(0, 0, 0, 0.38)',
    borderRadius: '10px',
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class ModalWindow extends React.Component {

  handleClose = () => {
    this.props.closeWindowComp();
  };

  render() {
    const { classes, open, headerText, descriptionText } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
          className="modal"
        >
          <div style={getModalStyle()} className={classes.paper}>
            <p className="modal__content">
              {headerText}
            </p>
            <p className="modal__content">
              {descriptionText}
            </p>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.modal.open,
});

const mapDispatchToProps = (dispatch) => ({
  closeWindowComp: () => {
    dispatch(closeWindow());
  }
});

const SimpleModalWrapped = withStyles(styles)(ModalWindow);
export const MyModal = connect(mapStateToProps, mapDispatchToProps)(SimpleModalWrapped);
