import React, { Component } from "react";

export default class DataProcess2IngestNodesAndPipelines extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Mode 2 Data Processing Part 2: Ingest Nodes and Pipelines</h2>

        <div className="exam-objective">
          <h3>
            ** Define and use an ingest pipeline that satisfies a given set of
            requirements, including the use of Painless to modify documents
          </h3>

          <div className="pair">
            Questions for memorization/review:
            <br />
            "Exam: Create a processor that does XYZ" I would know split, script
            and possibly even one that will allow you to work with arrays and
            loop through them FOREACH. HINT
          </div>
          <div className="pair">
            <div className="question">
              What are the 3 ways you can use ingest pipelines?
            </div>
            <div className="answer">
              1) in an _update_by_query, 2) in a reindex, 3) indexing a new
              document, 4) or in the settings of an index
            </div>
            <textarea
              rows={20}
              defaultValue={`
    1) POST blogs_fixed/_update_by_query?pipeline=underscore_locales

    2) 
    POST _reindex
    {
      "source": {
        "index": "my_index"
      },
      "dest": {
        "index": "new_index",
        "pipeline": "my_pipeline"
      }
    }

    3) 
    PUT my_index/_doc/1?pipeline=my_pipeline
    {
      "author": "Monica Sarbu",
      "category": "Brewing in Beats"
    }

    4)
    PUT my_index
    {
      "settings": {
        "default_pipeline": "my_pipeline"
      }
    }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to create a pipeline to update all documents so that the
              locals array items go from en-en to en_en?
            </div>
            <div className="answer">
              MAKE sure if you are using the forEach processor, with a nested
              processor, the field is _ingest._value!!
            </div>
            <textarea
              rows={26}
              defaultValue={`
          
    PUT _ingest/pipeline/underscore_locales1
    {
      "description" : "inner pipeline",
      "processors" : [
        {
          "foreach" : {
            "field" : "locales",
            "processor" : {
              "gsub": {
                "field": "_ingest._value",
                "pattern": "-",
                "replacement": "_"
              }
            }
          }
        },
        {
          "set" : {
            "field": "reindexBatch",
            "value": "4"
          }
        }
      ]
    }
            `}
            />
          </div>

          <div className="Notes">
            <h3>Notes</h3>
            <h5>Ingesting through Logstash or through Elastic</h5>
            <br />
            <h5>Ingest Nodes</h5>
            Pull data from docs Elaborate processors, tons of options An ingest
            node is designated, machine isnt shared so it doesnt block other
            actions cause it's processing intensive.
            <br />
            <h5>Pipeline</h5>
            Pipeline processors EXAM
            <a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.6/ingest-processors.html">
              Link
            </a>
            Remove processor to remove a field with a specific value, split and
            set and trim processor, forEach processor uses Gsub processor, Grok
            is another important one that uses RegEx. Exam expects you to pick
            one so GET familiar "Exma: Create a processor that does XYZ"
            <div>Put in a processor into our _ingest API</div>
            <textarea
              style={{ height: "190px", width: "750px" }}
              defaultValue={`
              PUT _ingest/pipeline/my-pipeline-id
              {
                "description": "DESCRIPTION",
                "processors": [
                  {}
                ],
                "on_failure": [
                  {}
                ]
              }
            `}
            />
            <div>Set processor takes field and value to give</div>
            <textarea
              style={{ height: "190px", width: "750px" }}
              defaultValue={`
            PUT _ingest/pipeline/my_pipeline
              {
                "processors": [
                  {
                    "set": {
                      "field": "number_of_views",
                      "value": 0
                    }
                  }
                ]
              }
            `}
            />
            <div>
              Use _simulate endpoint to test the pipeline. Lke a GET request, it
              will show you what it will do to the docs.
            </div>
            <textarea
              style={{ height: "190px", width: "750px" }}
              defaultValue={`
            POST _ingest/pipeline/my_pipeline/_simulate
            {
              "docs": [
                {
                  "_source": {
                    "author": "Shay Banon",
                    "blog_title": "You know, for Search!"
                  }
                }
              ]
            }
            `}
            />
            <div>
              Use a pipeline when indexing new documents
              <br /> Reindexing use processor, like split things into an array
              <br />
              Split processor like the JavaScript method
              <br />
              Pipeline can have multiple processors
            </div>
            <br />
          </div>
        </div>
        <div>Demo: </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              True or False. Given a document, processors are executed in
              parallel.
            </div>
            <div className="answer">False, sequentially, in order</div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. Pipelines can be reused by other pipelines.{" "}
            </div>
            <div className="answer">True</div>
          </div>
          <div className="pair">
            <div className="question">
              What does the following configuration do?{" "}
            </div>

            <textarea
              style={{ height: "190px", width: "750px" }}
              defaultValue={`
            PUT blogs_fixed
              {
                "settings": {
                  "default_pipeline": "blogs_pipeline"
                }
              }
            `}
            />
            <div className="answer">
              Setting default pipeline for new documents being indexed.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Comparing to Logstash. can you connect to other resources such as
              database in pipeline/processors?
            </div>
            <div className="answer">
              In logstash can send copy to Hadoop or elsewhere, ElasticSearch
              pipelines have less options and just remain in the cluster.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
