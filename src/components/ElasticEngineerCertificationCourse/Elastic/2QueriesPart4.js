import React, { Component } from "react";
import DateMathExpressions from "./images/DateMathExpressions.png";

export default class QueriesPart4 extends Component {
  render() {
    return (
      <div>
        <div className="exam-topic">
          <h2>Queries: Range, Filter context, keyword </h2>

          <div className="exam-objective">
            <div className="pair">
              <div className="question">How to do a "range" query:</div>
              <textarea
                rows={12}
                defaultValue={`
    GET courses/_search
    { 
      "query": {
        "range": {
          "students_enrolled": {
            "gte": 10,
            "lt": 20
          }
        }                      
      }
    }
              `}
              />
            </div>

            <div className="pair">
              <div className="question">
                How to do a "range" query on dates:
              </div>
              <textarea
                rows={12}
                defaultValue={`
    GET courses/_search
    { 
      "query": {
        "range": {
          "course_publish_Date": {
            "gt": "2013-08-27",
          }
        }                      
      }
    }
`}
              />
            </div>
            <div className="pair">
              <div className="question">Discuess Filter context</div>
              <div className="answer">
                We often use exact matches in a filter clause 1) queries in a
                filter context can be cached and reused, so they are faster 2)
                plus it keeps the filter part of the logic out of the scoring
              </div>
              <textarea
                rows={17}
                defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            { "match": { "content": "module"} }
          ],
          "filter": {
            "match": {
              "category.keyword": "Brewing in Beats"
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
                How do you run a query with a filter context?
              </div>
              <div className="answer">
                which blogs have "module" in them and were published in Dec 2017{" "}
              </div>
              <textarea
                rows={20}
                defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            { "match": { "content": "module"} }
          ],
          "filter": {
            "range": {
              "publish_date": {
                "gte": "2017-12-01",
                "lt": "2018-01-01"
              }
            }
          }
        }
      }
    }
              `}
              />
            </div>
            <img src={DateMathExpressions} alt="DateMathExpressions" />
            <div className="pair">
              <div className="question">
                What's the difference between category and category.keyword?
              </div>
              <div className="answer">
                Keyword is for exact matching, case sensitive, space sensitive
                etc. If you need searches for exact text, you typically use the
                .keyword field.
              </div>
            </div>
            <div className="pair">
              <div className="question">What should you use keyword for?</div>
              <div className="answer">
                Sorting and aggregations, they work best on non analyzing
                fields.
              </div>
            </div>
          </div>

          <br />
        </div>
      </div>
    );
  }
}
