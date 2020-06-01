import React, { Component } from "react";

export default class NodesAndShards extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 5 Monitoring and Troubleshooting: Lesson 6.3 Diagnosing
          Performance Issues
        </h2>
        // HIDDEN FROM APP
        {/* slides 282-300 */}
        <h3>** NOT ON EXAM</h3>
        <div className="summary">
          <h3> Summary </h3>
          <br />• You can use the tasks API to see cluster-level changes that
          have not been executed yet and the X-Opaque-Id header to track certain
          tasks
          <br />• Slow logs, thread pools, and hot threads can help you diagnose
          performance issues
          <br />• You can profile your search queries and aggregations to see
          where they are spending time
          <br />• Elasticsearch sets several circuit breakers to prevent out of
          memory errors
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. How would you check if index thread pool queue is full?
            </div>
            <div className="answer">
              1. Look at the thread pool queues either with _nodes/ thread_pool
              or _cat/thread_pool
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False: The only way to profile your query is setting
              "profile" to true and inspecting the returned JSON.
            </div>
            <div className="answer">
              2. False. You can also use the Kibana UI
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: Circuit breakers prevent operations from going
              out of memory.
            </div>
            <div className="answer">True</div>
          </div>
        </div>
      </div>
    );
  }
}
