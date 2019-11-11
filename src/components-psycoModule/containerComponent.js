import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';
import Show from './showAllTestsComponent/showAllTestsContainer';
import CreateTestMain from './createTestMainComponent/createTestMainContainer';
import PassingTest from './passingTestComponent/passingTestContainer';
import UserComponent from './userComponent/UserContainer';
import SearchResults from './searchResultsComponent/searchResultsContainer'
class containerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {

    return (
      <Container>

        <UserComponent />

        <Route exact path='/tests/:Npage' component={Show} />
        <Route exact path='/tests/createTest/:testType' component={CreateTestMain} />
        <Route exact path='/tests/editTest' component={CreateTestMain} />
        <Route exact path='/tests/passingTest/:testId' component={PassingTest} />
        <Route exact path='/tests/searchResults' component={SearchResults} />
      </Container>
    )

  }
}

export default containerComponent