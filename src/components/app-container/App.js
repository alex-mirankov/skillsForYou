import React, { Component } from "react";
import { MainPage } from "../../containers/main-page-container";
import { Login } from "../../containers/login-container";
import { Registration } from "../../containers/registration-container";
import { TeacherRegistration } from "../../containers/teacher-registration-container";

import { /* withRouter,*/ Route, Switch } from "react-router-dom";
import { Header } from "../../components/header-component";
import { Footer } from "../../components/footer-component";
import { Work } from "../../containers/work-page-container";
import OlympicEnter from '../../containers/olympiad-enter-container/olympiadEnterContainer';
import OlympiadRegistration from '../../containers/olympiad-registartion/olympiadRegistration';
import OlympiadRegistrationTeam from '../../containers/olympiad-registration-team/olympiadRegistrationTeam';
// import { connect } from "react-redux"; //example

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={Login} />
          <Route path="/olympic-enter" component={OlympicEnter} />
          <Route path="/olympic-registration" component={OlympiadRegistration} />
          <Route path="/olympic-registartion-team" component={OlympiadRegistrationTeam} />

          <Route path="/registration" component={Registration} />
          <Route
            exact
            path="/teacher-registration"
            component={TeacherRegistration}
          />
          <Route exact path="/work" component={Work} />
          <Route path="/*" component={() => "Error 404"} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// const mapStateToProps = state => ({  //example
// });

// const connectedApp = withRouter(connect(mapStateToProps)(App));  //example

export default App;
