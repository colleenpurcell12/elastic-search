import React, { Component } from "react";
import ShardFiltering from "./images/ShardFiltering.png";

export default class NodeIndexManagement1ShardAllocation extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 5 Elasticsearch Nodes and Index Management: Lesson 5.1
          Controlling Shard Allocation
        </h2>
        <div className="exam-objective">
          <h3>Objectives covered in this section include:</h3>
          <br />
          <ul
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "10px",
            }}
          >
            <li>
              ** Allocate the shards of an index to specific nodes based on a
              given set of requirements
            </li>
            <li>
              ** Configure the nodes of a cluster to satisfy a given set of
              requirements
            </li>
            <li>
              ** Configure a cluster for use with a hot/warm architecture (NOT
              IN DOCUMENTATION) find it under "shard allocation filtering"
              <div>
                » Docs » Index modules » Index Shard Allocation » Index-level
                shard allocation filtering
              </div>
            </li>
          </ul>
        </div>
        <br />
        <hr />
        <div className="exam-objective">
          <h3
            style={{
              // marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "10px",
            }}
          >
            ** Configure a cluster for use with a hot/warm architecture
            (my_temp)
          </h3>
          <div className="pair">
            <div className="question">
              How do you implement hot/warm architecture?
            </div>
            <div className="answer">
              HIGH LEVEL you set the nodes in the yml to be tagged with an
              attribute like{"  "}
              <code>node.attr.my_temp: hot</code>, then you set your index
              settings to have a preference on that attribute:{" "}
              <code>"index.routing.allocation.require.my_temp": "hot"</code>
            </div>
          </div>
          <div className="pair">
            <div className="question">
              What if you require a index to put its shards on a hot node, but
              none are configured that way?
            </div>
            <div className="answer">
              Bad for cluster health. All of the index's shards will be
              unallocated and the cluster will go into a red status.
            </div>
          </div>
          <div className="pair">
            <div className="question">What's shard filtering?</div>
            <div className="answer">
              It's when you tell an index on which nodes to put its shards.
            </div>
          </div>

          <div className="pair">
            <div className="question">
              What are the stops to implement hot/warm architecture?
            </div>
            <br />
            <div className="answer">
              Step #1 tag your node with attribute like node.attr.my_temp: hot
              in yml config
              <textarea
                rows={3}
                defaultValue={`
    node.attr.my_temp: hot
            `}
              />
              <br />
              Step #2 configure your indices to be allocated to the tagged
              nodes. like logs from last month to hot
              <textarea
                rows={8}
                defaultValue={`
    PUT logs-2019-03
    {
      "settings": {
        "index.routing.allocation.require.my_temp": "hot"
      }
    }
            `}
              />
              <br /> Step #3. Move Older Shards to Warm like logs from Feb
              <textarea
                rows={6}
                defaultValue={`
    PUT logs-2019-02/_settings
    {
      "index.routing.allocation.require.my_temp": "warm"
    }
            `}
              />
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="exam-objective">
          <h3>
            ** Allocate the shards of an index to specific nodes based on a
            given set of requirements{" "}
            <h4
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                marginLeft: "10px",
              }}
            >
              {" "}
              shard filtering on basis of shared resources like hardware or
              racks
            </h4>
          </h3>
          <div className="pair">
            <div className="question">Shard Filtering for Hardware</div>
            <div className="answer">
              Tag nodes using “my_server” as “small”, “medium”, “large”
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to implement Shard Filtering for Hardware
            </div>
            <div className="answer">
              <br /> you could also specify which servers an index should be on
              like medium size --> INCLUDE
            </div>
            <textarea
              rows={11}
              defaultValue={`
    PUT my_index1
    {
      "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 1,
        "index.routing.allocation.include.my_server": "small,medium",     <-- INCLUDE
        "index.routing.allocation.require.my_temp": "hot"                 <-- REQUIRE
      }
    }
            `}
            />
            <br />
          </div>
        </div>
        <br />
        <hr />
        <div className="exam-objective">
          <h3>
            ** Configure the nodes of a cluster to satisfy a given set of
            requirements
            <h4> node role like master, data, ingest, ml and voting_only</h4>
          </h3>
          <h3>Types of Nodes</h3>
          <div className="pair">
            <div className="question">
              How to configure a dedicated ingest node?
            </div>
            <div className="answer">
              Set all node role attributes in the yml file to false except the
              ingest role.
            </div>
            <textarea
              rows={8}
              defaultValue={`
    yml:

    node.master: false 
    node.data: false 
    node.ingest: true
    node.ml: false
            `}
            />
          </div>
          <div className="pair">
            <div className="question">How to configure a voting only node?</div>
            <div className="answer">Will never be master</div>
            <textarea
              rows={10}
              defaultValue={`
    yml:

    node.master: true     <-- Optional: dont set this explicitly cause its misleading, let fall back to default of true
    node.voting_only: true
    node.data: false 
    node.ingest: false
    node.ml: false
            `}
            />
          </div>
          <img className="image" src={ShardFiltering} alt="ShardFiltering" />
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br /> • You can configure the dedicated data nodes in your cluster to
          use a hot/warm architecture
          <br /> • Use hot nodes for the indexing
          <br /> • Use warm nodes for older, read-only indices
          <br /> • Shard filtering refers to the ability to control which nodes
          an index is allocated
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. Suppose you created a new index every day for that day’s log
              files. How could this scenario benefit from a hot/warm
              architecture?
            </div>
            <div className="answer">
              you can initialize index as hot, then move to warm after 3 days
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False. New data coming into the cluster is indexed onto
              the warm nodes.
            </div>
            <div className="answer">could but wouldnt want to</div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False. If you create a new index with a routing scheme
              that is not possible to implement the cluster will go into a red
              status.
            </div>
            <div className="answer">
              TRUE cluster will say "you told me to put the shard on this node
              that doesn't exist". Fix it by correctly tagging your nodes and
              restarting cluster.
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

// </div>
//  </div>
//  </div>
// <div className="Notes">
//   <h3>Notes</h3> <br />
//   Elasticsearch Architecture Recap
//   <br />
//   The largest unit of scale in Elasticsearch is a cluster
//   <br />
//   •A cluster is made up of one or more nodes
//   <br />
//   node and server 1:1 relationship
//   <br />
//   Indices and Shards: hot/cold, racks attributes...
//   <div>How to take control</div>
//   Elasticsearch automatically distributes the shards evenly across the
//   nodes. By default all nodes can take on any role. Voting only nodes
//   have node.master set to true.
//   <br />
//   <br />
//   you want to decide which nodds get put on which rack
//   <br />
//   nodes can have one or more nodes, be specific about the rols for the
//   node in the yml file, dont rely on the defaults
//   <br />
//   dedicated node
//   <div className="pair">
//     <div className="question">Hot/Warm Architecture</div>
//     <div className="answer">
//       store 30 days of data was retention policy, 400-500 g per day
//       <br />
//       737 got grounded, data size increases, truncated to 7 days
//       <br />
//       1-3 days was hot data still being updated, 4-14 warm data for
//       search and aggs, 15-30 cold infrequent use meant it could take
//       longer data nodes can be the hot nodes, read only indices for warm
//       nodes
//       <br />
//       -->more replicas to accomodate more searches, fine to use slower
//       machine cause you make changes to retain throughput
//     </div>
//   </div>
// </div>
// </div>

//  <div>
//    <h4>Executive summary:</h4> hot/warm architecture is about "Index-level SHARD
//    ALLOCATION filtering"
//    <br /> the index setting variable used to implement this is
//    index.routing.allocation. you can use require, include or exclude methods
//    <br />
//    and set the index routing allocation for your index's shards to only go on
//    nodes where node.my_temp is hot for example
//    <br /> useful for scenarios where you want to control which nodes perform
//    indexing vs. query handling
//    <br />
//    data allocation
//    <br /> Hot nodes for indexing/writing from faster machines with more
//    processing power (like RAM/CPU).
//    <br />
//    Warm nodes for reading/querying from machines with more space/memory.
//    <br /> <h4>Shard Filtering:</h4>
//    <br />
//    ‒ use node.attr to tag your nodes
//    <br />‒ use index.routing.allocation (.includes(), .excludes(), .require())
//    <br />
//    <br />
//  </div>;

// <textarea
//               rows={5}
//               defaultValue={`
//   PUT logs-2019-03/_settings{
//     "index.routing.allocation.require.my_temp" : "hot"
//   }
//             `}
//             />
//             How to move an index from hot to warm?
//             <textarea
//               rows={5}
//               defaultValue={`
//   PUT logs-2019-02/_settings
//   {
//     “index.routing.allocation.require.my_temp" : "warm"
//   }
//           `}
//             />

//   Topology and Master-Eligible Nodes
// <br />
// Voting only node, tie breaker
// <br />

// <div className="pair">
//   <div className="question">Shard Filtering</div>
//   <div className="answer">
//     Designate which nodes are hot and medium size for example
//     <br /> create rules, assign to nodes use index templates to
//     automatically create all new indices on hot nodes
//     <br />
//     ^in order to watch it, have 2 kibana windows open to watch it as
//     it's happening: GET _cat/shards
//   </div>
// </div>;
