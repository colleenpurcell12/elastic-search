import React, { Component } from "react";

export default class Queries4ImplementingASearchPage extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.4 Implementing a search page</h2>
        <div className="exam-objective">
          <h3>** Implement pagination of the results of a search query</h3>
          <h3>
            Remember the from is not the page number times the size it's
            size*(page # -1 MINUS ONE!!!!
          </h3>
          <div className="pair">
            <div className="question">How do you implement pagination?</div>
            <div className="answer">
              Use the "from" property of the request body to specify multiples
              of the "size" property to mimic pagination.
              <br />
              default value for "size" is 10
            </div>
            <textarea
              rows={12}
              defaultValue={`
    2nd page!!
    GET blogs/_search
    {
      "from": 10,
      "size": 10,
      "query": {
        "match": {
          "content": "elasticsearch"
        }
      }
    }
                `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How do you get the 3rd page if # per page is 7?
            </div>
            <div className="answer">Answer</div>
            <textarea
              rows={10}
              defaultValue={`
    GET blogs/_search
    {
      "from": 14,
      "size": 7,
      "query": {
        "match": {
          "content": "elasticsearch"
        }
      }
    }
                `}
            />
          </div>

          <div className="pair">
            <div className="question">
              Suppose a user clicks on page 4 of the search results. Write a
              query that returns the 3 hits of page 4.
            </div>
            <div className="answer">it's 3*(4-1)=9!!!</div>
            <textarea
              rows={10}
              defaultValue={`
    GET blogs/_search
    {
      "from": 9,
      "size": 3,
      "query": {
        "match": {
          "content": "elasticsearch"
        }
      }
    }
                `}
            />
          </div>

          <div className="summary">
            <h3> Summary </h3>
            <br />• Use “from” and “size” parameters to implement pagination
          </div>
          <div className="quiz">
            <h3>QUIZ</h3>
            <div className="pair">
              <div className="question">
                1. What are the two parameters that you can use to implement
                paging of search results?
              </div>
              <div className="answer">*from* and size</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
