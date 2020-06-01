import React, { Component } from "react";
import OtherExamRequirements from "./Exam/OtherExamRequirements";
import Terms from "./Terms";
import LinuxAcademyNotes from "./LinuxAcademy/LinuxAcademyNotes";

// TODO only show one of the child components at a time, add buttons
export default class TitlePage extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: "#456bb0" }}>
          Elastic Search Certified Engineer
          <br />
          Study Notes App
        </h1>
        <br />
        <br />
        <div>
          Link to{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.elastic.co/training/elastic-certified-engineer-exam"
          >
            Elastic Exam Objectives
          </a>
          <OtherExamRequirements />
          <Terms />
          <LinuxAcademyNotes />
        </div>
      </div>
    );
  }
}
