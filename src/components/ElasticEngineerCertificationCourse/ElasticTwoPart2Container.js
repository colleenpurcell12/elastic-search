// 1DM1Denormalization.js
// 1DM2NestedAndJoinDataTypes.js
// 1DM3FieldModelingAndCommonSchema.js
// 1DM4Analyzers.js
// 2DataProcess1UpdateQueryReindex.js
// 2DataProcess2IngestNodesAndPipelines.js
// 2DataProcessing3PainlessScripting.js
// 3Dev2Prod1Security.js
// 3Dev2Prod2Modes.js
// 3Dev2Prod3Scaling.js
// 3Dev2Prod4ServerConfiguration.txt
// 4ClusterDeployment1Backup.js
// 4ClusterDeployment2.js
// 4ClusterDeployment3Topology.js
// 4ClusterDeployment4MultipleClusterSetups.js
// 5NodeIndexManagement1ShardAllocation.js
// 5NodeIndexManagement2IndexManagement.js
// 5NodeIndexManagement3IndexLifecycle.js
// 6AdvTips1DistributedOperations.js
// 6AdvTips2AliasesAndTemplates.js
// 6AdvTips3ControllingDynamicBehaviors.js
// 6AdvTips4CommonCausesPoorPerf.js

import React from "react";
import "./Elastic.css";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import {
  ClusterDeployment1Backup,
  ClusterDeployment2,
  ClusterDeployment3Topology,
  ClusterDeployment4MultipleClusterSetups,
  NodeIndexManagement1ShardAllocation,
  NodeIndexManagement2IndexManagement,
  // NodeIndexManagement3IndexLifecycle,
  AdvTips1DistributedOperations,
  AdvTips2IndexAliasesPart1,
  AdvTips2IndexTemplatesPart2,
  AdvTips2SearchTemplatesPart3,
  // AdvTips2AliasesAndTemplates,
  AdvTips3ControllingDynamicBehaviors,
  AdvTips4CommonCausesPoorPerf,
} from "./ElasticTwoPart2/index.js";
// import * as All from "./Elastic";
// import { ClusterDeployment4MultipleClusterSetups } from "./ElasticTwo/index.js";

export default function ElasticTwoPart2({ match }) {
  return (
    <div>
      <Router>
        <div>
          <h1>Elastic Engineer II Topics</h1>
          <div className="topic-links-container">
            <ul className="elastic-topics">
              {/* <li>
              <NavLink to={`${match.url}/Queries-Part-1`}>
                Queries Part 1: concepts, match_all, match, exists
              </NavLink>
            </li> */}
              <h2 className="elastic-topic-header">Cluster Deployment</h2>

              <li>
                <NavLink to={`${match.url}/ClusterDeployment1Backup`}>
                  1 Backup
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/ClusterDeployment2`}>
                  *2 Upgrades and Cluster Restart
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/ClusterDeployment3Topology`}>
                  3 Topology
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${match.url}/ClusterDeployment4MultipleClusterSetups`}
                >
                  4 MultipleClusterSetups
                </NavLink>
              </li>
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">
                Node and Index Management
              </h2>

              <li>
                <NavLink
                  to={`${match.url}/NodeIndexManagement1ShardAllocation`}
                >
                  1 Shard Allocation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${match.url}/NodeIndexManagement2IndexManagement`}
                >
                  *2 Index Management
                </NavLink>
              </li>
              {/* <li>
                <NavLink to={`${match.url}/NodeIndexManagement3IndexLifecycle`}>
                  3 Index Lifecycle
                </NavLink>
              </li> */}
            </ul>
            <ul className="elastic-topics">
              <h2 className="elastic-topic-header">Advanced Tips and Tricks</h2>
              <li>
                <NavLink to={`${match.url}/AdvTips1DistributedOperations`}>
                  1 Distributed Operations
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/AdvTips2IndexAliasesPart1`}>
                  2a Index Aliases
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/AdvTips2IndexTemplatesPart2`}>
                  2b Template Aliases
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/AdvTips2SearchTemplatesPart3`}>
                  2c Search Template
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={`${match.url}/AdvTips3ControllingDynamicBehaviors`}
                >
                  3 Controlling Dynamic Behaviors
                </NavLink>
              </li>
              <li>
                <NavLink to={`${match.url}/AdvTips4CommonCausesPoorPerf`}>
                  *4 Common Causes of Poor Perf
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="study-info">
            <Route
              path={`${match.url}/ClusterDeployment1Backup`}
              component={() => <ClusterDeployment1Backup />}
            />
            <Route
              path={`${match.url}/ClusterDeployment2`}
              component={() => <ClusterDeployment2 />}
            />
            <Route
              path={`${match.url}/ClusterDeployment3Topology`}
              component={() => <ClusterDeployment3Topology />}
            />
            <Route
              path={`${match.url}/ClusterDeployment4MultipleClusterSetups`}
              component={() => <ClusterDeployment4MultipleClusterSetups />}
            />
            <Route
              path={`${match.url}/NodeIndexManagement1ShardAllocation`}
              component={() => <NodeIndexManagement1ShardAllocation />}
            />
            <Route
              path={`${match.url}/NodeIndexManagement2IndexManagement`}
              component={() => <NodeIndexManagement2IndexManagement />}
            />
            {/* <Route
              path={`${match.url}/NodeIndexManagement3IndexLifecycle`}
              component={() => <NodeIndexManagement3IndexLifecycle />}
            /> */}
            <Route
              path={`${match.url}/AdvTips1DistributedOperations`}
              component={() => <AdvTips1DistributedOperations />}
            />
            <Route
              path={`${match.url}/AdvTips2IndexAliasesPart1`}
              component={() => <AdvTips2IndexAliasesPart1 />}
            />
            <Route
              path={`${match.url}/AdvTips2IndexTemplatesPart2`}
              component={() => <AdvTips2IndexTemplatesPart2 />}
            />
            <Route
              path={`${match.url}/AdvTips2SearchTemplatesPart3`}
              component={() => <AdvTips2SearchTemplatesPart3 />}
            />

            <Route
              path={`${match.url}/AdvTips3ControllingDynamicBehaviors`}
              component={() => <AdvTips3ControllingDynamicBehaviors />}
            />
            <Route
              path={`${match.url}/AdvTips4CommonCausesPoorPerf`}
              component={() => <AdvTips4CommonCausesPoorPerf />}
            />
            <Route
              path={`${match.url}/Cluster-Deployment-Part-4`}
              component={() => <ClusterDeployment4MultipleClusterSetups />}
            />
          </div>
        </div>
      </Router>
    </div>
  );
}
