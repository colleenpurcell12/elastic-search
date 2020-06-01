import React, { Component } from "react";

export default class Queries2FullTextQueries extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.2 Full Text Queries</h2>
        <h3>
          ** Write and execute a search query for terms and/or phrases in one or
          more fields of an index
        </h3>
        <h3>» Docs » Query DSL » Full text queries » Multi-match query</h3>
        <br />
        <h3>** Apply fuzzy matching to a query</h3>
        <h3>» Docs » Query DSL » Full text queries » Match query </h3>
        <h4>
          be careful to distinguish btw "fuzziness match query" v fuzzy matching
          (ignore the later)
        </h4>
        <h3>
          Topics: match_phrase, slop, multi_match, best_fields, field boosting,
          a multi_match with a match phrase, fuzziness misspellings
        </h3>

        <div className="exam-sub-topic">
          <div className="pair">
            <div className="question">How to do a match_phrase query?</div>
            <div className="answer">
              {" "}
              use match_phrase instead of match, that will ensure you only match
              docs that have both words one right after the other
            </div>
            <textarea
              rows={10}
              defaultValue={`
    GET blogs/_search
    { 
      "query": {
        "match_phrase": {
          "content": "search analytics"
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What if you wanted to make a multi_phrase query less strict so the
              words didnt have to be right next to each other?
            </div>
            <div className="answer">
              use a slop factor so that "release date" would match "date of
              release"
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How would a slop factor improve the recall of a multi_phase query?
            </div>
            <div className="answer">
              A search for "open data" phrase would also match "open source
              data"
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match_phrase": {
          "content": {
            "query": "open data",
            "slop": 1
          }
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How would you search across more than one field?
            </div>
            <div className="answer">use a multi_match query</div>
          </div>
          <div className="pair">
            <div className="question">How to do a multi_match query?</div>

            <textarea
              rows={12}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "multi_match": {
          "query": "open source",
          "fields": ["content", "title^2"]
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">How does best_fields work?</div>
            <div className="answer">
              When running a multi_match--by default, Elasticsearch only
              considers the best scoring field when calculating the _score
              (best_fields)
              <br />
              In this example, 3 fields are queried (which results in 3 scores)
              and the best score is used.
            </div>
            <textarea
              rows={12}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "multi_match": {
          "query": "open source",
          "fields": ["content", "title^2"]
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What if you wanna weigh one field match over another in a
              multi_match query?
            </div>
            <div className="answer">
              use field boosting! with the ^ carrot symbol
            </div>
            <textarea
              rows={12}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "multi_match": {
          "query": "open source",
          "fields": ["content", "title^2"]
        }
      }
    }
    `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How to do a multi_match with a match phrase?
            </div>
            <div className="answer">
              Two Examples: 1) if "elasticsearch training" gets too many hits,
              you can turn it into a phrase query with query type. If open
              source is too wide of a search (cause source is a very common
              term), search for the phrase together across multiple fiels with
              query type phase.
              <br /> Note: type is not match_phrase. NOT IN DOCS
            </div>
            <textarea
              rows={27}
              defaultValue={`
    GET blogs/_search
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

    GET blogs/_search
    {
      "query": {
        "multi_match": {
          "query": "open source",
          "fields": ["content", "title^2"],
          "type": "phrase"
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What if the search term provided by the user is misspelled?
            </div>
            <div className="answer">
              Auto complete is best practice but you can also use a fuzziness
              factor
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How does fuzziness match queries work?
            </div>
            <div className="answer">
              The number refers to the misspellings PER TERM. Ex is search for
              "shard".
            </div>
            <textarea
              rows={12}
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
          </div>
          <div className="pair">
            <div className="question">
              Do you wanna do fuzziness of 2 for short words??
            </div>
            <div className="answer">
              No, that's usually too much.
              <br /> best practice: “auto” is the preferred way to use
              fuzziness, defines the distance based on the length of the query
              terms
            </div>
            <textarea
              rows={15}
              defaultValue={`
    GET blogs/_search
    {
      "_source": "title",
      "query": {
        "match": {
          "title": {
            "query": "oven sauce",        <-----
            "fuzziness": auto
          }
          
        }
      }
    }
    `}
            />
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• The match_phrase query is for searching text when you want to
          find terms that are near each other
          <br />• The multi_match query allows you to search the same terms in
          multiple fields
          <br />• Fuzziness is an easy solution to misspelling but has high CPU
          overhead and very low precision
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. Explain the difference between match and match_phrase.
            </div>
            <div className="answer">
              match_phrase find the search terms back to back, match looks for
              them separately (more recall less precision). Formal answer:
              multiple terms in match_phrase are “and” and position matters.
            </div>
          </div>

          <div className="pair">
            <div className="question">
              2. If you want to add some flexibility into match_phrase, you can
              configure a ___________ property.
            </div>
            <div className="answer">
              slop property so the terms can be seperated by 1-2 words
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. Would the following query match a document that contains
              "monitoring data"?
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": {
            "query": "monitering datu",
            "fuzziness": 1
          }
        }
      }
    }
    `}
            />
            <div className="answer">
              3. Yes. The fuzziness value is applied PER ANALYZED TERM
            </div>
          </div>
        </div>
      </div>
    );
  }
}
