import React, { Component } from "react";
import ECSFieldSetsTable from "./images/ECSFieldSetsTable.png";

export default class DM3FieldModelingAndCommonSchema extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Data Modeling Part 3: Field Modeling and the Elastic Common Schema
        </h2>
        <div className="pair">
          Questions for memorization/review: how to create a field alias, how to
          create a mapping with multi-fields
        </div>
        <div className="exam-objective">
          <h3>
            ** Define and use multi-fields with different data types (and/or
            analyzers)
          </h3>
          <h4>
            #1) know how to add a field alias (alias data type) to an index
            mapping
            <br />
            #2) how to have a string field be a multi-field: both type text
            (with analyzer) and type keyword
          </h4>

          {/* <h4>Lab 1.3</h4> */}
          <div className="pair">
            <div className="question">
              Data Modeling: choosing field types well
            </div>
            <div className="answer">Examples</div>
            <textarea
              rows={10}
              defaultValue={`
    "@timestamp": {
      "type": "date"
      },
      "code": {
        "type": "keyword"
      },
      "status_code": {
        "type": "short"
      }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">Granular Fields</div>
            <div className="answer">
              Ex of versions that have major and minor versions. Should store
              both separately to avoid having to use regular expressions if we
              arent querying for an exact match.
            </div>
            <textarea
              rows={60}
              defaultValue={`

          create the index:
            PUT blogs
            {
              "mappings": {
                "properties": {
                  "version": {
                    "properties": {
                      "display_name": {
                        "type": "keyword"
                      },
                      "major": {
                        "type": "byte"
                      },
                      "minor": {
                        "type": "byte"
                      },
                      "bugfix": {
                        "type": "byte"
                      }
                    }
                  }
                }
              }
            }

            index a document into the index
            PUT blogs/_doc/1
            {
              "version": {
                "display_name": "6.2.1",
                "major": 6,
                "minor": 2,
                "bugfix": 1
              }
            }

            GET blogs/_search
            {
              "query": {
                "bool": {
                  "filter": [
                    {
                      "match": {
                        "version.major": 5
                      }
                    },
                    {
                      "match": {
                        "version.minor": 4
                      }
                    }
                  ]
                }
              }
            }
              
            `}
            />
          </div>

          <div className="Notes">
            <h4>Field Name and Field Type Convention:</h4> huge impact when
            querying across multiple indices
            <br />
            Mappings Should be Consistent: • It facilitates the analysis of data
            from diverse sources
            <br />
            <h4>Elastic Common Schema, field conventions</h4>
            common set of document fields, support uniform data modeling
            <br />• ECS defines two field levels: Core and Extended
            <img src={ECSFieldSetsTable} alt="ECSFieldSetsTable" />
            <br />
            Ex guideline: The document MUST have the @timestamp field
            <br /> lowercase field names, combine words with underscore, no
            special characters, avoid repetition like host.host_ip, avoid
            abbreviations
            <br />
            Type Conventions: integars are type long, IDs and most codes are
            keywords
            <br />
            <h4>alias Data Type</h4>
            Naming conventions field aliases how
          </div>

          <div className="pair">
            <div className="question">
              How to add a field alias with "path"?
            </div>

            <div className="answer">
              Translate the method property into the http.request.method
              property to conform to the convention
            </div>
            <textarea
              rows={20}
              defaultValue={`
    POST logs_server1/_mapping
    {
      "properties": {
        "http": {
          "properties": {
            "request": {
              "properties": {
                "method": {
                  "type": "alias",
                  "path": "method.keyword"   <---- what it would be otherwise
                }
              }
            }
          }
        }
      }
    }

   GET logs_server1/_search
    {
      "size": 0,
      "aggs": {
        "http_methods": {
          "terms": {
            "field": "http.request.method"
          }
        }
      }
    }

    instead of  "field": "method.keyword"
            `}
            />
          </div>

          <div className="pair">
            <div className="question">How to do a WILDCARD query</div>
            <div className="answer">
              Write a query that returns all documents with a minor version 6.
            </div>
            <textarea
              rows={14}
              defaultValue={`
              GET version_test/_search
              {
                "query": {
                  "wildcard": {
                    "version.keyword": {
                      "value": "??6??"
                    }
                  }
                }
              }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Why should you avoid wildcard queries?
            </div>
            <div className="answer">very expensive</div>
          </div>

          <div className="pair">
            <div className="question">How to do a scripted aggregation?</div>
            <div className="answer">
              If you wanna search across indices, on a similar field with
              different field names to find top log across one index that calls
              is log_level and other other that calls it level, you have to go
              COMPLEX like this
            </div>
            <textarea
              rows={18}
              defaultValue={`
              GET loglevel*/_search
              {
                "size": 0,
                "aggs": {
                  "top_levels": {
                    "terms": {
                    "script": "
                      if (doc.containsKey('level.keyword')) {
                        return doc['level.keyword'].value 
                      } else { 
                        return doc['log_level.keyword'].value 
                      }"
                    }
                  }
                }
              }
            `}
            />
          </div>

          <div className="pair">
            <div className="question">How do you create a field alias?</div>
            <div className="answer">
              With the alias datatype! Add a new field to both the indices'
              mapping like this
            </div>
            <textarea
              rows={30}
              defaultValue={`
  PUT loglevel_test1/_mapping
  {
    "properties": {
      "log": {
        "properties": {
          "level": {
            "type": "alias",
            "path": "level.keyword"
          }
        }
      }
    }
  }
  PUT loglevel_test2/_mapping
  {
    "properties": {
      "log": {
        "properties": {
          "level": {
            "type": "alias",
            "path": "log_level.keyword"
          }
        }
      }
      
    }
  }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">Advantages of Field Alias?</div>
            <div className="answer">
              Field alias (not on another/index alias), a way to avoid
              reindexing
            </div>
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          • Carefully modeling your data allows you to take the most out it
          <br />• Name conventions facilitate the analysis of data from diverse
          sources
          <br />• ECS is designed to support uniform data modeling ‒ specifies
          field names and datatypes
          <br />• The alias datatype allows you to define an alternate name for
          a field in the index
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              How might the following field be modeled more effectively for
              querying and aggregating dev environments?{" "}
              <code>"dev_environment": "Emacs; Notepad++; PyCharm" </code>
            </div>
            <div className="answer">
              Array. Bonus how to convert? Split processor: through ingest
              pipeline processor EXAM
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Name conventions facilitate the analysis of data from diverse
              sources.
            </div>
            <div className="answer">
              True, strange wording. Naming convention help, otherwise alias.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              If a field is poorly named, the only way to change it is to create
              a new index and reindex all the data.
            </div>
            <div className="answer"> FALSE use field alias</div>
          </div>
        </div>
      </div>
    );
  }
}
