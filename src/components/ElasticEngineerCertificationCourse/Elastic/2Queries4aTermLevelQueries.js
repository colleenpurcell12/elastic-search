import React, { Component } from "react";
import DateMath from "./images/DateMath.png";

export default class Queries4ImplementingASearchPage extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.4a Term Level Queries</h2>
        <h4>
          The theme is *unanalyzed fields (.keyword and numbers)
          <br />
          <br /> When to use .keyword in queries (filter clauses) and
          Date/Numeric Range Filters: filters, range query, date range, date
          math
        </h4>

        <div className="exam-objective">
          <h3>
            ** Write and execute a search query for terms and/or phrases in one
            or more fields of an index
          </h3>
          <h3>» Docs » Query DSL » Term-level queries » Range query</h3>
          <div className="pair">
            <div className="question">
              What are the types of queries on non-analyzed fields?
            </div>
            <div className="answer">
              range query, date query, term query, match_phrase, multi-field
              type phrase, and queries with filter clauses
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Explain the diff btw "Term level" v "Full text" queries
            </div>
            <div className="answer">
              Unlike full-text queries, term-level queries do not analyze search
              terms. Instead, term-level queries match the exact terms stored in
              a field.
            </div>
          </div>
        </div>
        <div className="pair">
          <div className="question">
            When to search using the fields keyword multi-field?
          </div>
          <div className="answer">In filter clauses and terms queries</div>
        </div>
        <div className="pair">
          <div className="question">Range Query for numbers and dates</div>
          <div className="answer">Ex query for ages from 10 to 20</div>
          <textarea
            rows={14}
            defaultValue={`
    GET /_search
    {
      "query": {
        "range" : {
          "age" : {
            "gte" : 10,
            "lte" : 20,
          }
        }
      }
    }
              `}
          />
        </div>

        <div className="pair">
          <div className="question">
            Range Query for dates: how do you search from yesterday until to
            now?
          </div>
          <div className="answer">Ex query for ages from 10 to 20</div>
          <img style={{ maxWidth: "400px" }} src={DateMath} alt="DateMath" />

          <textarea
            rows={14}
            defaultValue={`
    GET /_search
    {
      "query": {
        "range" : {
          "timestamp" : {
            "gte" : "now-1d/d",
            "lt" :  "now/d"
          }
        }
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How do you do a range filter for blogs from 2017?
          </div>
          <div className="answer">
            filter: range: "field__of_type_date": gt/gte and lt/lte
          </div>
          <textarea
            rows={20}
            defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            { "match": {"content": "module"} }
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
        <div className="pair">
          <div className="question">Examples of Date Math</div>
          <textarea
            rows={10}
            defaultValue={`
    y is YEARS, M is MONTHS, w is WEEKS, d is DAYS, h or H is HOURS, m is MINUTES

    "gte": "now-3M"         ---> more recent that three months ago
    "gte" : "now-1d/d",     ---> more recent than yesterday 
    "lt" :  "now/d"         ---> before today (at midnight, T00:00:00)
            now-1h          ---> an hour ago
            now/d+1d        ---> yesterday (now rounded to the day (midnight), minus a day)
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            If you are filtering on an exact term what field do you wanna search
            on?
          </div>
          <div className="answer">
            the field.keyword, good for category matches
          </div>
          <textarea
            rows={15}
            defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            { "match": { "content": "module" } }
          ],
          "filter": [
            { "match": { "category.keyword": "Brewing in Beats" } }
          ]
        }
      }
    }
              `}
          />
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• If you need searches for exact text, you typically use the
          .keyword field
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              3. How do the following two queries behave differently?
            </div>
            <textarea
              rows={20}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "category": "User Stories"
        }
      }
    }
    
    GET blogs/_searchx
    {
      "query": {
        "match": {
          "category.keyword": "User Stories"
        }
      }
    }
    `}
            />
            <br />
            <div className="answer">
              The first matches on either "user" or "stories" (like "User
              Roles") and the other only matches on documents where category is
              exactly "User Stories"
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
