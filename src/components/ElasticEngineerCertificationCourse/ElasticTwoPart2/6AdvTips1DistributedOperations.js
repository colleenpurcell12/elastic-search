// course said this wouldnt be on exam
import React, { Component } from "react";

export default class AdvTips2 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 6 Elasticsearch Advanced Tips and Tricks: 1 Challenges of
          Distributed Operations
        </h2>
        {/* slides 393-300 */}
        <div>
          Topics: dfs_query_then_fetch, deep pagination: search_after replaces
          from, _scroll API, doc_count_error_upper_bound, sum_other_doc_count,
          shard_size param for aggs
        </div>
        <h3>*** Use the scroll API to retrieve large numbers of results</h3>
        {/* <div className="pair">
          <div className="question">Question</div>
          <div className="answer">Answer</div>
        </div>
        <div className="pair">
          <div className="question">Question</div>
          <div className="answer">Answer</div>
        </div>
        <div className="pair">
          <div className="question">Question</div>
          <div className="answer">Answer</div>
          <textarea
            rows={7}
            defaultValue={`
    XYZ
              `}
          />
        </div> */}

        <div className="summary">
          <h3> Summary </h3>
          <br />• When calculating the score, each shard uses its local IDF ‒
          use dfs_query_then_fetch to add an extra step and calculate the global
          IDF <br />• Deep pagination can crash clusters, use search_after to
          avoid it <br />• Terms aggregation trade accuracy for speed ‒ use
          shard_size if you want to trade speed for accuracy
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False. dfs_query_then_fetch should be used in very
              large datasets.
            </div>
            <div className="answer">
              False, good for testing in dev with small datasets. Large datasets
              usually don't suffer the effects of distributed IDF.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. In which scenarios would you use search_after instead of from
              and size?
            </div>
            <div className="answer">
              Deep pagination--> From and Size are great when users should not
              beyond a few pages and you can limit the number of pages, they
              make it easy to navigate through pages. search_after is great for
              catalogs in which users are expected to browse all content without
              going too much forward and backwards.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. How can you increase the accuracy of a terms aggregation?
            </div>
            <div className="answer">
              Set shard_size-->The shard_size parameter allows you to increase
              the number of documents retrieved by each shard which increases
              the accuracy over speed.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
