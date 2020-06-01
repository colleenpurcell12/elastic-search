import React, { Component } from "react";
export default class AdvTips2 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 6 Elasticsearch Advanced Tips and Tricks: Aliases and Templates
        </h2>

        <h3>Index Aliases</h3>

        <br />

        {/* <div>Lab 6.2</div> */}
        <div className="exam-objective">
          <h3>** Define and use index aliasess</h3>
          <div className="pair">
            <div className="question">
              How to create an Index Aliases? Implementation ON THE EXAM
            </div>
            <div className="answer">
              Use the _aliases endpoint to add an alias relationship between
              nick name and real/"government" name
            </div>

            <textarea
              rows={28}
              defaultValue={`
    GENERIC
    POST _aliases
    {
      "actions": [
        {
          "add": {
            "index": "blogs_v1_feb_2020_index",
            "alias": "consistent_nick_name_of_data"
          }
        }
      ]
    }
    
    EXAMPLE
    POST _aliases
    {
      "actions": [
        {
          "add": {
            "index": "blogs_v1",
            "alias": "blogs"
          }
        }
      ]
    }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to update the alias to point to a NEW index?
            </div>
            <div className="answer">
              in the POST _aliases API's request body actions property, have
              both ADD and a REMOVE to swap out next time series data of blogs
              or tickets or logs etc
            </div>

            <textarea
              rows={42}
              defaultValue={`
            
    POST _aliases
    {
      "actions": [
        {
          "add": {
            "index": "INDEX_NAME",
            "alias": "ALIAS_NAME"
          }
        },
        {
          "remove": {
            "index": "INDEX_NAME",
            "alias": "ALIAS_NAME"
          }
        }
      ]
    }


    then it's time to upgrade to v2

    POST _aliases
    {
      "actions": [
        {
          "add": {
            "index": "blogs_v2",
            "alias": "blogs"
          }
        },
        {
          "remove": {
            "index": "blogs_v1",
            "alias": "blogs"
          }
        }
      ]
    }

            `}
            />
          </div>

          <div className="pair">
            <div className="question">
              How do create a filtered Index Alias?
            </div>
            <div className="answer">
              If you wanna alias of the blogs index, to point only to the
              engineering blogs see below <br />
              <code>{`POST _alias {actions add: index X, alias Z, "filter" {}}`}</code>
            </div>

            <textarea
              rows={20}
              defaultValue={`
    POST _aliases
    {
      "actions": [
        {
          "add": {
            "index": "blogs_v1",
            "alias": "blogs_engineering",
            "filter": {
              "match": {
                "category": "Engineering"
              }
            }
          }
        }
      ]
    }
            `}
            />
          </div>
        </div>

        <div>
          <div className="pair">
            <div className="question">
              How do you add an alias--what's the endpoint called and what type
              of CRUD operation is it?
            </div>
            <div className="answer">
              _aliases PLURAL and POST (perform an action, instead of update
              information)
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Can you point multiple indices to the same alias?
            </div>
            <div className="answer">
              YES but only one of them can be the write index behind the alias
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to set the index that the alias writes to?
            </div>
            <div className="answer">
              with the <code>is_write_index</code> property of the add action in
              the request body
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to swap out a new write index for an alias?
            </div>
            <div className="answer">
              REMEMBER to set prior write index setting to false, if you wanna
              swap it out for a new write index
              <textarea
                rows={22}
                defaultValue={`
    POST _aliases
    {
      "actions": [
        {
          "add": {
            "index": "logs_server4",
            "alias": "access_logs",
            "is_write_index": true
          }
        },
        {
          "add": {
            "index": "logs_server3",
            "alias": "access_logs",
            "is_write_index": false
          }
        }
      ]
    }

            `}
              />
            </div>
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />
          •The Index Aliases API allows you to define an alias for an index
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False. It is mandatory to use aliases for all of your
              production indices.
            </div>
            <div className="answer">FALSE but advisable</div>
          </div>
        </div>
        <br />

        {/* </div> */}
        <div style={{ display: "none" }}>
          <div className="Notes">
            <h3>Notes</h3>
            <h3>Index Aliases </h3>
            <h4>Index Aliases Use Case</h4>
            <p>
              Ex #1: if you wanna update your index to a new version (from v1 to
              v2), you dont wanna have to bring down the application, to update
              it and point to the new index, then redeploy. Instead you could
              just change the pointer to the new index, under the hood and spare
              everyone the manual "repointing" process.
            </p>
            <p>
              Ex #2 from American Airlines: when you have various environments,
              lower like QA and dev should all point to the same index of the
              blogs index
            </p>
          </div>
          <div>
            ORIGINAL CLASS NOTES
            <div className="pair">
              <div className="question">How to set up index alias? ON EXAM</div>
              <div className="answer">
                LOOK AT JENN's kibana search notes query match _id jennstest, or
                query host: server 6
              </div>
            </div>
            <div className="pair">
              <div className="question">
                Why would you want a bool with a must match for elastic training
                and a should for elastic training?
              </div>
              <div className="answer">
                to boost score of the exact phrase match
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
