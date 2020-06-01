import React, { Component } from "react";

export default class QueriesPart3 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Queries Part 3: multi_match, field boosting, match_phrase, slop, range
          query
        </h2>

        <div className="exam-objective">
          <h3>
            ** Write and execute a search query for terms and/or phrases in one
            or more fields of an index
          </h3>

          <div className="pair">
            <div className="question">How to do a "multi_match" query:</div>
            <div className="answer">
              if you'e like to find documents that have accounting in either the
              name or the professor department, use the multi_match query. query
              --> multi_match (fields and query string)
            </div>

            <textarea
              rows={12}
              defaultValue={`
    GET courses/_search
    { 
      "query": {
        "multi_match": {
          "fields": ["name", "professor.department"],
          "query: "accounting
        }                      
      }
    }
              `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How can you do a "multi_match" phrase query?
            </div>
            <div className="answer">
              add "type": "phrase" as another key in the multi_match object
            </div>

            <textarea
              rows={16}
              defaultValue={`
    GET courses/_search
    { 
      "query": {
        "multi_match": {
          "query": "elasticsearch training",
          "fields": [
            "title^2",
            "content",
            "author"
          ],
          "type": "phrase"
        }                      
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Notice the pattern: give two examples of when you wanna add a
              extra field to a basic match query and have to add another nested
              query key
            </div>
            <div className="answer">
              1) {`query: { match: { content: "elastic"`}
              becomes{" "}
              {`query: {match: { content: { query: "elastic", operator: "and" `}
            </div>
            <div className="answer">
              2){" "}
              {`query: { multi_match: { content: { query: "elastic", fields: ["title"], type: "phrase" `}
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to do a Field Boosting on a "multi_match" query:
            </div>
            <div className="answer">BEFORE</div>
            <textarea
              rows={15}
              defaultValue={`
    GET blogs/_search
      {
        "query": {
        "multi_match": {
          "query": "shay banon",
          "fields": [
            "title",
            "content",
            "author"
          ]
        }
      }
    }
              `}
            />

            <div className="answer">
              AFTER BOOSTING the title clause that's most important so those
              results with Shay Banon in the name are scored higher, ranked
              better and disply higher in the results.(TODO understand
              best_fields better)
            </div>
            <textarea
              rows={14}
              defaultValue={`
    GET blogs/_search
      {
        "query": {
        "multi_match": {
          "query": "shay banon",
          "fields": [
            "title^2",
            "content",
            "author"
          ]
        }
      }
    }
              `}
            />
          </div>

          <div className="pair">
            <div className="question">How to do a "match_phrase" query:</div>
            <div className="answer">
              For searching text when you want to find terms that are near each
              other
              <textarea
                rows={10}
                defaultValue={`
    GET courses/_search
    { 
      "query": {
        "match_phrase": {
          "course_description": "final year course"
        }                      
      }
    }
              `}
              />
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Difference between match and match_phrase?
            </div>
            <div className="answer">
              Match query looks at the content terms separately, match phrase
              looks at the terms as a phrase (terms in sequence) and finds them
              in the documents directly after one each other (or nearby with
              slop)
            </div>
          </div>

          <div className="pair">
            <div className="question">
              How to use Slop in a "match_phrase" query:
            </div>
            <div className="answer">
              When you want to find terms that are near each other but not right
              next to each other. Slop parameter tells how far apart terms are
              allowed to be while still considering the document a match. The
              following will match "open source data".
              <textarea
                rows={15}
                defaultValue={`
    GET blogs/_search
      {
        "query": {
          "match_phrase": {
            "content": {
              "query":"open data",
              "slop": 1
          }
        }
      }
    }
                  `}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
