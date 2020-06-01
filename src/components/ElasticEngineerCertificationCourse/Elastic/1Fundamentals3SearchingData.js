import React, { Component } from "react";

export default class Fundamentals3SearchingData extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 1 Fundamentals: Lesson 1.4 Searching Data </h2>
        <h3>NOT DIRECTLY ON EXAM</h3>
        {/* slide 65-82 is the summary */}
        <br />
        <div>
          SUMMARY: just introductory, but remember _count API and default hits
          10
        </div>
        <div className="pair">
          <div className="question">What are some examples of searches?</div>
          <div className="answer">GET _search requests on various indices</div>
          <textarea
            rows={26}
            defaultValue={`
    GET logs_server1,logs_server2/_search

    GET logs_server*/_search

    GET blogs/_search
    {
      "query": {
        "match": {
          "author": "monica"
        }
      }
    }

    GET blogs/_search
    {
      "query": {
        "range": {
          "publish_date": {
            "gte": "2018-01-01"
          }
        }
      }
    }
    `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How to get the # of documents in an index?
          </div>
          <div className="answer">_count API</div>
          <textarea
            rows={3}
            defaultValue={`
    GET blogs/_count
    `}
          />
        </div>

        <div className="pair">
          <div className="question">What is the default search? </div>
          <div className="answer">a match_all</div>
          <textarea
            rows={13}
            defaultValue={`
    GET blogs/_search

    same as

    GET blogs/_search
    {
      "query": {
        "match_all": {}
      }
    }
    `}
          />
        </div>
        {/* <div>
          Note: the lab has a tutorial on making a data visualization in Kibana,
          I am assuming it's not on the exam.
          <ul>
            Potential Kibana questions Im assuming are not on exam
            <li>user roles</li>
            <li>visualizations</li>
            <li>rollover pattern (or is it roll up?</li>
          </ul>
        </div> */}
        <div className="summary">
          <h3> Summary </h3>
          <br /> • In general, we can categorize most data in our users’ use
          cases as one of the following: <br />‒ static data
          <br />
          ‒ time series data
          <br /> • In Elasticsearch, there are two main ways to search: <br />
          ‒ queries <br />‒ aggregations
          <br /> • By default, a search request only returns the first 10 hits
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. In general, most data in our users’ use cases can be
              categorized into what two types of data?
            </div>
            <div className="answer">
              static (blogs) and time series (logstash logs)
            </div>
          </div>

          <div className="pair">
            <div className="question">
              2. What are the two main ways to search data in Elasticsearch?
            </div>
            <div className="answer">_search: query and aggregations</div>
          </div>
          <div className="pair">
            <div className="question">
              3. What is the default number of hits that a query returns?
            </div>
            <div className="answer">10</div>
          </div>
        </div>
      </div>
    );
  }
}
