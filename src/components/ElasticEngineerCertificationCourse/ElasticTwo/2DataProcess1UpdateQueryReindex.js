import React, { Component } from "react";

export default class DataProcess1UpdateQueryReindex extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 2 Data Processing Part 1: Update and Delete by Query and
          Reindex APIs
        </h2>
        <div className="exam-objective">
          <h3>
            ** Use the Reindex API and Update By Query API to reindex and/or
            update documents
          </h3>
        </div>
        <div className="pair">
          Questions for memorization/review: if you wanna search an index on a
          field it doesnt have, what are the steps? how to track which docs have
          been reindexes if it fails along the way, what does it mean for an
          index to be closed
        </div>
        <div className="pair">
          <div className="question">
            How do you edit the documents with a update by query?
          </div>
          <div className="answer">
            in addition to a query in the body request, add a script property
            with the painless code like ctx._source['fieldName']=setToThisValue
          </div>
        </div>
        <div className="Notes">
          <h3>Notes</h3>
          <h3>Reindex API</h3>
          <br />
          At a point in time
          <br />
          All the prior docs that lack the field company
          <br /> Reindex every single document and reprocess them as if you just
          created the index
          <br />
          Multi fields, languages, settings mapping all gets reattached to the
          documents <br />
          Why not just change original index's mapping? Adding a new field to a
          mapping will only impact documents going forward <br />
          From DES destination --> to a SOURCE source, usually to a new index
          like blogs_updated.
          <br />
          Keeps a copy of all your old documents in the old index
        </div>
        <div className="pair">
          <div className="question">How to do a Reindex?</div>
          <div className="answer">you transfer it to a new index name</div>
          <textarea
            rows={11}
            defaultValue={`
              POST _reindex
                {
                  "source": {
                    "index": "blogs"
                  },
                  "dest": {
                    "index": "blogs_fixed"
                  }
                }
            `}
          />
        </div>
        <div className="pair">
          <div className="question">Why would you close an index?</div>
          <div className="answer">
            To change the analysis settings while you cant index or query
            documents
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How you'd customize a Reindex for only a subset of documents?
          </div>
          <div className="answer">
            Add a query to it and a max_docs to take up less resources during an
            update. Default batch size is 1000.
          </div>
          <textarea
            rows={18}
            defaultValue={`
            POST _reindex
              {
                "max_docs": 100,
                "source": {
                  "index": "blogs",
                  "query": {
                    "match": {
                      "category": "Engineering"
                    }
                  }
                },
                "dest": {
                  "index": "blogs_fixed"
                }
              }
            `}
          />
        </div>
        {/* <div>
          Notes: Update by Query, reindex in place. Change an existing index.
        </div> */}
        <div className="pair">
          <div className="question">What is the _update_by_query for?</div>
          <div className="answer">
            You can change the type of a field in the index mappings, or add
            field (multi-field).
            <br />
            Reindex "in place"
            <br />
            Downside versus Reindex: update by query has no record of the old
            version. No history.
          </div>
          <textarea
            rows={13}
            defaultValue={`
            POST blogs_fixed/_update_by_query
              {
                "query": {
                  "match": {
                    "category.keyword": ""
                  }
                },
                "script": {
                  "source": """ctx._source['category'] ="None""
                }
              }
            `}
          />
        </div>
        <div className="pair">
          <div className="question">
            What's the main difference btween Reindex and update by query?
          </div>
          <div className="answer">
            Reindex provides a old copy, update by query does not.
          </div>
        </div>
        <div className="pair">
          <div className="question">When to use PUT versus POST</div>
          <div className="answer">
            Post an action and PUT is for putting something in.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            * What if you wanna search for a new multi field?
          </div>
          <div className="answer">
            1) update index mapping to add it
            <br />
            2) then use an update by query to populate the new field
            <br />
            3) query on it <br />
            First update the mapping with a PUT. Then POST an update by query so
            all the documents have the new multi field. ONLY THEN you can do the
            search on the new multi field.
          </div>
          <textarea
            rows={30}
            defaultValue={`
            PUT blogs_fixed/_mapping
              {
                "properties": {
                  "content": {
                    "type": "text",
                    "fields": {
                      "english": {
                        "type": "text",
                        "analyzer": "english"
                      }
                    }
                  }
                }
              }
            
            GET REQUEST HERE WONT RETURN RESULTS ON NEW MULTI FIELD

            POST blogs_fixed/_update_by_query

            GET blogs_fixed/_search
              {
                "query": {
                  "match": {
                    "content.english": "performance tips"
                  }
                }
              }
            `}
          />
        </div>
        <div className="pair">
          <div className="question">Delete by Query</div>
          <div className="answer">Batch delete</div>
          <textarea
            rows={10}
            defaultValue={`
            POST blogs_fixed/_delete_by_query
              {
                "query": {
                  "match": {
                    "author.keyword": "Clinton Gormley"
                  }
                }
              }
            `}
          />
        </div>
        <div className="pair">
          <div className="question">Batch Field</div>
          <div className="answer">
            Helps track where in the reindex the update fails. So when it fails,
            all the documents with the updateBatch # had the sucessful update
            done. All docs without the new field didnt get changed yet so we can
            try to change them again. EXAM
          </div>
          <textarea
            rows={17}
            defaultValue={`
    POST blogs_fixed/_update_by_query
    {
      "query": {
        "range": {
          "updateBatch": {
            "lt": 1
          }
        }
      },
      "script": {
        "source": "ctx._source['updateBatch']=1"
      }
    }

            `}
          />
        </div>
        <div className="pair">
          <div className="question">Throttling options with Reindex</div>
          <div className="answer">
            Requests per second query param {`?requests_per_second=500`} default
            disabled value is -1, can reduce the resources occupied by a reindex
          </div>
          <textarea
            rows={12}
            defaultValue={`
            POST _reindex?requests_per_second=500
            {
              "source": {
                "index": "blogs",
                "size": 500
              },
              "dest": {
                "index": "blogs_fixed"
              }
            }

            `}
          />
        </div>
        <div className="pair">
          <div className="question">Slicing</div>
          <div className="answer">
            For 5 slices, it will take # of docs and divide by 5 sfor the amount
            at a time. Also parralleize. {`?slices=5`}
          </div>
          <textarea
            rows={12}
            defaultValue={`
            POST _reindex?slices=5
            {
              "source": {
                "index": "blogs",
                "size": 500
              },
              "dest": {
                "index": "blogs_fixed"
              }
            }

            `}
          />
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br /> • You can copy documents from one index to another using the
          Reindex API
          <br />
          The Update By Query and the Delete by Query API allows you to update
          or delete a collection of documents <br />• Make sure you track the
          reindex or update process so you don't need to start from scratch in
          case of failures <br />• Throttling reduces the impact of reindexing a
          large number of documents Quiz
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False. In a _reindex request, you can add a query
              clause to only reindex a sub-set of the documents.
            </div>
            <div className="answer">TRUE</div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False. In case of failures, both the _reindex and the
              update_by_query APIs will resume from the last document.
            </div>
            <div className="answer">
              FALSE gonna use batch update fields to tag the documents
              <br />
              They will resume from start. You should keep track of the
              execution using either a reindex_batch field or sorting by a
              unique value.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3.What happens to documents that are indexed after an
              _update_by_query started? Do the _reindex and the _delete_by_query
              APIs have the same behavior?
            </div>
            <div className="answer">
              Nothing, it is a "point-in-time" copy. All the above APIs only
              work with the documents that existed at the time that the request
              started.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
