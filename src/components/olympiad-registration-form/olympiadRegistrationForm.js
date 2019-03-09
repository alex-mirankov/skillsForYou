import React from 'react';
import './style.css';

import { connect } from 'react-redux';
import { openWindow } from '../../redux/actions/modal.acion';

import CustomInput from '../input-registration-form/inputRegistrationForm';
import ButtonAll from '../../components/share/button-all/buttonAll';
import MyModal from '../modal-window/modalWindow';

const styles = {
    margin: '0 auto',
}

class OlympiadRegistrationForm extends React.Component {
    handleOpenWindow = () => {
        this.props.closeWindowComp();
    }
    render() {
        return (
            <div className="registration-olymp-form">
                <p className="registration-olymp-form-team-name">Команда Скилсики</p>
                <CustomInput placeHolder={'Имя'} />
                <CustomInput placeHolder={'Фамилия'} />
                <div className="container-button-form">
                    <ButtonAll
                        styles={styles}
                        content={'Регистрация'}
                        action={this.handleOpenWindow}
                    />
                </div>
                <MyModal />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeWindowComp: () => {
        dispatch(openWindow());
    }
});

export default connect(null, mapDispatchToProps)(OlympiadRegistrationForm);
