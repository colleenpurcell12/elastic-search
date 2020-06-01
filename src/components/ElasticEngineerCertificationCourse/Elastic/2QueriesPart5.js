import React, { Component } from "react";

export default class QueriesPart5 extends Component {
  render() {
    return (
      <div>
        <div className="exam-topic">
          <h2>Queries: Highlighting, Pagination, Sorting, Fuzzy matching</h2>

          <div className="exam-objective">
            <h3>** Highlight the search terms in the response of a query</h3>

            <div className="pair">
              <div className="question">How do you implement highlighting?</div>
              <div className="answer">
                like this, Kibana uses {`<em></em>`} tags
              </div>
              <textarea
                rows={17}
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
                How do you implement CUSTOM highlighting?
              </div>
              <div className="answer">with pre and post tags</div>
              <textarea
                rows={17}
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
          "pre_tags": ["<es-hit>"],
          "post_tags": ["</es-hit>"]
        }
      }
    }
              `}
              />
            </div>
          </div>
          <div className="exam-objective">
            <h3>
              ** Sort the results of a query by a given set of requirements
            </h3>
            <div className="pair">
              <div className="question">
                How do you implement sort: sorted first by author name
                ascending, and then from newest to oldest?
              </div>
              <textarea
                rows={28}
                defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match_phrase": {
          "content": {
            "query" : "elastic stack"
          }
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
              <div className="question">Should you sort on .keyword?</div>
              <div className="answer">think so</div>
            </div>
            <div className="pair">
              <div className="question">
                Can you sort and score at the same time?
              </div>
              <div className="answer">False</div>
            </div>
          </div>

          <div className="exam-objective">
            <h3>** Implement pagination of the results of a search query</h3>
            <div className="pair">
              <div className="question">How do you implement pagination?</div>
              <div className="answer">
                from (default 0) and size (default 10)
              </div>
            </div>
          </div>

          <div className="exam-objective">
            <h3>** Apply fuzzy matching to a query</h3>

            <div className="pair">
              <div className="question">
                What is the use of fuzziness (Fuzzy matching) and what's the
                downside?
              </div>
              <div className="answer">
                It accounts for misspelled words (missing or swapped letters).
                Fuzziness of one is the number of letters swappings needed to
                match a word match (per match term).
                <textarea
                  rows={14}
                  defaultValue={`
    GET blogs/_search
      {
      "query": {
        "match": {
          "content": {
            "query": "shark",
            "fuzziness": 1
          }
        }
      }
    }
                  `}
                />
                <br />
                Possible Values: 0, 1, 2, auto
                <br />
                Downsides: It’s very expensive (high CPU overhead, non
                performant) and low precision (a lot of false positives)
                <br />
                Alternatives: auto-complete suggestions or advanced text
                analysis that accounts for spelling variants.
              </div>
            </div>
            <div className="pair">
              <div className="question">
                The compare and contrast slop and fuzziness?
              </div>
              <div className="answer">
                Both are used to expand precision in order to get more results.
                Slop means that terms in a match_phrase dont have to be right
                after eachother. Fuzziness means that a term match accounts for
                being 1 or more letters off like a misspelling.
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
