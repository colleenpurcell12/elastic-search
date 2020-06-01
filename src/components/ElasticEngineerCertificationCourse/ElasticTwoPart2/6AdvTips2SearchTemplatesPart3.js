import React, { Component } from "react";
import MustacheConditionalQuery from "./images/MustacheConditionalQuery.png";
export default class AdvTips2SearchTemplatesPart3 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 6 Elasticsearch Advanced Tips and Tricks: Aliases and Templates
        </h2>

        <h3>Search Templates</h3>
        <br />
        <div className="exam-objective">
          <h3>** Define and use a search template</h3>
          <h4>really good example in the 7.6 Elastic documentation</h4>
          <div className="pair">
            <div className="question">
              Explain how you define a search template.
            </div>
            <div className="answer">
              HIGH LEVEL Use the _script API to name your new stored search
              template. Specify the script with a lang (always mustache) and a
              source which is the query just as you'd otherwise write it. Any
              params are wrapped in double curly braces.
            </div>
          </div>

          <div className="pair">
            <div className="question">Create a search template?</div>
            <div className="answer">
              <p>use the _scripts endpoint to save a search template</p>

              <textarea
                rows={15}
                defaultValue={`
    PUT _scripts/my_search_template
    {
      "script": {
        "lang": "mustache",
        "source": {
          "query": {
            "match": {
              "{{my_field}}": "{{my_value}}"
            }
          }
        }
      }
    }
            `}
              />
            </div>
          </div>
          <div className="question">Explain how you use a search template.</div>
          <div className="answer">
            HIGH LEVEL Do GET index/_search as normal, then add /template and in
            the request body, refer to the stored script by id and provide any
            params needed.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How do you USE a search template for querying?
          </div>
          <div className="answer">
            <p>use the _scripts endpoint to save a search template</p>

            <textarea
              rows={12}
              defaultValue={`
    GET blogs/_search/template
    {
      "id": "my_search_template",
      "params": {
        "my_field": "title",
        "my_value": "shard"
      }
    }
            `}
            />
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Example of a search template and the query that employs it?
          </div>
          <div className="answer">
            <textarea
              rows={40}
              defaultValue={`

    PUT _scripts/daily_hits
    {
      "script": {
        "lang": "mustache",
        "source": {
          "query": {
            "bool": {
              "filter": [
                {
                  "range": {
                    "@timestamp": {
                      "gte": "{{start_date}}",
                      "lt": "{{end_date}}"
                    }
                  }
                },
                {
                  "match": {
                    "originalUrl.keyword": "{{url}}"
                  }
                }
              ]
            }
          }
        }
      }
    }

    GET blog/_search/template
    {
      "id": "template3",
      "params": {
        "start_date": "2017-08-11",
        "end_date": "2017-08-12",
        "url": "/blog/brewing-in-beats-postgresql-module-in-filebeat"
      }
    }
            `}
            />
          </div>
        </div>
        <div className="pair">
          <div className="question">How to do a conditional with mustache?</div>
          <div className="answer">
            <p>
              cant use if/else, but can use {`{{#param}} `}and {`{{/param}}`},
              MAKE SURE to wrap the query in three double quotes!!
            </p>
            <textarea
              rows={37}
              defaultValue={`
    {{#param1}}
      "This section is skipped if param1 is null or false"
    {{/param1}}


    PUT _scripts/template3
    {
      "script": {
        "lang": "mustache",
        "source": {
          "query": {
            "bool": {
              "filter": [
                {
                  "range": {
                    "@timestamp": {
                      {{#end_date}}                     <---------
                      "lt": "{{end_date}}",
                      {{/end_date}}
                      "gte": "{{start_date}}"            <---------
                    
                    }
                  }
                },
                {
                  "match": {
                    "originalUrl.keyword": "{{url}}"
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

            <img
              src={MustacheConditionalQuery}
              alt="MustacheConditionalQuery"
            />
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• Search templates allow you to define a query with parameters
          that can be defined at execution time
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              3. Why would you use search templates?
            </div>
            <div className="answer">
              cleaner code, long queries, reuse code, less typing
            </div>
          </div>
          <br />
        </div>
        <div className="Notes">
          <h3>Search Templates </h3>
          <p>
            Use case: have some commmonly used long queries where only a couple
            values ever change
            <br />
            to DRY up code, use a search template with some query parameters
            <br />
            benefits: easier to share, avoid repetition, easier to read/test,
            user friendly
          </p>
        </div>
      </div>
    );
  }
}
