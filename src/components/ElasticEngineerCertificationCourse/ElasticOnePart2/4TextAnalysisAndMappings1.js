import React, { Component } from "react";

export default class MappingsAndTextAnalysis extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 4 Mappings and Text Analysis: Lesson 4.1 What is a mapping
        </h2>
        <h3>NOT DIRECTLY ON EXAM</h3>
        {/* slides 244 to 261 */}
        <div>
          Topics: defining a mapping v adding to one, auto field type mapping
          for strings and numbers, scaling_factor, changing your mapping
        </div>
        <div className="pair">
          <div className="question">How can you define a mapping?</div>
          <div className="answer">
            Define a mapping with "mapping" request body param
            <br /> add to the index's mapping with the _mapping API Endpoint
          </div>
          <textarea
            rows={15}
            defaultValue={`
    PUT my_index
    {
      "mappings": {
        define mappings here
      }
    }


    PUT my_index/_mapping
    {
      additional mappings here
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            What happends when you index a document into a new index that hasnt
            been created?
          </div>
          <div className="answer">
            Elastic will auto generate a mapping for the index (not best
            practice) and dynamically map the fields in the documents
          </div>
        </div>
        <div className="pair">
          <div className="question">
            True or False: Mappings are defined per index.
          </div>
          <div className="answer">TRUE</div>
        </div>
        <div className="pair">
          <div className="question">
            What data type would "my_field" : 300 get mapped to dynamically?
          </div>
          <div className="answer">
            LONG like a status code, but explicitly setting type to short is
            better for memory
          </div>
          <textarea
            rows={13}
            defaultValue={`
    PUT my_logs
    {
      "mappings": {
        "properties": {
          "status_code": {
            "type": "short"
          }
        }
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            If a field is a price, and you dont want it to be mapped as a
            floating number, how to you address that issue?
          </div>
          <div className="answer">
            Use a scaling_factor. The scaling_factor of 100 gives this field a
            precision of two digits after the decimal point
          </div>
          <textarea
            rows={13}
            defaultValue={`
    PUT my_index2
    {
      "mappings": {
        "properties": {
          "price": {
            "type": "scaled_float",
            "scaling_factor": 100
          }
        }
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            True or False: You can change a field’s data type from “integer” to
            “long” because those two types are compatible.
          </div>
          <div className="answer">False</div>
        </div>
        <div className="pair">
          <div className="question">Can you change a mapping?</div>
          <div className="answer">
            You can only ADD fields, otherwise you have to reindex your
            documents. If you dont reindex and if you switch a field's data
            type, all existing documents with that field already indexed would
            become unsearchable on that field
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• Elasticsearch has two kinds of string datatypes: text and
          keyword <br />• Text fields are for full text search <br />• Keyword
          fields are for exact searches, aggregations and sorting <br />• By
          default, every string gets dynamically mapped twice: as a text field
          and as a keyword multi-field <br />• You can optimize your mapping by
          choosing either text or keyword explicitly (or both!)
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False: Mappings are defined per index.
            </div>
            <div className="answer">True</div>
          </div>
          <div className="pair">
            <div className="question">
              2.What data type would "my_field" : 300 get mapped to dynamically?
            </div>
            <div className="answer">long</div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: You can change a field’s data type from
              “integer” to “long” because those two types are compatible.
            </div>
            <div className="answer">false</div>
          </div>
        </div>
      </div>
    );
  }
}
