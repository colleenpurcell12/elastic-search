import React, { Component } from "react";

export default class NodesAndShards extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 5 Monitoring and Troubleshooting: Lesson 6.2 Monitoring</h2>
        <h3>** NOT ON EXAM</h3>
        {/* slides 440-451 */}

        <div className="summary">
          <h3> Summary </h3>
          <br />• The Elastic Monitoring component uses Elasticsearch to monitor
          Elasticsearch
          <br />• Best practice is to use a dedicated cluster for Monitoring
          <br />• It is easier to spot issues on your cluster with the dedicated
          Monitoring UI
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False: Elastic Monitoring can monitor multiple
              clusters.
            </div>
            <div className="answer">
              True, but only the commercial version does. The free version can
              only monitor one
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2.What are the benefits of using a dedicated cluster for the
              Monitoring component?
            </div>
            <div className="answer">
              To report on a cluster going down. <br />
              If a cluster fails, you will be able to view its history and
              perhaps diagnose the issue. There are also performance and
              security benefits.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. The default Monitoring collection interval is ____ seconds.
            </div>
            <div className="answer">10</div>
          </div>
        </div>
      </div>
    );
  }
}
