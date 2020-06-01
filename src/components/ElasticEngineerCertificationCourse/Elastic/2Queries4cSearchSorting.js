import React, { Component } from "react";

export default class Queries4ImplementingASearchPage extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.4 Implementing a search page</h2>
        <h3>
          default sorting by _score, sort by field order asc/desc, sort by
          multiple fileds
        </h3>
        <h3>
          » Docs » REST APIs » Search APIs » Request Body Search (for sorting)
        </h3>
        <div className="exam-objective">
          <h3>** Sort the results of a query by a given set of requirements</h3>
          <div className="pair">
            <div className="question">How are results sorted by default?</div>
            <div className="answer">by _score</div>
          </div>
          <div className="pair">
            <div className="question">How do you sort by publish_date?</div>
            <div className="answer">
              Sort is an array, descending order has more recent at the top.
            </div>
            <textarea
              rows={17}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": "security"
        }
      },
      "sort": [
        {
          "publish_date": {
            "order": "desc"
          }
        }
      ]
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Will document relevancy be scored if hits/results are sorted by a
              field?
            </div>
            <div className="answer">False, _score will be null</div>
          </div>
          <div className="pair">
            <div className="question">Can you add multiple sort criteria?</div>
            <div className="answer">
              Yes. For example, you can search by arthor name and then publish
              date.
            </div>
            <textarea
              rows={22}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "author.keyword": ""
        }
      },
      "sort": [
        {
          "author.keyword": {
            "order": "asc"
          }
        },
        {
          "publish_date": {
            "order": "desc"
          }
        }
      ]
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">When should you sort on .keyword?</div>
            <div className="answer">when sorting on a string/text field</div>
          </div>
          <div className="pair">
            <div className="question">
              Sort results first by author name ascending, and then from newest
              to oldest.
            </div>
            <textarea
              rows={18}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match_phrase": {
          "content": "elastic stack"
        }
      },
      "sort": [
        {"author.keyword": "asc"},
        {
          "publish_date": {
            "order": "desc"
          }
        }
      ]
    }
              `}
            />
          </div>
          <div className="pair"></div>
          <div className="summary">
            <h3> Summary </h3>
            <br />• Use the sort clause for sorting by a field, _score or _doc
          </div>
          <div className="quiz">
            <h3>QUIZ</h3>
            <div className="pair">
              <div className="question">
                2. True or False: Search results are always sorted by score.
              </div>
              <div className="answer">
                By default they are, but you can sort by another field.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
