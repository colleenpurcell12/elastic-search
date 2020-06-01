import React, { Component } from "react";

export default class Fundamentals1Intro extends Component {
  // TODO maybe add to the app and put * in front of nav link label to indicate not on exam
  render() {
    return (
      <div className="exam-topic">
        <h2> Module 1 Fundamentals: Lesson 1.1 Elastic Stack Overview</h2>
        <div>not on exam</div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1.What are the 4 main components of the Elastic Stack?
            </div>
            <div className="answer">Elastic, Kibana, Logstash and Beats</div>
          </div>

          <div className="pair">
            <div className="question">
              2. True or False: Elasticsearch uses Apache Lucene behind the
              scenes to index and search data.
            </div>
            <div className="answer">TRUE</div>
          </div>
          <div className="pair">
            <div className="question">
              3.What were two of Shay’s main goals when designing Elasticsearch?
            </div>
            <div className="answer">fast---3. Scalable and easy to use</div>
          </div>
        </div>
      </div>
    );
  }
}
