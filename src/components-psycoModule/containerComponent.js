import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';
import Show from './showAllTestsComponent/showAllTestsContainer';
import CreateTestMain from './createTestMainComponent/createTestMainContainer';
import PassingTest from './passingTestComponent/passingTestContainer';
import UserComponent from './userComponent/UserContainer';
import SearchResults from './searchResultsComponent/searchResultsContainer'
import './style.css';
class containerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {

    return (
      <div className="psyco-block">
      <Container className="psyco-block__container">

        <UserComponent />

        <Route exact path='/tests/:Npage' component={Show} />
        <Route exact path='/tests/createTest/:testType' component={CreateTestMain} />
        <Route exact path='/tests/editTest' component={CreateTestMain} />
        <Route exact path='/tests/passingTest/:testId' component={PassingTest} />
        <Route exact path='/tests/search/searchResults' component={SearchResults} />
      </Container>
      </div>
    )

  }
}

export default containerComponent