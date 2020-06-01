import React, { Component } from "react";
import BoolClauseFilterContext from "./images/BoolClauseFilterContext.png";
export default class QueriesPart2 extends Component {
  render() {
    return (
      // TODO fit this into flow
      <div className="exam-topic">
        <h2>Queries Part 2: boolean (dual match), must_not, should</h2>

        <div className="exam-objective">
          <h3>
            ** Write and execute a search query for terms and/or phrases in one
            or more fields of an index
          </h3>
          <div className="pair">
            <div className="question">
              A user searches our blogs for “scripting” and checks the box that
              only displays blogs from the “Engineering” category. How would you
              implement this query?
            </div>
            <div className="answer">???</div>
          </div>
          <h4>DUAL MATCH QUERIES</h4>
          <div className="pair">
            <div className="question">
              Why cant you have a "query: {}" with two "match" clauses, as
              direct children?
            </div>
            <div className="answer">
              Cause it's invalid JSON and creates a "Duplicate key error".
            </div>
            <textarea
              rows={14}
              defaultValue={`
WRONG WRONG

    GET courses/_search
    { 
      "query": {
        "match": {"name": "computer"},
        "match": {"room": "E8"}
      }
    }
              `}
            />
          </div>
          <h4>BOOLEAN QUERIES</h4>
          <div className="pair">
            <div className="question">
              What are the various types of bool queries?
            </div>
            <div className="answer">must, must_not, should</div>
            <img alt="table" src="/src/Elastic/images/BoolQueryClauses.png" />
          </div>
          <div className="pair">
            <div className="question">
              What's the syntax for a two match criteria query?
            </div>
            <div className="answer">
              Instead you have to nest it inside of a "must" key which is an
              array, and make them each an object (by wrapping them in curly
              braces). AND WRAP it inside a "bool". Now it's valid JSON.
            </div>
            <textarea
              rows={14}
              defaultValue={`
    GET courses/_search
    { 
      "query": {
        "bool": {
          "must": [
            {"match": {"name": "computer"}},
            {"match": {"room": "E8"}}
          ]
        }                      
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">How to do a "must_not" query:</div>

            <textarea
              rows={15}
              defaultValue={`
    GET courses/_search
    { 
      "query": {
        "bool": {
          "must_not": [
            {"match": {"professor.name": "bill"}},
            {"match": {"room": "e3"}}
          ]
        }                      
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">Which queries dont impact _score?</div>
            <div className="answer">Must_not and filter</div>
          </div>
          <img src={BoolClauseFilterContext} alt="BoolClauseFilterContext" />
          <div className="pair">
            <div className="question">How to do a "should" query:</div>

            <textarea
              rows={14}
              defaultValue={`
    GET courses/_search
    { 
      "query": {
        "bool": {
          "should": [
            {"match": {"professor.name": "bill"}},
            {"match": {"room": "e3"}}
          ],
          "minimum_should_match": 1
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to combine "must" and a "should" bool query?
            </div>

            <textarea
              rows={17}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            {"match": {"title": "elastic"}}
          ],
          "should": [
            {"match": {"title": "stack"}},
            {"match_phrase": {"author": "shay banon"}},
            {"range":{"publish_date":{"lt":"2017-01-01"}}}
          ]
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to turn a "should" bool query into a "must"?
            </div>

            <textarea
              rows={15}
              defaultValue={`
    GET courses/_search
    { 
      "query": {
        "bool": {
          "should": [
            {"match": {"professor.name": "bill"}}
          ],
          "minimum_should_match": 1
        },
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Where in the nested JSON should the "minimum_should_match" go?
              <br />
              A) inside the query B) inside the bool or C) inside the should?
            </div>
            <div className="answer">B) Inside the bool</div>
          </div>
          <div className="pair">
            <div className="question">
              How to find docs with two terms in a match search but rank the
              extaxt phrase higher?
            </div>

            <textarea
              rows={15}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": {
            "match": {"content": "open data"}
          },
          "should": {
            "match_phrase": {"content": "open data"}
          }
        }
      }
    }
              `}
            />
          </div>
        </div>
      </div>
    );
  }
}
