import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { closeWindow } from '../../redux/actions/modal.acion';
import './style.css';

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
        const { classes, open } = this.props;

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
                        <p className="modal-main modal-head">
                            Спасибо за регистрацию!
                        </p>
                        <p className="modal-main">
                            Каждому участнику придет уведомление на почту
                            для  подтверждения участия в олимпиаде.
                        </p>
                        <SimpleModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

ModalWindow.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    open: state.modal.open,
});

const mapDispathToProps = (dispatch) => ({
    closeWindowComp: () => {
        dispatch(closeWindow());
    }
});

const SimpleModalWrapped = withStyles(styles)(ModalWindow);
const MyModal = connect(mapStateToProps, mapDispathToProps)(SimpleModalWrapped);

export default MyModal;
