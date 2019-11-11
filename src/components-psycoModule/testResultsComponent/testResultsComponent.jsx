import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Image, Modal } from 'semantic-ui-react'
// import validate from '../validate';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import './style.css';

class testResults extends Component {
  state = {
    modalOpenResult: false,
    variantImg: [],
    currentIndexVariantImg: null,
    currentResults: []
  }

  handleOpen = () => this.setState({ modalOpenResult: true })

  handleClose = () => this.setState({ modalOpenResult: false })

  setIndex = (index) => { this.setState({ currentIndexVariantImg: index }) }

  FileSelectedHendlerVariants = img => {

    let imgVarArr = this.state.variantImg;
    let files = img;
    let formData = new FormData();
    formData.append("img_field", files);

    axios.post('https://psychotestmodule.herokuapp.com/api/img/', formData)
      .then((response) => {
        imgVarArr[this.state.currentIndexVariantImg] = response.data.img_field;
        this.setState({ variantImg: imgVarArr })
      }).catch(e => {
        console.log(e)
      })
  }

  FileVariantsRemove = index => {
    let imgVarArr = this.state.variantImg;
    imgVarArr.splice(index, 1);
    this.setState({ variantImg: imgVarArr });
  }

  firstTypeHandler(formData, variantImg) {
    var resultArr = [];
    var resultObject = {};

    var index = 0;


    formData.forEach(function (value, key) {
      console.log(key)

      if (key === "result_img" + index) {
        resultObject["result_img"] = variantImg[index];
        if (variantImg[index] == null) {
          resultObject["result_img"] = "null"
        }
      }
      if (key === index + "from") {
        resultObject["min"] = Number(value);
      }

      if (key === index + "to") {
        resultObject["max"] = Number(value);
      }

      if (key === index + "group") {
        resultObject["group"] = value;
      }
      if (key === index + "result") {
        resultObject["result"] = value;
        resultArr.push(resultObject);
        resultObject = {};
        index++;
      }
    });
    return resultArr;
  }
  secondTypeHandler(formData, variantImg) {
    var resultArr = [];
    var resultObject = {};
    var index = 0;

    formData.forEach(function (value, key) {

      if (key === "result_img" + index) {
        resultObject["index"] = index;
        resultObject["result_img"] = variantImg[index];
        if (variantImg[index] == null) {
          resultObject["result_img"] = "null"
        }
      }
      if (key === index + "from") {
        resultObject["min"] = Number(value);
      }

      if (key === index + "to") {
        resultObject["max"] = Number(value);
      }

      if (key === index + "group") {
        resultObject["group"] = value;
      }
      if (key === index + "result") {
        resultObject["result"] = value;
      }
      if (key === index + "description") {
        resultObject["description"] = value;
        resultArr.push(resultObject);
        resultObject = {};
        index++;
      }
    });
    return resultArr;
  }
  createResults(results, setResults, questions, variantImg, testType) {
    var resultArr = [];
    var formData = new FormData(document.forms.resultsForm);
    if (testType === "first") {
      resultArr = this.firstTypeHandler(formData, variantImg)
    }
    if (testType === "second") {
      resultArr = this.secondTypeHandler(formData, variantImg)
    }
    setResults(resultArr);
    console.log(resultArr)
  }

  insertCurrentData(currentVariants) {
    if (typeof currentVariants !== "undefined") {
      setTimeout(() => {
        document.getElementById("insertDataResult").click();
      }, 0);

    }
  }
  addToArr(index, prop, value) {
    let array = this.state.currentResults;
    if (array.length - 1 < index || array.length === 0) {
      for (let i = 0; i <= index; i++) {
        array.push({ min: 0, max: 0 })
      }
    }

    array[index][prop] = value;

    this.state.currentResults = array;
    // this.setState({ currentResults: array })
  }
  deleteFromArr(index) {
    let imgVarArr = this.state.variantImg;
    imgVarArr.splice(index, 1);
    this.setState({ variantImg: imgVarArr });
    this.state.currentResults.splice(index, 1);
  }
  createSelectItems(index, groupsObject) {
    let items = [];
    for (let objKey in groupsObject) {
      let item = <option
        key={objKey} value={objKey} >{objKey} </option>;

      if (this.state.currentResults[index] && objKey === this.state.currentResults[index].group) {
        item = <option
          key={objKey} value={objKey} selected>{objKey} </option>;
      }
      items.push(item);
    }

    return items;
  }

  render() {
    const { results, setResults, questions, testType, editResults, reset, groupResultsState } = this.props
    const renderField = ({ input, label, type, globalField, textValue, index, meta: { touched, error } }) => (
      <div>

        {this.state.currentResults[index] ? delete input.value : ""}

        {groupResultsState && testType === "first"
          ? <div>
            <label className="result-block__label">Группа:</label>
            <select id="group" name={index + "group"} onChange={(e) => { this.addToArr(index, "group", e.target.value) }}>
              {this.createSelectItems(index, this.props.groupsObject)}
            </select>
          </div> : ""}

        <label className="result-block__label">{label}</label>
        {delete input.value}
        <div>
          <textarea
            className="result-block__text"
            {...input}
            type={type}
            defaultValue={textValue}
            onChange={(e) => { this.addToArr(index, "result", e.target.value) }} />
        </div>
        {touched && error && <span>{error}</span>}
      </div>
    )

    const renderNumberField = ({ input, label, name, type, globalField, index, meta: { touched, error } }) => (
      <div>
        {
          testType === "first" ?
            <div>
              <label className="result-block__label">{label}</label>
              {this.state.currentResults[index] ? delete input.value : ""}
              {delete input.value}
              {label === "Промежуток от:" ? <input
                className="result-block__input"
                {...input}
                type={type}
                onChange={(e) => { this.addToArr(index, "min", e.target.value) }}
                defaultValue={this.state.currentResults[index] ? this.state.currentResults[index].min : 0} />
                : <input
                  className="result-block__input"
                  {...input}
                  type={type}
                  onChange={(e) => { this.addToArr(index, "max", e.target.value) }}
                  defaultValue={this.state.currentResults[index] ? this.state.currentResults[index].max : 0} />}


            </div>
            : ""
        }
      </div>
    )

    const renderAnswers = ({ fields, globalField, variantsImgArray, editResults }) => (
      <div>
        {typeof globalField !== "undefined" ?
          <button type="button" id="insertDataResult" onClick={() => {

            if (fields.length <= editResults.length) {
              editResults.forEach((elem, index) => {

                let resultsArr = this.state.currentResults;
                resultsArr.push(elem);
                this.setState({ currentResults: resultsArr });

                fields.push(elem);

                let imgVarArr = this.state.variantImg;
                imgVarArr[index] = elem.result_img
                this.setState({ variantImg: imgVarArr });
                editResults = [];
              });
            };

          }}> Загрузить свои ответы </button> :
          ""
        }
        <button className="result-block__btn" type="button" onClick={() => { fields.push({}); }}>Добавить результат</button>
        <ul className="result-block__ul">
          {fields.map((answer, index) =>
            <li className="result-block_li" key={index}>
              <h4>Результат {index + 1}</h4>
              <div className="result-block__top">
                <div className="result-block__btn-container">
                  <button
                    className="result-block__btn result-block__btn_delete"
                    type="button"
                    title="Удалить результат"
                    onClick={() => { fields.remove(index); this.deleteFromArr(index); }}>Удалить</button>

                  <input
                    className="result-block__img-inpt"
                    type="file"
                    id="resultFile"
                    name={"result_img" + index}
                    onChange={(e) => { this.setIndex(index); this.FileSelectedHendlerVariants(e.target.files[0]); }} />

                  <label className="result-block__file-label" for="resultFile">Выберите файл</label>
                </div>

                <img className="result-block__image" src={variantsImgArray[index] ? variantsImgArray[index] : "https://react.semantic-ui.com/images/avatar/large/rachel.png"} alt='' />
              </div>
              <div className="result-block__gap">
                <Field
                  label="Промежуток от:"
                  name={index + `from`}
                  type="number"
                  component={renderNumberField}
                  globalField={globalField}
                  index={index}
                />
                <Field
                  label="до:"
                  name={index + `to`}
                  type="number"
                  component={renderNumberField}
                  globalField={globalField}
                  index={index}
                />
              </div>
              <div>
                <Field
                  className="answerVar"
                  name={index + `result`}
                  type="text"
                  label={testType === 'first' ? "Текст результата" : "Краткий вариант"}
                  component={renderField}
                  globalField={globalField}
                  index={index}
                  textValue={this.state.currentResults[index] ? this.state.currentResults[index].result : ""}
                />
                {testType === "second" ?
                  <div>
                    <Field
                      className="answerVar"
                      name={index + `description`}
                      type="text"
                      label="Текст результата"
                      component={renderField}
                      globalField={globalField}
                      index={index}
                      textValue={this.state.currentResults[index] ? this.state.currentResults[index].description : ""}
                    />
                  </div>
                  : ""
                }
              </div>
            </li>
          )}
        </ul>
      </div>
    )

    return (
      <div className="result-block">
        <Container className="result-block__container">
          <Modal trigger={<Button onClick={() => { this.handleOpen(); this.insertCurrentData(editResults); }}
            className='result-block__trigger' id="22">Результаты</Button>}
            open={this.state.modalOpenResult}
            centered={false}>
            <Modal.Header>{"Результаты"}</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <div>
                  <form name='resultsForm'>
                    <label>Результаты</label>
                    <div className='answers'>
                      <FieldArray
                        name="allResults"
                        component={renderAnswers}
                        globalField={editResults}
                        editResults={editResults}
                        variantsImgArray={this.state.variantImg} />
                    </div>
                  </form>
                </div>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => { this.handleClose(); reset(); this.setState({ currentResults: [] }) }} color="primary">
                Отмена
            </Button>
              <Button type="submit"
                onClick={() => { this.createResults(results, setResults, questions, this.state.variantImg, testType); this.handleClose(); this.setState({ currentResults: [] }); reset(); }}
                color="primary"
                autoFocus>
                Готово
            </Button>
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    )
  }
}
export default reduxForm({
  form: 'ResultForm'
})(testResults)