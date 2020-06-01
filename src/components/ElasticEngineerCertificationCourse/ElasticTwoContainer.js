import React from "react";
import "./Elastic.css";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import {
  DM1Denormalization,
  DM2NestedAndJoinDataTypes,
  DM3FieldModelingAndCommonSchema,
  DM4Analyzers,
  DataProcess1UpdateQueryReindex,
  DataProcess2IngestNodesAndPipelines,
  DataProcessing3PainlessScripting,
  Dev2Prod1Security,
  Dev2Prod2Modes,
  Dev2Prod3Scaling,
  // Dev2Prod4ServerConfiguration,
} from "./ElasticTwo/index.js";

export default function ElasticTwo({ match }) {
  return (
    <div>
      <Router>
        <div>
          <h1>Elastic Engineer II Topics</h1>
          <div className="topic-links-container">
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Data Modeling</h2>
              <li>
                <NavLink to={`${match.url}/DM1Denormalization`}>
                  1 Denormalization
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/DM2NestedAndJoinDataTypes`}>
                  2 Nested and Join Data Types
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/DM3FieldModelingAndCommonSchema`}>
                  3 Field Modeling & Common Schema
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/DM4Analyzers`}>4 Analyzers</NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Data Processing</h2>

              <li>
                <NavLink to={`${match.url}/DataProcess1UpdateQueryReindex`}>
                  1 Update Query and Reindex
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${match.url}/DataProcess2IngestNodesAndPipelines`}
                >
                  2 Ingest Nodes And Pipelines
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/DataProcessing3PainlessScripting`}>
                  3 Painless Scripting
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">
                Development to Production
              </h2>
              <li>
                <NavLink to={`${match.url}/Dev2Prod1Security`}>
                  1 Security
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Dev2Prod2Modes`}>2 Modes</NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Dev2Prod3Scaling`}>
                  3 Scaling
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="study-info">
            <Route
              path={`${match.url}/DM1Denormalization`}
              component={() => <DM1Denormalization />}
            />
            <Route
              path={`${match.url}/DM2NestedAndJoinDataTypes`}
              component={() => <DM2NestedAndJoinDataTypes />}
            />
            <Route
              path={`${match.url}/DM3FieldModelingAndCommonSchema`}
              component={() => <DM3FieldModelingAndCommonSchema />}
            />
            <Route
              path={`${match.url}/DM4Analyzers`}
              component={() => <DM4Analyzers />}
            />
            <Route
              path={`${match.url}/DataProcess1UpdateQueryReindex`}
              component={() => <DataProcess1UpdateQueryReindex />}
            />
            <Route
              path={`${match.url}/DataProcess2IngestNodesAndPipelines`}
              component={() => <DataProcess2IngestNodesAndPipelines />}
            />
            <Route
              path={`${match.url}/DataProcessing3PainlessScripting`}
              component={() => <DataProcessing3PainlessScripting />}
            />
            <Route
              path={`${match.url}/Dev2Prod1Security`}
              component={() => <Dev2Prod1Security />}
            />
            <Route
              path={`${match.url}/Dev2Prod2Modes`}
              component={() => <Dev2Prod2Modes />}
            />
            <Route
              path={`${match.url}/Dev2Prod3Scaling`}
              component={() => <Dev2Prod3Scaling />}
            />
          </div>
        </div>
      </Router>
    </div>
  );
}
