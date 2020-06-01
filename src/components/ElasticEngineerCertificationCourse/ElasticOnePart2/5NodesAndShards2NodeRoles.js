import React, { Component } from "react";

export default class NodesAndShards extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 5 Nodes and Shards: Lesson 5.2 Node Roles</h2>
        {/* slides 352-370 */}
        <h3>
          ** Configure the nodes of a cluster to satisfy a given set of
          requirements
        </h3>
        <div>
          Topics: types of node roles, what data and ingest nodes do,
          coordinating nodes, intro to nodes in a cluster
        </div>

        <div className="pair">
          <div className="question">
            What do data nodes and ingest nodes do?
          </div>
          <div className="answer">
            Data nodea store the documents and do CRUD operations, queries and
            aggregations while ingest nodes preprocess docs before indexing
          </div>
        </div>

        <div className="pair">
          <div className="question">Describe a coordinating node.</div>
          <div className="answer">
            The node that receives a request, handles it, and forwards it to
            relevant nodes.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Is a 2 node cluster more available than a one node cluster?
          </div>
          <div className="answer">
            No because if master goes down, you still cant elect a new master,
            so entire cluster is unavailable
          </div>
        </div>
        <div className="pair">
          <div className="question">Describe a large cluster</div>
          <div className="answer">
            With many nodes, you can specify dedicated roles for different nodes
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• There are different node roles and nodes can have one or
          multiple roles at the same time <br />• Data nodes hold shards and
          execute data-related operations like CRUD, search, and aggregations{" "}
          <br />• Ingest nodes can pre-process documents before indexing to
          Elasticsearch <br />• Machine Learning nodes can run machine learning
          jobs <br />• Larger, high-volume clusters should have dedicated nodes
          to improve performance and resource usage !
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. How would you configure a node to be a dedicated data node?
            </div>
            <div className="answer">
              node.data: true, node.master: false, node.ml: false, node.ingest:
              false
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False: A 2-node cluster is a good option for a small
              production cluster.
            </div>
            <div className="answer">
              False, 3 node cluster is good cause it has high availability.
              <br />
              False. A 2-node cluster have high risk of being unavailable, so a
              3-5 node cluster would be a better option
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: Larger, high-volume clusters should have
              dedicated nodes?
            </div>
            <div className="answer">yes, optimize resources</div>
          </div>
        </div>
      </div>
    );
  }
}
