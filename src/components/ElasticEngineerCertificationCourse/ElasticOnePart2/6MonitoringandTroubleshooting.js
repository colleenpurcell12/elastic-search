import React, { Component } from "react";

export default class MonitoringandTroubleshooting extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 5 Monitoring and Troubleshooting: Lesson 6.1 HTTP Response and
          Shard Allocation Issues
        </h2>
        <div>
          Topics: Diagnose cluster health, how to get index health, shard health
        </div>
        <div className="exam-sub-topic">
          <h3>** Diagnose shard issues and repair a cluster’s health</h3>
          {/* slides 423-435 */}
          <div className="pair">
            <div className="question">
              After you get a response from a query and under _shards, it says
              total: 4, success: 2, and failed 0--what does that indicate?
            </div>
            <div className="answer">
              Two shards weren't available when request was made.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Which endpoint will tell you about state of your cluster?
            </div>
            <div className="answer">GET _cluster/health</div>
          </div>
          <div className="pair">
            <div className="question">
              How to detemine the health of a particular index1?
            </div>
            <div className="answer">
              Use the command<code>GET _cluster/health/my_index</code>
            </div>
            <textarea
              rows={22}
              defaultValue={`
    GET _cluster/health/my_index

    {
    "cluster_name": "my_cluster",
    "status": "red",
    "timed_out": false,
    "number_of_nodes": 2,
    "number_of_data_nodes": 2,
    "active_primary_shards": 2,
    "active_shards": 3,
    "relocating_shards": 0,
    "initializing_shards": 0,
    "unassigned_shards": 5,
    "delayed_unassigned_shards": 0,
    "number_of_pending_tasks": 0,
    "number_of_in_flight_fetch": 0,
    "task_max_waiting_in_queue_millis": 0,
    "active_shards_percent_as_number": 47.014
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How can you drill down on shard level cluster health?
            </div>
            <div className="answer">GET _cluster/health?level=shards</div>
          </div>
          <div className="pair">
            <div className="question">
              How can you locate an unassigned shard?
            </div>
            <div className="answer">GET /_cluster/allocation/explain</div>
          </div>
          <div className="pair">
            <div className="question">
              What are some good ways to query status/health?
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET _cluster/health
    GET /_cluster/allocation/explain
    GET _cat/indices?v

    GET _cat/nodes?v

    GET _cluster/health?level=shards
    GET _cluster/health?level=indices

    *you can look at the shard level FOR A PARTICULAR index
    GET _cluster/health/nested_blogs?level=shards
    GET _cat/indices/nested_blogs?v
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to determine the allocation details of a index's particular
              shard?
            </div>
            <div className="answer">Use allocation explain</div>
            <textarea
              rows={8}
              defaultValue={`
    GET _cluster/allocation/explain
    {
      "index" : "my_index",
      "shard" : 0,
      "primary" : true
    }
              `}
            />
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />
          • Every write or read operation returns shard information, such as,
          the number of shards it should be executed on <br />• A cluster's
          health reports various statistics and the status of the cluster <br />
          • The Cluster Allocation API helps locating UNASSIGNED shards
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1.Why should you bother checking the “_shards” section of a
              response?
            </div>
            <div className="answer">
              To make sure that the query was sucessful cause the sucess
              property is not always enough. If total > sucessful, it's a good
              indicator that you should investigate your cluster's health.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False: Having an UNASSIGNED primary shard means your
              cluster is not in a good state.
            </div>
            <div className="answer">Correct, it's at least yellow state.</div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: The “skipped” section of a response indicates
              the number of shards that failed to execute a search request.
            </div>
            <div className="answer">
              False, Elastic knows to not look their cause there arent any
              relevant documents.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
