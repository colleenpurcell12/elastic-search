import React, { Component } from "react";

export default class NodesAndShards extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>TEMPLATE</h2>
        {/* slides 282-300 */}
        <div>Topics:ABC</div>
        <h3>** ???</h3>
        <div className="pair">
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
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• Lucene builds multiple data structures out of your documents:
          inverted indices and doc values <br />• The inverted index make
          searching fast <br />• Doc values allow you to aggregate and sort on
          values <br />• You can disable the inverted index or doc values for
          individual fields in the mapping, to optimize Elasticsearch
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False: You should sort by a text field instead of a
              keyword field.
            </div>
            <div className="answer">FALSE</div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False: If you set "index": false for a field, you can
              no longer query on that field.
            </div>
            <div className="answer">
              TRUE (setting doc_values to false will disable aggs/sorting,
              enable to false will disable both)
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: When you set "enabled": false for a field, that
              field will no longer be returned in the _source with your hits.
            </div>
            <div className="answer">
              FALSE, it will still be saved just not aggregatable or searchable.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
