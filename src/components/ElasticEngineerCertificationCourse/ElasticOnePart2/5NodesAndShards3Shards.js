import React, { Component } from "react";

export default class NodesAndShards extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 5 Nodes and Shards: Lesson 5.3 Understanding Shards</h2>
        {/* slides 371-397 */}
        <h3>Introduction behind:</h3>
        <h3>** Diagnose shard issues and repair a cluster’s health</h3>
        <div>
          Topics: what are shards, primary v replica, cluster health states
          (yellow when replica unallocated), primary and replica never on same
          node, master node allocates shards
        </div>
        <div>
          <h3>NOTES</h3>
          Shards have a portion of the documents on an index <br />
          Primary v Replica shard, always on diff nodes <br />
          if index set up with one primary and one replica, but only one node,
          then no replica shard until a 2nd node is added --> shard reallocation
          determined by master node.
          <br />
          <br />
        </div>

        <div className="pair">
          <div className="question">
            How do you configure # of primary and replica shards?
          </div>
          <div className="answer">with number_of_shards</div>
          <textarea
            rows={9}
            defaultValue={`
    PUT my_new_index
    {
      "settings": {
        "number_of_shards": 3,
        "number_of_replicas": 2
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">Purpose of replicas?</div>
          <div className="answer">
            High availability, can replace primary shards. Help with queries,
            shard burden.
          </div>
        </div>
        <div className="pair">
          <div className="question">What's Shard allocation?</div>
          <div className="answer">
            Shard allocation is the process of assigning a shard to a node in
            the cluster
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Who is responsible for allocating shards?
          </div>
          <div className="answer">MASTER NODE</div>
        </div>
        <div className="exam-sub-topic">
          <h3>
            ** Diagnose shard issues and repair a cluster’s health (GET
            _cat/shards/logs_server)
          </h3>
          <br />
          <div className="pair">
            <div className="question">
              If a shard is unallocated making its index yellow or red, how do
              you find out why
            </div>
            <div className="answer">
              the cluster allocation explain API will tell you exactly why a
              shard isn unassigned! <code>GET _cluster/allocation/explain</code>
            </div>
          </div>
          <div className="pair">
            <div className="question">How to test cluster health</div>
            <div className="answer">
              Use <code>GET _cluster/health</code>
            </div>
            <textarea
              rows={23}
              defaultValue={`
    GET _cluster/health

    {
      "cluster_name": "elasticsearch",
      "status": "yellow",
      "timed_out": false,
      "number_of_nodes": 1,
      "number_of_data_nodes": 1,
      "active_primary_shards": 15,
      "active_shards": 15,
      "relocating_shards": 0,
      "initializing_shards": 0,
      "unassigned_shards": 15,
      "delayed_unassigned_shards": 0,
      "number_of_pending_tasks": 0,
      "number_of_in_flight_fetch": 0,
      "task_max_waiting_in_queue_millis": 0,
      "active_shards_percent_as_number": 50
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What determines levels of Shard Health
            </div>
            <div className="answer">
              <ul>
                <li>
                  red: at least one primary shard is not allocated in the
                  cluster
                </li>
                <li>
                  yellow: all primaries are allocated but at least one replica
                  is not
                </li>
                <li> green: all shards are allocated</li>
              </ul>
            </div>
          </div>
          <div className="pair">
            <div className="question">How is INDEX health determined?</div>
            <div className="answer">It's the health of the worst SHARD</div>
          </div>
          <div className="pair">
            <div className="question">How is CLUSTER health determined?</div>
            <div className="answer">It's the health of the worst INDEX.</div>
          </div>
          <div className="pair">
            <div className="question">What are the states of a shard</div>
            <div className="answer">
              <ul>
                <li>
                  Unassigned: is when the # exists in cluster state but not
                  found
                </li>
                <li>Initializing: being created</li>
                <li>
                  Started (once primaries are up and allocated, then replicas
                  can be allocated){" "}
                </li>
                <li>
                  Reallocating: moving from one node to another, CAN STILL BE
                  QUERIED etc, when for example a new node is added to the
                  cluster
                </li>
                {/* TODO ARE SHARDS EVER UNALLOCATED DURING REALLOCATION, thereby impacting the cluster state? */}
              </ul>
            </div>
          </div>
          <div className="pair">
            <div className="question">
              When a node fails, whats the health of the cluster?
            </div>
            <div className="answer">
              If that node had primary shards, it's in the red state. If that
              node only had replica shards, it's in the yellow state.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              What happens when a node with a primary shard goes down?
            </div>
            <div className="answer">
              A replica gets promoted, and then another replica gets
              initialized.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              What if cluster state specifies 3 replicas and there are 3 nodes?
            </div>
            <div className="answer">
              One of the replicas is unassigned/unallocated (cause replicas dont
              go on the same nodes as their primary) and the cluster state is
              yellow.
            </div>
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• Elasticsearch subdivides the data of your index into multiple
          pieces called shards <br />• Each shard copy has one (and only one)
          primary and zero or more replicas <br />• Shard allocation is the
          process of assigning a shard to a node in the cluster <br />• A
          cluster’s health status is either green, yellow, or red, depending on
          the current shard allocation
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. If number_of_shards for an index is 4, and number_of_replicas
              is 2, how many total shards will exist for this index?
            </div>
            <div className="answer">4+4*2=12 total shards</div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False: The nodes where shards are allocated are decided
              by the coordinating node.
            </div>
            <div className="answer">no by the master node</div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: A cluster with a yellow status is missing
              indexed documents.
            </div>
            <div className="answer">
              False. Yellow status means replica shards are missing. Red means a
              primary shard is unallocated. Even red status doesnt necessarily
              mean documents are lost.
            </div>
            {/* is missing the same as unallocated? only diff between unassigned and unallocated, is that unassigned is the initial state of a shard and unallocated could be a shard that was assigned and then went down. */}
          </div>
        </div>
      </div>
    );
  }
}
