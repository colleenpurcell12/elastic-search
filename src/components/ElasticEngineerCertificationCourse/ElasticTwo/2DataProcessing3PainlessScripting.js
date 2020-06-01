import React, { Component } from "react";
import PainlessScriptAcessFieldContext from "./images/PainlessScriptAcessFieldContext.png";

export default class DataProcessing3PainlessScripting extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Mode 2 Data Processing Part 3: Painless Scripting</h2>
        <div className="Notes">
          <h5>Ingesting through Logstash or through Elastic</h5>
          <br />
          {/* <div>slide 134</div> */}
        </div>
        <div className="exam-objective">
          <h3>
            ** Define and use an ingest pipeline that satisfies a given set of
            requirements, including the use of Painless to modify documents
          </h3>
          <div className="pair">
            <div className="question">
              What are the two ways to run a script?
            </div>
            <div className="answer">inline or stored, examples here:</div>
            <textarea
              rows={37}
              defaultValue={`
      STORED: define it and then use it
      1) STORE SCRIPT with name --> id
      POST _scripts/add_new_views
      {
        "script": {
          "source": "ctx._source['number_of_views'] += params['new_views']"
        }
      }

      
      2) USE STORED SCRIPT IN DOC UPDATE
      POST my_index/_update/1
      {
        "script": {
          "id": "add_new_views",
          "params": {
            "new_views": 2
          }
        }
      }


      INLINE
      DEFINE A SCRIPT INLINE AND USE IT TO UPDATE A DOC IN AN INDEX ALL AT ONCE
      POST my_index/_update/1
      {
        "script": {
          "source": "ctx._source['number_of_views'] += params['new_views']"
        },
        "params": {
          "new_views": 2
        }
      }
            `}
            />
          </div>
        </div>
        <div className="Notes">
          <h3>Notes</h3>
          <p>
            Example exam question: how do you to create the script, add to
            pipeline, and add control flow (if)
          </p>
          <div className="pair">
            <div className="question">
              Examples of Accessing a field using a script?
            </div>
            <div className="answer">
              For updates {`ctx._source['field_name']`} and fot Ingest node
              accessing fields using ctx {`ctx['field_name']`}
            </div>
            <img
              src={PainlessScriptAcessFieldContext}
              alt="PainlessScriptAcessFieldContext"
            />
          </div>
          <div className="pair">
            <div className="question">
              How do you use a painless script for reindex?
            </div>
            <div className="answer">
              You can add the processor to the pipeline. Then you use the
              _reindex API and after adding destination index, then specify the
              pipeline used.
            </div>
            <textarea
              rows={13}
              defaultValue={`
          
    POST _reindex
    {
      "source": {
        "index": "source"
      },
      "dest": {
        "index": "dest",
        "pipeline": "some_ingest_pipeline"
      }
    }
            `}
            />
          </div>

          <div className="pair">
            <div className="question">Script Caching</div>
            <div className="answer">
              For a new script, Elastic saves up to 100 compiled scripts,
              expensive
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How can you config settings for cached scripts?
            </div>
            <div className="answer">
              configurable using script.cache.max_size. Or set a timeout using
              script.cache.expire
            </div>
          </div>
          <div className="pair">
            <div className="question">
              For similar scripts, how to avoid saving both separately?
            </div>
            <div className="answer">
              Use parameters to DRY up your scripts {`params['new_views']`}
            </div>
          </div>
          <div className="pair">
            *Dont try and use auto complete or auto indent with scripts
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3> <br />• Painless is a scripting language designed
          specifically for use with Elasticsearch <br />• Painless scripts can
          be defined inline or stored in the cluster <br />• The first time
          Elasticsearch sees a new script, it compiles it and stores the
          compiled version in a cache
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False. The Painless scripting language was developed
              just for Elasticsearch.
            </div>
            <div className="answer">true</div>
          </div>
          <div className="pair">
            <div className="question">
              2. Name two different painless contexts and explain their
              differences.
            </div>
            <div className="answer">
              ingest and updates, use ctx._source to refer to field names in the
              update cpontext
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False. The use of parameters, when executing scripts,
              is considered a best practice.
            </div>
            <div className="answer">true</div>
          </div>
        </div>
      </div>
    );
  }
}
