import React, { Component } from "react";
import QueriesPart1 from "./2QueriesPart1";
import QueriesPart2 from "./2QueriesPart2";
import QueriesPart3 from "./2QueriesPart3";
import QueriesPart4 from "./2QueriesPart4";
import QueriesPart5 from "./2QueriesPart5";

export default class QueriesIndex extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Catch all on query notes: </h2>
        {/* TODO revisit this! */}
        <h2>QUERIES</h2>
        <QueriesPart1 />
        <QueriesPart2 />
        <QueriesPart3 />
        <QueriesPart4 />
        <QueriesPart5 />
      </div>
    );
  }
}
