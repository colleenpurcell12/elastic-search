import React, { Component } from "react";

export default class MappingsAndTextAnalysis extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 4 Mappings and Text Analysis: Lesson 4.2 Text and Keyword
          Strings
        </h2>
        {/* slides 261 to 280 */}
        <div>
          Topics: intro to analyzers and multi fields, dynamically mapping
          strings to text and keyword
        </div>
        <h3>
          ** Define and use multi-fields with different data types and/or
          analyzers
        </h3>
        <div className="pair">
          <div className="question">
            How do you apply a non-standard analyzer to a field?
          </div>
          <div className="answer">
            with the mapping, below the analyzer for the content field is set to
            english instead of standard
          </div>
          <textarea
            rows={7}
            defaultValue={`
    "content" : {
      "type" : "text",
      "analyzer": "english"
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            For a string field, when should you use type text versus type
            keyword?
          </div>
          <div className="answer">
            For search by category (when their are discrete options), use
            category. Keyword for non-analyzed fields like codes, as well as
            aggs and sorting.
          </div>
        </div>
        <div className="pair">
          <div className="question">Describe multi-fields for strings.</div>
          <div className="answer">
            Default is type text AND type keyword. The former for searching and
            the later for aggs and sorting.
            <br /> Below shows the county_name.keyword multi-field of type
            keyword. It is a bit confusing because “keyword” is the name of the
            multifield and the data type!
          </div>
          <textarea
            rows={18}
            defaultValue={`
    PUT my_index2
    {
      "mappings": {
        "properties": {
          "country_name" : {
            "type" : "text",
            "fields" : {
              "keyword" : {                     <---- name of multi-field
                "type" : "keyword",             <---- type
                "ignore_above" : 256
                }
              }
            }
        }
      }
    }
              `}
          />
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• Elasticsearch has two kinds of string datatypes: text and
          keyword <br />• Text fields are for full text search <br />• Keyword
          fields are for exact searches, aggregations and sorting <br />• By
          default, every string gets dynamically mapped twice: as a text field
          and as a keyword multi-field <br />• You can optimize your mapping by
          choosing either text or keyword explicitly (or both!) !
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False: By default, full text searches in Elasticsearch
              are case-sensitive.
            </div>
            <div className="answer">
              TRUE string fields are analyzed wth standard analyer which goes
              through lowercase filter
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. How many times does a dynamically mapped string field get
              indexed by default?
            </div>
            <div className="answer">
              twice, onces as type text and once as .keyword
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: Aggregations often give the best results when
              performed against a keyword field.
            </div>
            <div className="answer">True</div>
          </div>
        </div>
      </div>
    );
  }
}
