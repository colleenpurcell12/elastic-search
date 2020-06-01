import React, { Component } from "react";

export default class Queries4bSearchHighlighting extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.4 Implementing a search page</h2>
        <h3>
          In order to find documentation on custom highlighting, search for
          "pre_tag". The section on highlight is Request Body Search.
        </h3>
        <div className="exam-objective">
          <h3>** Highlight the search terms in the response of a query</h3>
          <div className="pair">
            <div className="question">
              How do you highlight the search terms matched in the resulting
              documents?{" "}
            </div>
            <div className="answer">
              This will highlight “kibana” if it appears in “title”
            </div>
            <textarea
              rows={15}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match_phrase": {
          "title": "kibana"
        }
      },
      "highlight": {
        "fields": {
          "title": {}
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              When using doing a highlighted query, how to change the tags
              around the matching terms?
            </div>
            <div className="answer">
              With custom highlight tags: pre_tag and post_tag
            </div>
            <textarea
              rows={25}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match_phrase": {
          "title": "kibana"
        }
      },
      "highlight": {
        "fields": {
          "title": {}
        },
        "pre_tags": ["<es-hit>"],
        "post_tags": ["</es-hit>"]
      }
    }

    --> Results example:
    "highlight": {
      "title": [
        "<es-hit>Kibana</es-hit> 4.1.1 Released"
      ]
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Implement highlighting on the content field. It should enclose the
              matched search terms with a {`<mark>`} HTML tag.
            </div>
            <div className="answer">use pre_tags and post_tags</div>
            <textarea
              rows={34}
              defaultValue={`
    GET blogs/_search
    {
      "size": 3,
      "from": 9, 
      "query": {
        "match_phrase": {
          "content": {
            "query" : "elastic stack"
          }
        }
      },
        "highlight" : {
            "pre_tags" : ["<mark>"],
            "post_tags" : ["</mark>"],
            "fields" : {
                "content" : {}
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
          <div className="pair"></div>
          <div className="summary">
            <h3> Summary </h3>
            <br />• A common use case for search results is to highlight the
            matched terms, which can be accomplished by adding a “highlight”
            clause to a search body
          </div>
          <br />
        </div>
      </div>
    );
  }
}
