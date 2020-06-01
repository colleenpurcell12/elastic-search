import React from "react";
import "./Elastic.css";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import {
  Fundamentals2InstallAndConfig,
  Fundamentals3CRUDOperations,
  Fundamentals3SearchingData,
  Queries1RelevancePart1,
  Queries1RelevancePart2,
  Queries2FullTextQueries,
  Queries3CombiningQueries,
  Queries4aSearch,
  Queries4bSearchHighlighting,
  Queries4cSearchSorting,
  Queries4dSearchPagination,
} from "./Elastic/index.js";

export default function Elastic({ match }) {
  return (
    <div>
      <Router>
        <div>
          <h1>Elastic Engineer I Topics, Part 1</h1>
          <div className="topic-links-container topic-links-container-four-column">
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Fundamentals</h2>
              <li>
                <NavLink to={`${match.url}/Fundamentals2InstallAndConfig`}>
                  2 Install And Config
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Fundamentals3CRUDOperations`}>
                  3 CRUD Operations
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Fundamentals3SearchingData`}>
                  *3 Searching Data
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Queries Part 1</h2>
              <li>
                <NavLink to={`${match.url}/Queries1RelevancePart1`}>
                  *1 Relevance
                </NavLink>
              </li>

              <li>
                <NavLink to={`${match.url}/Queries2FullTextQueries`}>
                  2 Full Text Queries
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Queries3CombiningQueries`}>
                  3 Combining Queries
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Queries Part II</h2>

              <li>
                <NavLink to={`${match.url}/Queries4aSearch`}>
                  4a Term Level Queries
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Queries4bSearchHighlighting`}>
                  4b Highlighting
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Queries4cSearchSorting`}>
                  4c Sorting
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Queries4dSearchPagination`}>
                  4d Pagination
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Queries1RelevancePart2`}>
                  Query Catch All Page
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="study-info">
            <Route
              path={`${match.url}/Fundamentals2InstallAndConfig`}
              component={Fundamentals2InstallAndConfig}
            />
            <Route
              path={`${match.url}/Fundamentals3CRUDOperations`}
              component={Fundamentals3CRUDOperations}
            />
            <Route
              path={`${match.url}/Fundamentals3SearchingData`}
              component={Fundamentals3SearchingData}
            />
            <Route
              path={`${match.url}/Queries1RelevancePart1`}
              component={Queries1RelevancePart1}
            />
            <Route
              path={`${match.url}/Queries1RelevancePart2`}
              component={Queries1RelevancePart2}
            />
            <Route
              path={`${match.url}/Queries2FullTextQueries`}
              component={Queries2FullTextQueries}
            />
            <Route
              path={`${match.url}/Queries3CombiningQueries`}
              component={Queries3CombiningQueries}
            />
            {/* Queries4aSearch, Queries4bSearchHighlighting,
            Queries4cSearchSorting, Queries4dSearchPagination, */}
            <Route
              path={`${match.url}/Queries4aSearch`}
              component={Queries4aSearch}
            />
            <Route
              path={`${match.url}/Queries4bSearchHighlighting`}
              component={Queries4bSearchHighlighting}
            />
            <Route
              path={`${match.url}/Queries4cSearchSorting`}
              component={Queries4cSearchSorting}
            />
            <Route
              path={`${match.url}/Queries4dSearchPagination`}
              component={Queries4dSearchPagination}
            />
          </div>
        </div>
      </Router>
    </div>
  );
}
