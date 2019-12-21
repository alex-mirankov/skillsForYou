import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import './style.scss';

class SearchResults extends Component {
  state = {
    results: [],
    tests: null,
    idObj: {}
  }

  tableToExcel(tableId) {
    var htmltable = document.getElementById(tableId);
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
  }

  componentDidMount() {
    const { setTests } = this.props
    this.setState({ currentPageNumber: this.props.match.params.Npage });
    axios.get('https://psychotestmodule.herokuapp.com/tests/')
      .then((response) => {

        this.setState({ tests: response.data });

      })
      .catch(e => {
        console.log(e)
      })
  }

  checkResTes() {
    let userEmail = document.getElementById("userEmail").value;
    let testName = document.getElementById("testName").value;
    let testId = this.state.idObj[testName];
    if (userEmail === "" || userEmail === " ") {
      userEmail = -1;
    }
    let searchObj = {
      user_email: userEmail,
      test_id: testId
    }
    let url = "https://psychotestmodule.herokuapp.com/results/";
    axios.post(url, searchObj)
      .then((response) => {
        this.setState({ results: response.data })
      })
      .catch(e => {
        console.log(e)
      })
  }
  setDataList() {
    let idsObject = {}
    let namesArr = this.state.tests.map(elem => {
      idsObject[elem.test_name.replace('\r\n', '')] = elem.id;
      return <option value={elem.test_name} id={elem.id}>{elem.test_name}</option>;
    });
    this.state.idObj = idsObject;
    return namesArr;
  }
  render() {
    const { tests, isReady } = this.props;
    return (
      <Container className="search-res-block">
        {this.state.tests ? <div className="search-res-block__container">
          <div className="search-res-block__title">
            <label className="search-res-block__label">Email ученика: </label>
            <input
              className="search-res-block__input"
              type="text"
              id="userEmail"
              disabled={!this.props.userTeacherStatus}
              defaultValue={!this.props.userTeacherStatus ? this.props.userEmail : ""}></input>
            <label className="search-res-block__label">Название теста</label>
            <input className="search-res-block__input search-res-block__input_list" id="testName" list="queryTests"></input>
            <datalist id="queryTests">
              {this.setDataList()}
            </datalist>
            <button className="search-res-block__btn" onClick={() => { this.checkResTes() }}>Найти</button>
            <div>

              <button className="search-res-block__btn search-res-block__btn_excel" onClick={() => { this.tableToExcel('testTable') }}>Экспорт в Excel</button>
            </div>
          </div>

          <table className="search-res-block__table" id="testTable">
            <tbody>
              <tr className="search-res-block__tr">
                <td className="search-res-block__td search-res-block__td_title">ID</td>
                <td className="search-res-block__td search-res-block__td_title">ID пользователя</td>
                <td className="search-res-block__td search-res-block__td_title">Почта пользователя</td>
                <td className="search-res-block__td search-res-block__td_title">Имя</td>
                <td className="search-res-block__td search-res-block__td_title">ID теста</td>
                <td className="search-res-block__td search-res-block__td_title">Количество баллов</td>
                <td className="search-res-block__td search-res-block__td_title search-res-block__td_result">Результат</td>
              </tr>
              {this.state.results ? this.state.results.map((res, ind) => <tr key={ind} className="search-res-block__tr">
                <td className="search-res-block__td">{res.id}</td>
                <td className="search-res-block__td">{res.person_id}</td>
                <td className="search-res-block__td">{res.user_email}</td>
                <td className="search-res-block__td">{res.user_full_name}</td>
                <td className="search-res-block__td">{res.test_id}</td>
                <td className="search-res-block__td">{res.test_count_point}</td>
                <td className="search-res-block__td">{res.test_result}</td>
              </tr>) : null}
            </tbody>
          </table>

        </div> : <div className="lds-facebook"><div></div><div></div><div></div></div>}
      </Container>
    )
  }
}

export default SearchResults