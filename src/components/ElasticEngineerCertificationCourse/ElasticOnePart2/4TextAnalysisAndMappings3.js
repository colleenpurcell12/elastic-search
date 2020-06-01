import React, { Component } from "react";
import DocValues from "./images/DocValues.png";

export default class MappingsAndTextAnalysis extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 4 Mappings and Text Analysis: Lesson 4.3 The Inverted Index and
          Doc Values
        </h2>
        <h3>NOT ON EXAM</h3>
        {/* slides 282-300 */}
        <div>
          Topics: building Inverted Index, why it makes searching fast, can only
          sort by keyword fields, Doc Values is a table of all values of a
          field, doc_values generated for keyword fields and used for
          aggregations/sorting, Optimizing mappings: how to disable fields for
          querying v aggregating v everything
        </div>

        <div className="pair">
          <div className="question">Describe an Inverted Index.</div>
          <div className="answer">
            For a given index, when a document is indexed, all the terms of a
            given string field are put into a list, along with the ids of all
            the documents that have that term.
            <br />
            <br />
            Speed: The Inverted Index table immediately answers the question
            "Which documents have the term "subject" in the content field.
          </div>
        </div>

        <div className="pair">
          <div className="question">What's Doc Values?</div>
          <div className="answer">
            Per field, it's a field's value for every document, ie the country
            of doc 1 is US, the country of doc 2 is France, etc. It's another
            data structure besides Inverted Index.
          </div>
          <img src={DocValues} alt="Doc Values" />
        </div>
        <div className="pair">
          <div className="question">What are doc_values for?</div>
          <div className="answer">Aggregations and sorting.</div>
        </div>
        <div className="pair">
          <div className="question">
            What if you know that you'll never query a certain field?
          </div>
          <div className="answer">
            Dont index it. It wont be searchable, but it'll still be returned in
            the _source and can be used in aggregations.
          </div>
          <textarea
            rows={7}
            defaultValue={`
    "http_version": {
      "type": "keyword",
      "index": false                  <----- not indexed, cant be searched
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            What if you'll never aggregate on a certain field?
          </div>
          <div className="answer">
            Set <code>doc_values to false</code>
          </div>
          <textarea
            rows={7}
            defaultValue={`
    "http_version": {
      "type": "keyword",
      "doc_values": false                <----- cant be aggregated
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            What if you dont need to ever query OR aggregate on a field?
          </div>
          <div className="answer">
            Disable the field by settting{" "}
            <code>
              enabled to false. This field will still be returned in the _source
            </code>
          </div>
          <textarea
            rows={7}
            defaultValue={`
    "http_version": {
      "type": "keyword",
      "enabled": false                <----- cant be aggregated
    }
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
