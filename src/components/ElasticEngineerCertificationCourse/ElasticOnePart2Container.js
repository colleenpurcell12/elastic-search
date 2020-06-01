import React from "react";
import "./Elastic.css";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import {
  Aggregations1MetricsAggs,
  Aggregations2BucketAggs,
  Aggregations3aCombiningAggs,
  Aggregations3bCombiningAggs,
  // TextAnalysisAndMappings,
  TextAnalysisAndMappings1,
  TextAnalysisAndMappings2,
  TextAnalysisAndMappings3,
  TextAnalysisAndMappings4,
  NodesAndShards1MasterNodes,
  NodesAndShards2NodeRoles,
  NodesAndShards3Shards,
  MonitoringandTroubleshooting,
  MonitoringandTroubleshooting2,
  MonitoringandTroubleshooting3,
} from "./ElasticOnePart2/index.js";
import * as All from "./Elastic";
// import { ClusterDeployment4MultipleClusterSetups } from "./ElasticTwo/index.js";

export default function Elastic({ match }) {
  console.log({ All });
  console.log("Elastic", { match });

  return (
    <div>
      <Router>
        <div>
          <h1>Elastic Engineer I Topics, Part 2</h1>
          <div className="topic-links-container topic-links-container-four-column">
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Aggregations</h2>
              <li>
                <NavLink to={`${match.url}/Aggregations1MetricsAggs`}>
                  1 Metrics Aggregations
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Aggregations2BucketAggs`}>
                  2 Bucket Aggregations
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Aggregations3aCombiningAggs`}>
                  3a Combining Aggregations
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/Aggregations3bCombiningAggs`}>
                  3b Combining Aggregations
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">
                Text Analysis And Mappings
              </h2>
              <li>
                <NavLink to={`${match.url}/TextAnalysisAndMappings1`}>
                  *1 What is a Mapping
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/TextAnalysisAndMappings2`}>
                  2 Text and Keyword Strings
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/TextAnalysisAndMappings3`}>
                  *3 Inverted Index and Doc Values
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/TextAnalysisAndMappings4`}>
                  4 Custom Mappings
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Nodes and Shards</h2>
              <li>
                <NavLink to={`${match.url}/NodesAndShards1MasterNodes`}>
                  *1 Nodes and Shards
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/NodesAndShards2NodeRoles`}>
                  2 Node Roles
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/NodesAndShards3Shards`}>
                  3 Shards
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">
                Monitoring and Troubleshooting
              </h2>
              <li>
                <NavLink to={`${match.url}/MonitoringandTroubleshooting`}>
                  1 Diagnosing issues (_shard)
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/MonitoringandTroubleshooting2`}>
                  *2 Monitoring
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="study-info">
            <Route
              path={`${match.url}/Aggregations1MetricsAggs`}
              component={Aggregations1MetricsAggs}
            />
            <Route
              path={`${match.url}/Aggregations2BucketAggs`}
              component={Aggregations2BucketAggs}
            />
            <Route
              path={`${match.url}/Aggregations3aCombiningAggs`}
              component={Aggregations3aCombiningAggs}
            />
            <Route
              path={`${match.url}/Aggregations3bCombiningAggs`}
              component={Aggregations3bCombiningAggs}
            />
            <Route
              path={`${match.url}/TextAnalysisAndMappings1`}
              component={TextAnalysisAndMappings1}
            />
            <Route
              path={`${match.url}/TextAnalysisAndMappings2`}
              component={TextAnalysisAndMappings2}
            />
            <Route
              path={`${match.url}/TextAnalysisAndMappings3`}
              component={TextAnalysisAndMappings3}
            />
            <Route
              path={`${match.url}/TextAnalysisAndMappings4`}
              component={TextAnalysisAndMappings4}
            />

            <Route
              path={`${match.url}/NodesAndShards1MasterNodes`}
              component={NodesAndShards1MasterNodes}
            />
            <Route
              path={`${match.url}/NodesAndShards2NodeRoles`}
              component={NodesAndShards2NodeRoles}
            />
            <Route
              path={`${match.url}/NodesAndShards3Shards`}
              component={NodesAndShards3Shards}
            />
            <Route
              path={`${match.url}/MonitoringandTroubleshooting`}
              component={MonitoringandTroubleshooting}
            />
            <Route
              path={`${match.url}/MonitoringandTroubleshooting2`}
              component={MonitoringandTroubleshooting2}
            />
            <Route
              path={`${match.url}/MonitoringandTroubleshooting3`}
              component={MonitoringandTroubleshooting3}
            />
          </div>
        </div>
      </Router>
    </div>
  );
}
