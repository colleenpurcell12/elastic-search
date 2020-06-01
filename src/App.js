import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Elastic from "./components/ElasticEngineerCertificationCourse/ElasticOneContainer";
import ElasticOnePart2 from "./components/ElasticEngineerCertificationCourse/ElasticOnePart2Container";
import ElasticTwo from "./components/ElasticEngineerCertificationCourse/ElasticTwoContainer";
import ElasticTwoPart2 from "./components/ElasticEngineerCertificationCourse/ElasticTwoPart2Container";
import TitlePage from "./components/TitlePage";
import ExamObjectives from "./components/Exam/ExamObjectives";

// /Users/purcellc / Documents / my - app / src / InterviewPrep.js / LightsOut.js
function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <div className="header">
            <ul className="main-nav-links">
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/objectives" exact>
                  Objectives
                </NavLink>
              </li>
              <li>
                <NavLink to="/ElasticI" exact>
                  Elastic I: Part 1
                </NavLink>
              </li>
              <li>
                <NavLink to="/ElasticIPart2" exact>
                  Elastic I: Part 2
                </NavLink>
              </li>

              <li>
                <NavLink to="/ElasticII" exact>
                  Elastic II: Part 1
                </NavLink>
              </li>
              <li>
                <NavLink to="/ElasticIIPart2" exact>
                  Elastic II: Part 2
                </NavLink>
              </li>
            </ul>
          </div>
          <Route
            exact
            path="/"
            render={() => {
              return <TitlePage />;
            }}
          />

          <Route exact path="/objectives" component={ExamObjectives} />
          <Route exact path="/ElasticI" component={Elastic} />
          <Route exact path="/ElasticIPart2" component={ElasticOnePart2} />
          <Route exact path="/ElasticII" component={ElasticTwo} />
          <Route exact path="/ElasticIIPart2" component={ElasticTwoPart2} />
        </div>
      </Router>
    </div>
  );
}

export default App;
