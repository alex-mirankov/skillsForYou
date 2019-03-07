import React from 'react';
import './style.css';

import CustomInput from '../input-registration-form/inputRegistrationForm';
import { CustomSelect } from '../custom-input/customInput';
import ButtonAll from '../share/button-all/buttonAll';

const styles = {
    marginTop: '43px',
}

const inputValuesCategory = [
    { text: "Базы данных", value: 1 },
    { text: "Веб разработка", value: 2 },
    { text: "Языки программирования", value: 3 },
    { text: "Мобильная разработка", value: 4 },
    { text: "Другое", value: 5 }
];

const inputValuesСomplexity = [
    { text: "Начинающий", value: 2 },
    { text: "Средний", value: 3 },
    { text: "Продвинутый", value: 4 }
];

class OlympiadRegistrationTeams extends React.Component {
    state = {
        currentValueComplexity: "Уровень сложности",
        currentValueCategory: "Все категории "
    };

    handleChangeCategory = text => {
        this.setState({ currentValueCategory: text });
    };

    handleChangeComplexity = text => {
        this.setState({ currentValueComplexity: text });
    };
    render() {
        return (
            <div className="card-registration">
                <CustomInput styles={styles} placeHolder={'Ник 1 го участника'} />
                <CustomInput placeHolder={'Ник 2 го участника'} />
                <CustomInput placeHolder={'Ник 3 го участника'} />
                <CustomSelect
                    inputValues={inputValuesСomplexity}
                    currentValue={this.state.currentValueComplexity}
                    handleChange={this.handleChangeComplexity}
                />
                <CustomSelect
                    inputValues={inputValuesCategory}
                    currentValue={this.state.currentValueCategory}
                    handleChange={this.currentValueCategory}
                />
                <ButtonAll content={'Регистрация'} />
            </div>
        );
    };
}

export default OlympiadRegistrationTeams;
