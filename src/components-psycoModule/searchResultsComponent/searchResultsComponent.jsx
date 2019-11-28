import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import './style.css';

var tst;
class SearchResults extends Component {
  state = {
    results: [],
    tests: null
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
    let persID = document.getElementById("pupID").value;
    let testID = document.getElementById("testID").value;
    if (testID === "" || testID === " ") {
      testID = "-1";
    }
    var url = "https://psychotestmodule.herokuapp.com/results/" + persID + "/" + testID + "/";
    axios.get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({ results: response.data })
      })
      .catch(e => {
        console.log(e)
      })
  }
  setDataList() {
    let namesArr = this.state.tests.map(elem => {
      return <option value={elem.test_name}>{elem.test_name}</option>;
    });
    return namesArr;
  }
  render() {

    const { tests, isReady } = this.props;
    return (
      <Container className="search-res-block">
        {this.state.tests ? <div className="search-res-block__container">
          <div className="search-res-block__title">
            <label className="search-res-block__label">Email ученика: </label>
            <input className="search-res-block__input" type="text" id="pupEmail"></input>
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
                <td className="search-res-block__td search-res-block__td_title">NICKNAME</td>
                <td className="search-res-block__td search-res-block__td_title">PERSON ID</td>
                <td className="search-res-block__td search-res-block__td_title">TEST ID</td>
                <td className="search-res-block__td search-res-block__td_title">КОЛИЧЕСТВО БАЛЛОВ</td>
                <td className="search-res-block__td search-res-block__td_title search-res-block__td_result">РЕЗУЛЬТАТ</td>
              </tr>
              {this.state.results ? this.state.results.map((res, ind) => <tr key={ind} className="search-res-block__tr">
                <td className="search-res-block__td">{res.id}</td>
                <td className="search-res-block__td">Иванов Иван Иванович</td>
                <td className="search-res-block__td">{res.person_id}</td>
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