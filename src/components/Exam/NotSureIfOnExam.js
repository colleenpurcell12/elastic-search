import React, { Component } from "react";
// TODO add/expose this in app
export default class NotSureIfOnExam extends Component {
  render() {
    return (
      <div>
        <h2>Things I'm sure are always on the exam </h2>
        <ul>
          <li>Setting up a cluster</li>
          <li>Securing a cluster (xpack.security.enabled: true)</li>
        </ul>
        {/* <h2>Things Im not sure are on the exam or not</h2>
        <ul>
          <li>_mget and _bulk</li>
        </ul> */}
        <h2>Things I'm sure are NOT on the exam or not</h2>
        <ul>
          <li>
            ILM Index Life Cycle Management (As of May 2020, but they DO plan to
            eventually have it on the exam
          </li>
          <li>Common Schema</li>
          <li>Cross Cluster Replication (CCR)</li>
        </ul>
      </div>
    );
  }
}
