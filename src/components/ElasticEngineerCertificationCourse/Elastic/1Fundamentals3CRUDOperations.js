import React, { Component } from "react";

export default class Fundamentals3CRUDOperations extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 1 Fundamentals: Lesson 1.3 CRUD Operations</h2>
        <div className="exam-sub-topic">
          <h3>Define an index that satisfies a given set of requirements</h3>
        </div>
        <div className="exam-sub-topic">
          <h3>
            ** Perform index, create, read, update, and delete operations on the
            documents of an index.
          </h3>
          <h3>» Docs » REST APIs » Document APIs</h3>
          <br />
          <div>
            HARD PARTS: know when to use _doc, _create, _update, how to do _mget
            and _bulk, and DELETE requests
          </div>
          <br />
          <div>
            <b>SUMMARY 1:</b> add a document with index/_doc with either a POST
            or a PUT with or without an id. <br />
            <br />
            If you do a _doc PUT with an id of a document that already exists,
            then it will be overridden and the response will say updated instead
            of created.
            <br />
            <br />
            <b>_create v _update:</b> If you want to make sure you arent
            overwriting anything use the _create endpoint instead of the _doc
            endpoint. If you simply want to update a doc, use the _update
            endpoint.
            <br />
            <br />
          </div>
          <div className="pair">
            <div className="question">How do you index a document?</div>
            <div className="answer">with a PUT or POST</div>
            <textarea
              rows={14}
              defaultValue={`
    PUT my_blogs/_doc/1 
    {
      "title": "Elastics v7.7 released",
      "author": "Clinton Gormley"
    }

    POST my_blogs/_update/1
    {
      "doc": {
        "date": "Sept 26, 2016"
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How do you ensure the new doc wont overwrite a prior one if
              there's an id collision?
            </div>
            <div className="answer">use _create instead of _doc</div>
            <textarea
              rows={8}
              defaultValue={`
    PUT my_blogs/_doc/1         ---->     PUT my_blogs/_create/1
    {
      "title": "Elastics v7.7 released",
      "author": "Clinton Gormley"
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How do you add another field to an existing document?
            </div>
            <div className="answer">the _update endpoint</div>
            <textarea
              rows={9}
              defaultValue={`
    POST my_blogs/_update/1
    {
      "doc": {
        "date": "September 26, 2016"
      }
    }
    `}
            />
          </div>
          <div className="pair">
            <div className="question">How do you delete a document?</div>
            <div className="answer">
              the DELETE request with the _doc endpoint
            </div>
            <textarea
              rows={3}
              defaultValue={`
    DELETE my_blogs/_doc/1
    `}
            />
          </div>
          <br />
          <br />
          <div>
            <b>SUMMARY 2:</b> _bulk API is written: POST index_name/_bulk and
            then has pairs of objects as the request params 1) first one
            specifies the action (ie index, updates, delete) and doc id, 2) and
            the 2nd line is the request body
          </div>
          <div className="pair">
            <div className="question">How do to bulk requests?</div>
            <div className="answer">
              Using the _bulk API, you can perform multiple CRUD actions with a
              POST index_name/_bulk and a bunch of pairs of lines of code. Order
              not gaurenteed, and the failure of one will not impact the rest.
            </div>
            <textarea
              rows={10}
              defaultValue={`
    POST comments/_bulk
    {"index" : {"_id":3}}               <--- doc id (_id)
    {"title": "Metricbeat"}
    {"index" : {"_id":4}}
    {"title": "Elastic Stack 6.1.0 Released", "category": "Releases"}
    {"index" : {"_id":5}}
    {"title": "Searching for needle in", "category": "User Stories"}
    {"update" : {"_id":5}}
              `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How do a _bulk request on MULTIPLE INDICES?
            </div>
            <div className="answer">
              in addition to specifying the id of the doc you wanna change/add,
              specify the index name
            </div>
            <textarea
              rows={9}
              defaultValue={`
  POST _bulk
  { "delete" : { "_index" : "second_index", "_id" : "2" } }        <--- specifies index name
  { "create" : { "_index" : "first_index", "_id" : "3" } }
  { "field1" : "value3" }
  { "update" : {"_id" : "1", "_index" : "second_index"} }
  { "doc" : { "field2" : "value2"} }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">How do you get a document?</div>
            <textarea
              rows={3}
              defaultValue={`
    GET my_blogs/_doc/1
              `}
            />
          </div>
          <div className="pair">
            <div className="question">Multi GET: how do you use _mget?</div>
            <div className="answer">
              You can fetch multiple documents in one request, specify the index
              name in the GET request endpoint and then just have docs request
              body be a list of doc id objects
            </div>
            <textarea
              rows={10}
              defaultValue={`
   GET my_blogs/_mget
    {
      "docs": [
        {"_id":2},
        {"_id":3}
      ]
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              _mget for multipl documents on different indices?
            </div>
            <div className="answer">
              from different indices, specify the _index name in the doc objects
              listed
            </div>
            <textarea
              rows={15}
              defaultValue={`
    GET _mget
    {
      "docs": [
        {
          "_index": "comments",
          "_id": 3
        },
        {
          "_index": "blogs",
          "_id": "F1oSq2EBOOytT5ZTHpaE"
        }
      ]
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What happens when you EXCLUDE an ID when indexing a doc?
            </div>
            <div className="answer">
              Elastic auto generates an id for you, which is a good practice. It
              speeds up querying by id cause Elastic gives the doc an
              autogenerated id anyways, so when you search by the id you
              selected, it first does an extra step to translate the chosen id
              into the auto generated id.
            </div>
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br /> • A document is a serialized JSON object that is stored in
          Elasticsearch under a unique ID <br /> • An index in Elasticsearch is
          a logical way of grouping data <br /> • The Bulk API makes it possible
          to perform many write operations in a single API call, greatly
          increases the indexing speed
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False: If an index does not exist when indexing a
              document, Elasticsearch will automatically create the index for
              you.
            </div>
            <div className="answer">
              TRUE unless you set auto_create_index to false (in Elastic II
              Section 6)
            </div>
          </div>

          <div className="pair">
            <div className="question">
              2. What happens if you index a document and the _id already exists
              in the index?
            </div>
            <div className="answer">
              if you are using the _create API, it will fail. If you are using
              _doc, it will overwrite the other doc.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: Using the Bulk API is more efficient than
              sending multiple, separate requests.
            </div>
            <div className="answer">True</div>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <div className="pair">
  <div className="question">Describe Bulk insert</div>
  <div className="answer">
    API, Syntax each command appears on a single line and “index” action is
    followed by the document (on a single line), order not gaurenteed, ‒ the
    failure of a single action does not affect the remaining actions
  </div>
  <textarea
    rows={12}
    defaultValue={`
    POST comments/_bulk
    {"index" : {"_id":3}}
    {"title": "Tuning Go Apps with Metricbeat", "category": "Engineering"}
    {"index" : {"_id":4}}
    {"title": "Elastic Stack 6.1.0 Released", "category": "Releases"}
    {"index" : {"_id":5}}
    {"title": "Searching for needle in", "category": "User Stories"}
    {"update" : {"_id":5}}
              `}
  />
</div>; */
}
