import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { closeWindow } from '../../redux/actions/modal.acion';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

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
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Спасибо за регистрацию!
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
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
