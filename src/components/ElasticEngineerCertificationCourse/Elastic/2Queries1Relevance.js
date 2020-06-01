import React, { Component } from "react";

export default class QueriesPart1 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.1 Relevance</h2>
        <h3>
          ** Write and execute a search query for terms and/or phrases in one or
          more fields of an index
        </h3>
        <h3>
          » Docs » Query DSL » Full text queries » Simple query string query
        </h3>
        <h3>
          Relevance (Recall and Precision), track_total_hits, or versus and
          operator, minimum_should_match, _source include/exclude, ranking by
          score
        </h3>
        <br />
        <div>
          <h3>CONCEPTUAL SUMMARY: Recall v Precision</h3>
          Relevance is how good the results are, the key aspects are recall and
          precision. Recall is "did we miss any relevant results?" and Precision
          is "did will get irrelevant ones"?
          <br />
          <b>Recall</b> is all the good results we did get out of all the good
          results we should have gotten.
          <br />
          <b>Precision</b> is good results out of all the results we got.
          <br /> more recall from widening the net (partial matches), more
          precision but making queries more strict (exact matches)
          <br />
          <br />
          By default when you match on a two word phrase, it uses OR logic and
          returns results that either have the 1st or 2nd word in the field
          <br />
          Queries return the "hits" value (250 let's say), but only 10 actual
          sample documents are included
          <br />
          <br />
          <div className="pair">
            <div className="question">What's the max hits value count?</div>
            <div className="answer">
              10,000. If the real # is higher, it'll say{" "}
              <code>"relation": "gte"</code>
            </div>
            <textarea
              rows={9}
              defaultValue={`
    GET _search

  ==> "hits" : {
        "total" : {
          "value": 10000,
          "relation": "gte"
      },
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to get the actual # of hits returned?
            </div>
            <div className="answer">
              <code>Request body: track_total_hits: true</code>
            </div>
            <textarea
              rows={6}
              defaultValue={`
    GET _search
    {
      "track_total_hits": true
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to change a OR search to be more precise?
            </div>
            <div className="answer">
              make
              <code> {`"operator: and"`}</code>
            </div>
            <textarea
              rows={22}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": "ingest nodes"               <----- THIS SIMPLE
        }
      }
    }
    
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": {
            "query": "ingest nodes",               <----- THIS COMPLEX, more precise
            "operator": "and"
          }
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What if you have three search terms and you want the results to
              match at least 2 of the terms?
            </div>
            <div className="answer">
              Well the OR might be too loose and the AND too strict, so use{" "}
              <code>minimum_should_match</code>
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": {
            "query": "ingest node logstash",
            "minimum_should_match": 2
          }
        }
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Which query clauses can you use minimum_should_match with?
            </div>
            <div className="answer">should OR match</div>
          </div>
          <div className="pair">
            <div className="question">Why doesn't this query make sense?</div>

            <textarea
              rows={14}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": {
            "query": "ingest node logstash",
            "operator": "AND",
            "minimum_should_match": 2
          }
        }
      }
    }
    `}
            />
            <br />
            <div className="answer">
              Because the operator AND means all 3 terms in the match query
              should match, while minimum_should_match of 2 contradicts that are
              suggests only 2 have to match (which is redundant cause all 3 have
              to match in an AND query)
            </div>
          </div>
          <div className="pair">
            <div className="question">How are results' scores calculated?</div>
            <div className="answer">
              There are three main factors of a document’s score:
              <ul>
                <li>
                  ‒ <b>TF (term frequency):</b> The more a term appears in a
                  field, the more important it is
                </li>
                <li>
                  ‒ <b>IDF (inverse document frequency)</b>: The more documents
                  that contain the term, the less important the term is
                </li>
                <li>
                  ‒ <b>Field length</b>: matching a term in a shorter fields is
                  likely to be more relevant than matching a term in a longer
                  field
                </li>
              </ul>
              Note: scores are used as the default sorting attribute
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How do you exclude source field in the query response?
            </div>
            <div className="answer">
              with the _source excludes array property
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET blogs/_search
    {
      "size": 100,
      "_source": {
        "excludes": ["content"]
      },
      "query": {
        "match_all": {}
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What's the default _source value of a query request body?
            </div>
            <div className="answer">
              "true" which means include all the fields in the _source response
              (the actual documents matched)
            </div>
            <textarea
              rows={7}
              defaultValue={`
    GET blogs/_search
    {
      "_source": true
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How do you INCLUDE only certain source fields in the query
              response?
            </div>
            <div className="answer">
              Simplest to write: <code>{`_source: ["field_name"]`}</code>
              <br />
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET blogs/_search
    {
      "_source": ["title", "author"]              <------- SIMPLER
    }

    GET blogs/_search
    {
      "_source": {
        "includes": ["title", "author"]           <------- more verbose
      }
    }
    `}
            />
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• Recall is the portion of relevant documents that are returned
          in the results
          <br />• Precision is the probability that a document in the results is
          relevant
          <br />• Ranking is an ordering of the documents in the results
          according to relevance
          <br />• The match query is a simple but powerful search
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False: In a match query, you should use the AND
              operator to improve relevance.
            </div>
            <div className="answer">
              Not necessarily, the "and" operator increases precision but
              reduces recall due to a stricter search criteria; that all terms
              be matche.)
            </div>
          </div>

          <div className="pair">
            <div className="question">
              2. How could you improve the precision of a match query that
              consists of 5 terms?{" "}
            </div>
            <div className="answer">
              Use the minimum_should_match criteria set to 2-3
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: If a queried term appears 100 times in document
              A and 90 times in document B, then document A has a much higher
              score than document B.{" "}
            </div>
            <div className="answer">
              Not much higher, the impact of the term frequency is dampended so
              the impact on the score of a marginal time it's included is
              minimal.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              4. Bonus: if a one term matches Doc A, and the second term matches
              Doc B, but the 2nd term is found is more documents. Which document
              will have a higher score?
            </div>
            <div className="answer">
              Doc A due to Inverse Document Frequency scoring
            </div>
          </div>
        </div>
        {/* ^div wraps the question pairs */}
        <br />
      </div>
    );
  }
}
