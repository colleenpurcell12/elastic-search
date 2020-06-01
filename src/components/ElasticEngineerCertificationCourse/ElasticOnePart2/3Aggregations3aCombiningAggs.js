import React, { Component } from "react";

export default class Aggregations2BucketAggs extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 3 Aggregations: Lesson 3.3 Bucket Aggregations</h2>
        <h3>nested aggregations, sorting a terms agg using order,</h3>
        <div className="exam-objective">
          <h3>
            ** Write and execute aggregations that contain sub-aggregations
          </h3>
          <div className="pair">
            <div className="question">
              How to get metrics per date range bucket?
            </div>
            <div className="answer">
              Nested agg with a date_histogram and an inner metrics aggs
              <br />
              What is the number of bytes served daily and median response time?
            </div>
            <textarea
              rows={21}
              defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "requests_per_day": {
          "date_histogram": {
            "field": "@timestamp",
            "calendar_interval": "day"
          },
          "aggs": {
            "daily_number_of_bytes": {
              "sum": {                            <-- SUM METRIC, INNER AGG
                "field": "response_size"
              }
            }
          }
        }
      }
    }
              `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How do you sort your outer agg buckets by an inner metric?
            </div>
            <div className="answer">
              order by [insert name of inner agg here]
              <br />
              “Find the day with the maximum bytes served.”
            </div>
            <textarea
              rows={21}
              defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "requests_per_day": {
          "date_histogram": {
            "field": "@timestamp",
            "calendar_interval": "day",
            "order": {
              "daily_number_of_bytes": "desc"           <--- NAME OF INNER AGG
            }
          },
          "aggs": {
            "daily_number_of_bytes": {                   <--- INNER AGG DEFINED HERE
              "sum": {
                "field": "response_size"
              }
            },
            ...
              `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How do you include only one specific field (name) in your sampling
              of docs per bucket of your aggregation?
            </div>
            <div className="answer">
              In your top_hits agg, specify {`"_source": "name"`}
            </div>
          </div>

          <div className="pair">
            <div className="question">
              How would you nest the following aggregation? EXAM PREP: What is
              the median runtime for each status_code?
            </div>
            <div className="answer">
              Terms ag on status_code, with an inner percentile agg for percent
              95 NOT THE OTHER WAY AROUND
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How would you nest the following aggregation? EXAM PREP: What are
              the top 3 URLs accessed from each of the top 20 cities?
            </div>
            <div className="answer">
              Terms on cities, with an inner terms agg on URLs BOTH KEYWORD
            </div>
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• An aggregation can be a combination of bucket and metrics
          aggregations <br />
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          Explain which aggregations answer the questions below:
          <div className="pair">
            <div className="question">
              1. On which days did we not meet our SLAs (95% of the requests
              took less than 500ms)?
            </div>
            <div className="answer">
              date_histogram agg on @timestamp with interval of day, with an
              inner percentile agg on which runtime_ms value is 95th percentile
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. How many requests per day by response code?
            </div>
            <div className="answer">
              date_histogram agg on @timestamp with interval of day, with an
              inner terms aggregation on status_code
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
