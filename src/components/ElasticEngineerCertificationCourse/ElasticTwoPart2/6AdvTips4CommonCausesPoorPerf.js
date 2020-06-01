import React, { Component } from "react";

export default class AdvTips2 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 6 Elasticsearch Advanced Tips and Tricks Part 4: Common Causes
          of Poor Perf
        </h2>

        {/* <div>Lab 6.4</div> */}
        <div className="exam-objective">
          <h3>NOT ON EXAM</h3>
          {/* slide 392 */}
        </div>
        <div className="Notes">
          <h3>Notes</h3> <br />
          <h4>Common Issues</h4>
          how to trigger caching? add a filter or must_not clause
          <br />
          Issue: Aggregating Too Many Docs
          <br />
          Option #1: do an aggregation on a subset of your index, combine it
          with a query, lower scope with a sample
          <br />
          Option #2: Another strategy is to limit shard size
          <br />
          <br />
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            Add a wrapper agg with a sampler shard size
              add: "sampler": {
                    "shard_size": 100
                  },


            GET logs*/_search
            {
              "size": 0,
              "query": {
                "bool": {
                  "filter": {
                    "match": {
                      "language.url": "time-based indices"
                    }
                  }
                }
              },
              "aggs": {
                "my_sample": {
                  ***
                  "sampler": {
                    "shard_size": 100
                  },
                  ***
                  "aggs": {
                    "top_countries": {
                      "terms": {
                        "field": "geoip.country_name.keyword"
                      }
                    }
                  }
                }
              }
            }
            `}
          />
          Option #3: virtual bucketing, create a pipeline to add a random number
          to every doc, so you can filter on it for your aggs
          <br />
          Instead of using query scripts, add a custom field to a index, the ex
          in slide is check for long title, at index should perform script in
          template to compute the field value
          <br />
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
            PUT _ingest/pipeline/comment_length
            {
              "processors": [
                {
                  "script": {
                    "lang": "painless",
                    "source": "ctx['title_length'] = ctx['title'].length();"
                  }
                }
              ]
            }
            `}
          />
          RegEx is super expensive
          <br />
        </div>

        <div className="Summary">
          <h3> Summary </h3>
          <br />
          • When calculating the score, each shard uses its local IDF ‒use
          dfs_query_then_fetch to add an extra step and calculate the global IDF
          <br />
          • Deep pagination can crash clusters, use search_after to avoid it
          <br />• Terms aggregation trade accuracy for speed ‒use shard_size if
          you want to trade speed for accuracy
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False. It is a good idea to wrap a query in a filter
              clause, if it should not contribute to ranking.
            </div>
            <div className="answer">TRUE </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False. Elasticsearch allows you, at query time, to join
              documents that sit in separate indices.
            </div>
            <div className="answer">FALSE can get them but not join them</div>
          </div>
          <div className="pair">
            <div className="question">
              3. Name three ways to reduce the scope of an aggregation
            </div>
            <div className="answer">
              3. A query. A filter aggregation. The sampler aggregation.
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
