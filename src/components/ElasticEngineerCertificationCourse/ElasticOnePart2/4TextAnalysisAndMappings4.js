import React, { Component } from "react";

export default class MappingsAndTextAnalysis extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 4 Mappings and Text Analysis: Lesson 4.4 Custom Mappings</h2>
        {/* slides 300-325 */}
        <div>
          Topics: Dynamic Templates for indices, date format, copy_to, default
          values, coercion, easy way to create a custom mapping
        </div>
        <h3>
          ** Define and use multi-fields with different data types and/or
          analyzers
        </h3>
        <div className="pair">
          <div className="question">
            When mapping a date, how can you specify format?
          </div>
          <div className="answer">specify date format</div>
          <textarea
            rows={6}
            defaultValue={`
    "comment_time" : {
      "type": "date",
      "format" : "dd/MM/yyyy"     OR     "format": "MMM dd, yyyy"
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            If you frequently search over 3 fields jointly like region, country
            and city, what should you use?
          </div>
          <div className="answer">
            Use a combined field, generated from other fields where "copy_to"
            property is set to the combined fieldname.
          </div>
          <textarea
            rows={25}
            defaultValue={`
    PUT my_index2
    {
      "mappings": {
        "properties": {
          "region_name": {
            "type": "keyword",
            "copy_to": "locations_combined"
          },
          "country_name": {
            "type": "keyword",
            "copy_to": "locations_combined"
          },
          "city_name": {
            "type": "keyword",
            "copy_to": "locations_combined"
          },
          "locations_combined": {                     <----- generated field, not in _source
            "type": "text"
          }
        }
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            Describe how the copy_to parameter is used.
          </div>
          <div className="answer">
            The copied field is not saved in the source, just indexed for easier
            querying like this-->
          </div>
          <textarea
            rows={10}
            defaultValue={`
    GET weblogs/_search
    {
      "query": {
        "match": {
          "locations_combined": "victoria australia"
        }
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How to set a default field value for empty fields?
          </div>
          <div className="answer">
            Use the null_value property
            <br />
            If “rating” is null, then 1.0 will be indexed for that field.
            Impacts metrics aggregations. Wont impact _source.
          </div>
          <textarea
            rows={14}
            defaultValue={`
    PUT ratings
    {
      "mappings": {
        "properties": {
          "rating": {
            "type": "float",
            "null_value": 1.0         <----- null_value is default value
          }
        }
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">Field type Coercion</div>
          <div className="answer">
            If you index sa doc with a field that is mapped to long number, as a
            string representing a number, as the default behavior-- it will
            index that field as a long.
          </div>
          <textarea
            rows={16}
            defaultValue={`
    ALL WORK
    PUT ratings/_doc/1
    {
      "rating": 4
    }
    PUT ratings/_doc/2
    {
     "rating": "3"
    }
    PUT ratings/_doc/3
    {
     "rating": 4.5
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">How to disable Coercion?</div>
          <div className="answer">
            you can set <code>"coerce": false</code> so indexing will fail if
            the field type is incorrect. Stricter.
          </div>
          <textarea
            rows={11}
            defaultValue={`
    "mappings": {
      "properties": {
        "rating": {
          "type": "long",
          "coerce": false
        },
        ...
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            Easiest ways to create a mapping definition
          </div>
          <div className="answer">
            Good shortcut is to index a document into a draft index, query for
            the dynamically generated mapping, then edit it (like make content
            field only text and not keyword, make code only keyword etc) and
            create your final draft index with an explicit mapping
          </div>
        </div>
        <div className="pair">
          <div className="question">Dynamic Templates for new indices</div>
          <div className="answer">
            if you dont know what mapping you want or which fields will be
            indexed, you can set rules to respond dynamically to new fields
          </div>
        </div>
        <div className="pair">
          <div className="question">How to define Dynamic Template</div>
          <div className="answer">
            if you dont know what mapping you want or which fields will be
            indexed, you can set rules to respond dynamically to new fields
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How do you map all unmapped strings to type keyword?
          </div>
          <div className="answer">
            match_mapping_type --> string and mapping{" "}
            <code>{`type: keyword`}</code>
          </div>
          <textarea
            rows={18}
            defaultValue={`
    PUT test2
    {
      "mappings": {
        "dynamic_templates": [
          {
            "my_string_fields": {
              "match_mapping_type": "string",
              "mapping": {
                "type": "keyword"
              }
            }
          }
        ]
      }
    }
              `}
          />
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• Mapping parameters allow you to influence how Elasticsearch
          will index the fields in your documents
          <br />• Dynamic templates make it easier to set up your own mappings
          by defining defaults for fields, based on their JSON type, name or
          path
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. What mapping parameter would you use to change a field's date
              format?
            </div>
            <div className="answer">format</div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False: Using copy_to you are adding a new field to the
              _source that gets returned with the hits.
            </div>
            <div className="answer">
              FALSE you are just adding to the Inverted Index with the values of
              the field that have copy_to defined.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: It is a common practice to use dynamically
              generated mapping to create a custom mapping.
            </div>
            <div className="answer">
              TRUE that's a great starting point to speed up the process
            </div>
          </div>
        </div>
      </div>
    );
  }
}
