import React, { Component } from "react";

export default class Template extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>TEMPLATE</h2>

        <div className="pair">
          <div className="question">Question</div>
          <div className="answer">Answer</div>
        </div>
        <div className="pair">
          <div className="question">Question</div>
          <div className="answer">Answer</div>
        </div>
        <div className="pair">
          <div className="question">Question</div>
          <div className="answer">Answer</div>
          <textarea
            rows={7}
            defaultValue={`
    XYZ
              `}
          />
        </div>
      </div>
    );
  }
}
