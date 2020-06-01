import React, { Component } from "react";

export default class MappingsAndTextAnalysis extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Mappings and Text Analysis</h2>

        <div>
          scaled floats like for prices that dont need to be an entire floating
          number,{" "}
        </div>

        <h3>
          ** Define and use multi-fields with different data types and/or
          analyzers
        </h3>

        <div className="pair">
          <div className="question">QUESTION </div>
          <div className="answer">ANSWER</div>
        </div>
        <div className="pair">
          <div className="question">
            When would you only want a "type": "keyword" (exact match) and no
            analyzed/tokenized ("type:" "text") version? "SIngle field" instead
            of multi.
          </div>
          <div className="answer">
            Username where all capitalization and puncuation is required
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What's the default for a keyword field?
          </div>
          <div className="answer">
            "ignore_above": 256 is the default so that unnecessary long string
            data fields arent stored when they wont be used and just waste
            space.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            When is the use of the keyword field unnecessary?{" "}
          </div>
          <div className="answer">
            For the content field of a blog which is the entire text. If you had
            the entire text, why would you nbe searching for the blog? No use
            case. Makes zero sense.
          </div>
        </div>
        <div className="pair">
          <div className="question">What's multi field? </div>
          <div className="answer">
            it's when a string keh in the mapping is stored as both as terms (by
            default indexed with Standard tokenizer) and as a keyword which is
            the exact string, unanalyzed.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Which version of a field is not analyzed?
          </div>
          <div className="answer">
            Keyword and it is data type "keyword", which you have to specify in
            the search.
          </div>
        </div>

        <div className="pair">
          <div className="question">
            True or False: By default, full text searches in Elasticsearch are
            case-sensitive.
          </div>
          <div className="answer">
            FALSE (tricky) default the standard analyzer on the type text
            version of the field does get transformed into lowercase so it's NOT
            case sensitive.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How many times does a dynamically mapped string field get indexed by
            default?
          </div>
          <div className="answer">
            Twice, once as type text and once as type keyword (multi-field).
          </div>
        </div>
        <div className="pair">
          <div className="question">
            True or False: Aggregations often give the best results when
            performed against a keyword field.
          </div>
          <div className="answer">TRUE</div>
        </div>
        <div className="pair">
          <div className="question">
            Which are the two documents created for a new index?
          </div>
          <div className="answer">
            Inverted index for search and docvalues for sorting and
            aggregations. Dont create docvalues for analyzed fields.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What is an example of a non-sensical result from sorting on type
            text (analyzed standard)?
          </div>
          <div className="answer">
            Youd' get United, States, Kingdom instead of United States, United
            Kingdom
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What is an example of a strange sorting a field that's a number
            sorted as a string?
          </div>
          <div className="answer">1, 10, 100, 2, 20, 200</div>
        </div>
        <div className="pair">
          <div className="question">
            WHow do you correctly sort a numeric field?
          </div>
          <div className="answer">
            a term aggregation needs {`"term": "a.num"`} to be sorted
            1,2,10,20,100,200
          </div>
        </div>
        <div className="pair">
          <div className="question">
            In the mapping, if you know you'll never use the inverted index on
            this field like http
          </div>
          <div className="answer">
            after setting type, set {`"index": false`}
          </div>
        </div>

        <div className="pair">
          <div className="question">
            In the mapping if you know you'll never use a field for
            aggregations, how can you disable that feature to save memory?
          </div>
          <div className="answer">
            after setting type, set {`"doc_values": false`}
          </div>
        </div>

        <div className="pair">
          <div className="question">
            In the mapping, how would you disable a field meaning you cannot
            query or aggregate but retain it in the JSON (not delete it, just
            save memory)?
          </div>
          <div className="answer">
            after setting type, set {`"enabled": false`}
          </div>
          <textarea
            rows={14}
            defaultValue={`
    PUT my_logs/_mapping
    {  
      "properties": {    
        "http_version": {      
          "enabled": false    
        }  
      }
    }
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            True or False: You should sort by a text field instead of a keyword
            field.
          </div>
          <div className="answer">False</div>
        </div>
        <div className="pair">
          <div className="question">
            True or False: If you set "index": false for a field, you can no
            longer query on that field.
          </div>
          <div className="answer">True</div>
        </div>
        <div className="pair">
          <div className="question">
            True or False: When you set "enabled": false for a field, that field
            will no longer be returned in the _source with your hits.
          </div>
          <div className="answer">False</div>
        </div>

        <div className="exam-objective">
          <h3>
            ** Define a mapping that satisfies a given set of requirements
          </h3>
          <div className="pair">
            <div className="question">
              How do you create an index with properties like timestamp, ip,
              btyes and coordinates{" "}
            </div>
            <textarea
              rows={14}
              defaultValue={`
    PUT my_logs
    {
      "mappings": {
        "properties": {
          "@timestamp": {"type" : "date"},
          "ip" : {"type": "ip"},
          "bytes" : {"type" : "long"},
          "coordinates" : {"type" : "geo_point"}
        }
      }
    }
              `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How do you add a property onto a preexisting mapping?{" "}
            </div>
            <textarea
              rows={14}
              defaultValue={`
    PUT my_logs/_mapping
    {
      "properties": {
        "coordinates" : {"type" : "geo_point"}
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">Custom Mapping Dates</div>
            <div className="answer">
              Default date format is long in ms, the formats it. For date
              fields, {`"format": "dd/MM/yyyy||epoch_millis"`} you can set the
              format but have a back up format.
            </div>
          </div>

          <div className="pair">
            <div className="question">
              Tell me about the "Copy_to" Parameter
            </div>
            <div className="answer">
              {" "}
              If you dont know which type of location value the user is going to
              provide input for, then you can combine the 3 queries and score
              them jointly.
              <br />
              _all that field is a combination of all fields that are re
              tokenized which is a huge storage, should disable it if you wont
              use it. It was a good idea but poorly executed so this is an
              improvement of that.
              <br />
              Create a "location_combined" field in the mapping to add. with the
              copy_to parameter. TODO add image copy_to-parameter.png
              <br />
              scoring on combined fields{" "}
            </div>
          </div>

          <div className="pair">
            <div className="question">Null Values</div>
            <div className="answer">
              calculating average wont look at documents where the field is
              null. Scripting on fields wont work without a default value, null
              values will error. null_value is like default value. Value of null
              is same as no value.
              <br />
              The null_value parameter is only applied to fields that exist and
              have null as their value.
            </div>
            <textarea
              rows={14}
              defaultValue={`
    PUT ratings{  
      "mappings": {     
        "properties": {        
          "rating": {          
            "type": "float",          
            "null_value": 1.0        
          }     
        }  
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">Coercing type</div>
            <div className="answer">
              {`"coerce": false`} which account for when a type long comes in as
              "3", "3.5", etc
            </div>
          </div>

          <div className="pair">
            <div className="question">CUSTOM Mapping</div>
            <div className="answer">
              first index a document representing your ideal mapping, then query
              the mapping, then edit and redex a new index with the edited
              mapping
            </div>
          </div>
          <div className="pair">
            <div className="question">
              What mapping parameter would you use to change a field's date
              format?.
            </div>
            <div className="answer">format</div>
          </div>
          <div className="pair">
            <div className="question">
              True or False: Using copy_to you are adding a new field to the
              _source that gets returned with the hits.
            </div>
            <div className="answer">False, _source is never changed.</div>
          </div>
          <div className="pair">
            <div className="question">
              True or False: It is a common practice to use dynamically
              generated mapping to create a custom mapping.
            </div>
            <div className="answer">
              False, usually you trigger an automatically generate mapping, then
              edit it and create a new index with that edited mapping as your
              explicitly designated one.
            </div>
          </div>

          <div className="pair">
            <div className="question">Dynamic Mapping</div>
            <div className="answer">???</div>
          </div>

          <div className="pair">
            <div className="question">
              Which field has doc_values auto enabled?
            </div>
            <div className="answer">.keyword</div>
          </div>

          <div className="pair">
            <div className="question">
              How to make a field that you cant query or aggregate on?
            </div>
            <div className="answer">{`"enabled": false`}</div>
          </div>
          <div className="summary">
            <h3> Summary </h3>
            <br />• Elasticsearch has two kinds of string datatypes: text and
            keyword <br />• Text fields are for full text search <br />• Keyword
            fields are for exact searches, aggregations and sorting <br />• By
            default, every string gets dynamically mapped twice: as a text field
            and as a keyword multi-field <br />• You can optimize your mapping
            by choosing either text or keyword explicitly (or both!)
          </div>
          <div className="quiz">
            <h3>QUIZ</h3>

            <div className="pair">
              <div className="question">
                1. True or False: By default, full text searches in
                Elasticsearch are case-sensitive.
              </div>
              <div className="answer">
                False, case INSENSITIVE text searches on auto-mapped text fields
                which are mapped to text and keyword, are analyzed with standard
                analyzer.
              </div>
            </div>
            <div className="pair">
              <div className="question">
                2.How many times does a dynamically mapped string field get
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
      </div>
    );
  }
}
