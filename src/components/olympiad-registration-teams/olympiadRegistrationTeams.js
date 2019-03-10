import React from 'react';
import './style.css';

import CustomInput from '../input-registration-form/inputRegistrationForm';
import { CustomSelect } from '../custom-input/customInput';
import ButtonAll from '../share/button-all/buttonAll';
import MyModal from '../modal-window/modalWindow';

import { connect } from 'react-redux';
import { openWindow } from '../../redux/actions/modal.acion';

const styles = {
    marginTop: '43px',
}

const stylesButton = {
    margin: '30px auto 29px auto',
}

const inputValuesLanguage = [
    { text: "JS", value: 1 },
    { text: "C#", value: 2 },
    { text: "Python", value: 3 },
    { text: "Java", value: 4 },
    { text: "C++", value: 5 }
];

const inputValuesDate = [
    { text: "11.02.2019", value: 1 },
    { text: "24.05.2019", value: 2 },
    { text: "30.09.2019", value: 3 }
];

const stylesContainer = {
    margin: '20px auto',
}

class OlympiadRegistrationTeams extends React.Component {
    state = {
        currentValueLanguage: "Язык программирования",
        currentValueDate: "Дата проведения"
    };

    handleChangeDate = text => {
        this.setState({ currentValueDate: text });
    };
    handleOpenWindow = () => {
        this.props.closeWindowComp();
    }
    handleChangeLanguage = text => {
        this.setState({ currentValueLanguage: text });
    };
    render() {
        return (
            <div className="card-registration">
                <CustomInput styles={styles} placeHolder={'Ник 1 го участника'} />
                <CustomInput placeHolder={'Ник 2 го участника'} />
                <CustomInput placeHolder={'Ник 3 го участника'} />
                <CustomSelect
                    stylesContainer={stylesContainer}
                    inputValues={inputValuesLanguage}
                    currentValue={this.state.currentValueLanguage}
                    handleChange={this.handleChangeLanguage}
                />
                <CustomSelect
                    stylesContainer={stylesContainer}
                    inputValues={inputValuesDate}
                    currentValue={this.state.currentValueDate}
                    handleChange={this.handleChangeDate}
                />
                <ButtonAll
                    styles={stylesButton}
                    content={'Регистрация'}
                    action={this.handleOpenWindow}
                />
                <MyModal />
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    closeWindowComp: () => {
        dispatch(openWindow());
    }
});

export default connect(null, mapDispatchToProps)(OlympiadRegistrationTeams);
