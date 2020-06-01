import React, { Component } from "react";
import WhenToUseJoinDataType from "./images/WhenToUseJoinDataType.png";

export default class DM2NestedAndJoinDataTypes extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Data Modeling Part 2: Nested and Join Data Types</h2>
        {/* <h4>Lab 1.2</h4> */}
        <div className="pair">
          Questions for memorization/review: how to query a nested data field,
          how to aggregate on a nested data field, how to map a nested data
          field
        </div>

        <div className="exam-objective">
          <h3>
            ** Configure an index so that it properly maintains the
            relationships of nested arrays of objects
          </h3>
          <div className="pair">
            <div className="question">
              When should you used a field of type nested?
            </div>
            <div className="answer">
              WITH ARRAYS where you wanna maintain the relationship/grouping of
              item's properties, like an author's company and name in a authors
              array
            </div>
          </div>
          <div className="pair">
            <div className="question">How to use it?</div>
            <textarea
              rows={15}
              defaultValue={`
    BASICALLY use: NESTED and PATH: fieldName

    MAPPING "type": "nested"
    QUERYING outter query is 
      "query": {
        "nested": {
          "path": "authors"
      AGGS
      "aggs": {
        "nested_authors": {
          "nested": {
            "path": "authors"
          },

      ADD A WRAPPER
        so query becomes --> query nested: {path: field} query
        and aggs becomes --> aggs nested_agg_name: {nested: {path: field}, aggs
            `}
            />
          </div>
          <h5>Generic Example</h5>
          <textarea
            rows={12}
            defaultValue={`
              "mappings": {
                "properties": {
                  "outer_object": {
                    "type": "nested",          <-----------
                    "properties": {
                      "inner_field": "TYPE",
                      ...
                    }
                  },
            `}
          />
          <h5>Specific Example of author and company</h5>
          <textarea
            rows={23}
            defaultValue={`
              PUT blogs_example
              {
                "mappings": {
                  "properties": {
                    "title": {
                      "type": "text"
                    },
                    "authors": {
                      "type": "nested",
                      "properties": {
                        "name": {
                          "type": "text"
                        },
                        "company": {
                          "type": "keyword"
                        }
                      }
                    }
                  }
                }
              }
            `}
          />
        </div>
        <div className="exam-objective">
          <h3>** NESTED QUERY Properly query a nested object</h3>
          <br /> you have to add a outer nested query outside the query
          <br /> query-->nested->path : author
          <textarea
            rows={27}
            defaultValue={`
                GET blogs_example/_search
                  {
                    "query": {
                      "nested": {
                        "path": "authors",
                        "query": {
                          "bool": {
                            "must": [
                              {
                                "match": {
                                  "authors.name": "alex"
                                }
                              },
                              {
                                "match": {
                                  "authors.company": "Elastic"
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  }
          `}
          />
        </div>
        <div className="subtopic">
          <h3>NESTED AGGREGATION</h3>
          <br /> you have to add a outer wrapper aggregation to specify the
          nested field you're aggregating on
          <br /> aggs-->nested->path : author, aggs...
          <textarea
            rows={28}
            defaultValue={`
            GET blogs_example/_search
            {
              "size": 0,
              "aggs": {
                "nested_authors": {
                  "nested": {
                    "path": "authors"
                  },
                  "aggs": {
                    "companies": {
                      "terms": {
                        "field": "authors.company.keyword"
                      },
                      "aggs": {
                        "authors": {
                          "terms": {
                            "field": "authors.name.keyword"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How to change the mapping for nested properties?
          </div>
          <div className="answer">
            Change the field type to nested in index mapping propertoes.
            properties: --> author --> type: "nested", properties: {}
          </div>
        </div>

        <div className="pair">
          <div className="question">
            If you wanna improve your mapping by changing a object field to a
            nested field, why wouldnt you do that for all object fields?
          </div>
          <div className="answer">
            Only do it for the ones that are arrays, cause that's where the
            Lucene flatting causes the issue of bypassing a relationship. If
            there is only ever one object, the relationship is essentially
            perserved.
          </div>
        </div>

        <div className="Notes">
          <h3>Notes</h3>
          <h4>Problem</h4>
          If you search for author Alex and Company Elastic, it will return the
          blog with an author Chris from Elastic and Alex from Globex.
          <br />
          That is the bad "surprising" result.
          <br />
          when the JSON object got flattened (lucene internals), we lost the
          expected relationship between “name” and “company”
          <h4>Solution: The nested Data Type</h4>
          it allows arrays of objects to be indexed and queried independently of
          each other ‒ use nested if you need to maintain the relationship of
          each object in the array NESTED is on the exam, change the mapping of
          the index and requery the search the query ALSO has to specify that
          you are searching for a nested field
          <br />
          **Join is not on the exam
          <div>
            Notes: Limited support for nested data types like no Kibana
            Visualizations
          </div>
        </div>

        <div className="pair">
          <div className="question">join Data Type (Not on exam)</div>
          <div className="answer">
            Try to avoid this. It maintains a parent child relationship similar
            to normalized data in relational databases. Parent and Child
            documents have to be on the same Shard.
            <br />
            Use ca
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What is the use case for join Data Type?
          </div>
          <div className="answer">
            very frequent updates and are experiencing performance issues
            <br />
            Downside of nested is that updating an object requires a complete
            reindexing of the root object. So if you are doing frequent updates
            it might be worth using join instead of nested to avoid constant
            rewrites of the entire nested object just to change one nested field
            value.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What does use of join Data Type entail?
          </div>
          <div className="answer">
            the parent and children are completely separate documents. When
            parent updated, no need to reindex child.
            <br />
            Bad for query time.
            <img src={WhenToUseJoinDataType} alt="WhenToUseJoinDataType" />;
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• The nested type allows arrays of objects to be indexed and
          queried independently of each other
          <br />• Updating a nested object requires a complete reindexing of the
          root object AND all of its other nested objects
          <br />• The key benefit of a join datatype is the ability to modify a
          child object independently of the parent
          <br />• Avoid the join datatype
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              When would you use the nested datatype?
            </div>
            <div className="answer">
              when the field is an array of objects where the inner property
              groupings matter for searches
              <br />
              -->When you have array of objects and you need to query multiple
              fields of each array entry as an individual entity.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. Updating a nested inner object causes the root
              object and all other nested objects to be reindexed.
            </div>
            <div className="answer">
              True, just like any other object in Elasticsearch.{" "}
            </div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. The join datatype allows you to use Elasticsearch
              as a relational database
            </div>
            <div className="answer">
              FALSE No. Even though it provides a parent/child relationship, it
              is very limited if compared to RDMSs.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
