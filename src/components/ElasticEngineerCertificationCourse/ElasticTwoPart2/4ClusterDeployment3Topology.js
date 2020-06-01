import React, { Component } from "react";

export default class Aggregations extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 4 Cluster Deployment Part 3: Topology Awareness</h2>
        <div className="exam-objective">
          <h3>
            ** Configure shard allocation awareness and forced awareness for an
            index
          </h3>
          <div className="pair">
            <div className="question">
              <h3>Shard Allocation Awareness</h3>
              <div>How do you configure it?</div>
            </div>
            <div className="answer">Step #1 Tag your nodes</div>
            <textarea
              rows={4}
              defaultValue={`
           node.attr.my_rack_id: rack1
           node.attr.my_rack_id: rack2
            `}
            />
            <br />
            <div className="answer">
              Step #2 Update Cluster configuration
              <br /> set allocation.awareness
            </div>
            <textarea
              rows={8}
              defaultValue={`
           PUT _cluster/settings
            {
              "persistent": {
                "cluster.routing.allocation.awareness.attributes": "my_rack_id"
              }
            }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              <h3>Balanced Shard Distribution:</h3>
              What happends when a rack fails, after shard allocation awareness
              has been implemented?
            </div>
            <div className="answer">
              If a rack goes down, the replicas of shards on that rack get
              promoted to primaries and then replicas are created off those new
              primaries to ensure full availability.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              <h3>
                What's the concern when newly promoted primaries create new
                replicas, and how do you solve it?
              </h3>
              <div className="answer">
                Now you have more copies on fewer nodes, which could overwhelm
                the infrastructure.
                <br />
                <h4>FORCED AWARENESS --> awareness.force</h4>
                ‒ upon a zone failure, it does not allocate replicas in the
                other zone
                <textarea
                  rows={25}
                  defaultValue={`
       
            PUT _cluster/settings
            {
              "persistent": {
                "cluster": {
                  "routing": {
                    "allocation.awareness.attributes": "my_rack_id",
                    "allocation.awareness.force.my_rack_id.values": "rack1,rack2"
                  }
                }
              }
            }

            ALSO WRITTEN AS 

            PUT _cluster/settings
            {
              "persistent": {
                "cluster.routing.allocation.awareness.attributes": "my_rack_id",
                "cluster.routing.allocation.awareness.force.my_rack_id.values": "rack1,rack2"
              }
            }
            `}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="pair">
            <div className="question">
              What setting do you use when you want primaries to be spread
              across shared infrastructure?
            </div>
            <div className="answer">
              <code>
                cluster.routing.allocation.awareness.attribute = "rack_id"
              </code>
            </div>
          </div>

          <div className="pair">
            <div className="question">
              What setting do you use when you want to make sure, in an
              emergency, the default of creating replicas wont take place?
            </div>
            <div className="answer">
              forced awareness -->{" "}
              <code>cluster.routing.allocation.awareness.force </code>
            </div>
          </div>

          <div className="pair">
            <div className="question">
              What is the difference between Shard Allocation awareness and
              forced awareness
            </div>
            <div className="answer">
              shard allocation awareness is when the cluster knows which nodes
              share infrastructure so they dont put all primaries and back up
              replicas on the same rack.
              <br />
              forced awareness is when the cluster is smart enough to not double
              up on replicas on a single piece of infrastructure after a failure
            </div>
          </div>

          <div className="question">
            When do you use persistent cluster settings?
          </div>
          <div className="answer">
            with anything that has to do with the cluster going down, like full
            restart or forced awareness for rack failures
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />
          •You can make Elasticsearch aware of the physical configuration of
          your hardware using allocation awareness
          <br />
          ‒this will prevent data loss or unavailability in case of failures
          <br /> •You can use forced awareness to avoid allocating multiple
          shard copies to a group of nodes
          <br /> ‒this will prevent overloading nodes in case of failures
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. Why would you configure shard allocation awareness?
            </div>
            <div className="answer">
              Awareness ensures that shards are distributed across “zones” that
              you define. Rules across all node attributes.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. What is the benefit of forced awareness over simply configuring
              shard allocation awareness?
            </div>
            <div className="answer">
              ensured that replicas wont be recreated on same rack in failure
              scenario.
              <br />
              Forced awareness never allows copies of the same shard to be in
              the same zone - shard allocation awareness does
              <br /> EXAM WORDING HERE
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False. To set up allocation awareness, you tag the
              nodes in elasticsearch.yml and set the cluster routing in the
              Cluster Update Setting API.
            </div>
            <div className="answer">True</div>
          </div>
        </div>

        {/* <div className="Notes">
          <h3>Notes</h3> <br />
          <p>
            most challenging part is to distinguish between
            <br />
            1) Forced awareness: EMERGENCIES which never allows copies of the
            same shard to be in the same zone
            <br />
            2) shard allocation awareness tracks which nodes are on the same
            racks, in a failure they dont limit the number of copies on the same
            rack
          </p>
          <div>slide 268</div>
          How to set up shard allocation awareness--which nodes are on the same
          racks
          <div>1. tag your nodes with</div>
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            yml file config:

              node.attr.my_rack_id: rack1

              or

              node.attr.my_rack: rack1
              node.attr.my_temp: hot
            `}
          />
          <div>
            2. update the cluster configuration--routing.allocation.awareness
          </div>{" "}
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            PUT _cluster/settings
            {
              "persistent": {
                "cluster.routing.allocation.awareness.attributes": "my_rack_id"
              }
            }
            `}
          />
          <p>
            how to avoid overloading when one rack goes down and all shards go
            to the other rack's node?
          </p>
          <p>
            only enable primary shards to be redistributed. aka multiple copies
            of a shard will not be allocated on rack1 or rack2.
          </p>
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            PUT _cluster/settings
            {
              "persistent": {
                "cluster": {
                  "routing": {
                    "allocation.awareness.attributes": "my_rack_id",
                    "allocation.awareness.force.my_rack_id.values": "rack1,rack2"
                  }
                }
              }
            }
            `}
          />
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            yml file config:

              node.attr.my_rack: rack1
              node.attr.my_temp: hot

            PUT _cluster/settings
            {
              "persistent": {
                "cluster.routing.allocation.awareness.attributes": "my_rack_id"
              }
            }
            `}
          />
        </div>

        <div className="Notes">
          <h3>Notes</h3> <br />
          Cluster wide settings to tell shards what to do
          <br />
          Unbalanced Shard Distribution: when PO and RO are on the same rack
          <br />
          Cant have the replica and the primary on the same node/server.
          Otherwise risk losing data.
          <br />
          Rarely have all good machines in you cluster.
          <br />
          Rack Failure: There can be multiple nodes on the same rack.
          <br /> The nodes dont know they are on the same rack.
          <br />
          Shard Allocation Awareness: tag the shars with attribution with hot
          nodes, or which rack it's on, space, hardware, etc
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            yml file config:

              node.attr.my_rack: rack1
              node.attr.my_temp: hot

            look at your attributes:
              GET _cat/nodeattrs?v
            `}
          />
          <br />
          EXAM: telling it dont put a primary and a replica on the same
          attribute value. Dont double up data on every attribute that are
          unique
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            PUT _cluster/settings
            { 
              "persistent": {
                "cluster.routing.allocation.awareness.attributes": "my_rack"
              }
            }
            `}
          />
          Balanced Shard Distribution: when PO and RO are NOT on the same rack,
          ensure full availabilty
          <br />
          When a replica has been promoted to primary, then it recreates a
          replica.
          <br />
          Downside: higher load and disc utilization, duplication across 2
          nodes, when you dont need copies overwhelm the node
          <br />
          //  REVIEW THIS 275 and 276
          Solution: forced awareness to avoid overloading nodes, dont put same
          copy of my data on the same rack. If rack goes down, dont try and
          create copies on the same rack.
          <br />
        </div>
        <div className="pair">
          <div className="question">How does transient work?></div>
          <div className="answer"> FILL IN Answer</div>
        </div>

        <br />
        <div className="pair">
          <div className="question">How does persistent work?</div>
          <div className="answer"> FILL IN Answer</div>
        </div>

         */}
      </div>
    );
  }
}
