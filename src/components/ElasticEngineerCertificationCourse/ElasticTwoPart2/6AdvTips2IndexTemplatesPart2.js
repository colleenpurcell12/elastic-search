import React, { Component } from "react";
import MustacheConditionalQuery from "./images/MustacheConditionalQuery.png";
export default class AdvTips2 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 6 Elasticsearch Advanced Tips and Tricks: Aliases and Templates
        </h2>

        <h3>Index Templates</h3>
        <br />

        {/* <div>Lab 6.2</div> */}

        <div className="exam-objective">
          <h3>
            ** Define and use an index template for a given pattern that
            satisfies a given set of requirements
          </h3>

          <div className="pair">
            <div className="question">How to create a Index Template?</div>
            <div className="answer">
              <p>
                Use the _template endpoint to add, view and delete templates
              </p>

              <textarea
                rows={35}
                defaultValue={`
    GENERIC
    PUT _template/template_name
    {
      "index_patterns": "prefix_for_target_new_indices-*",
      "order": 1,
      "settings": {
        "number_of_shards": 4,
        "number_of_replicas": 1
      },
      "mappings": {
        "properties": {...}
      }
    }


    REAL EXAMPLE
    PUT _template/logs_template
    {
      "index_patterns": "logs-*",
      "order": 1,
      "settings": {
        "number_of_shards": 4,
        "number_of_replicas": 1
      },
      "mappings": {
        "properties": {
          "@timestamp": {
            "type": "date"
          }
        }
      }
    }
            `}
              />
            </div>
            <div className="pair">
              <div className="question">
                What kinds of properties can you set in an index template?
              </div>
              <div className="answer">
                SETTINGS like number of shards, # of repicas, and MAPPING all
                properties, like @timestamp which is a mapping property that can
                be applied to ALL indices
              </div>
            </div>
            <div className="pair">
              <div className="question">
                Can multiple templates be applied to a new index?
              </div>
              <div className="answer">
                yes multiple index templates could match the naming convention
                of a newly created index, in which case the releant templates
                would be applied in order, the subsequent templates overriding
                the prior ones
              </div>
            </div>

            <div className="pair">
              <div className="question">
                When creating a new index how are the settings/mappings
                determined?
              </div>
              <div className="answer">
                first default settings are applied, then the relevant templates,
                then the request body of the PUT request to create the index
                <br />
                -->Lastly, the settings/mappings that are explicitly innumerated
                in the PUT request to create the index are applied as the
                ultimate authority.
              </div>
            </div>

            <div className="pair">
              <div className="question">How to test an index template?</div>
              <div className="answer">
                <ul>
                  <li>
                    Step #1: create a index with a name that matches the index
                    pattern of the template
                    <textarea
                      rows={4}
                      defaultValue={`
       PUT logs-2017-12
            `}
                    />
                  </li>
                  <br />
                  <li>
                    Step #2 see that the settings/mapping of the newly created
                    index matches the template:
                    <textarea
                      rows={4}
                      defaultValue={`
       GET logs-2017-12
            `}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pair">
            <div className="question">
              How will the templates below be applied to a new index, named
              logs-2018-06?
              <textarea
                rows={28}
                defaultValue={`
    PUT _template/logs_template
      {
        "index_patterns": "logs-*",         <-- ARRAY?
        "order": 1,
        "settings": {
          "number_of_shards": 4,
          "number_of_replicas": 1
        },
        "mappings": {
          "properties": {
            "@timestamp": {
              "type": "date"
            }
          }
        }
      }

      PUT _template/logs_2018_template
      {
        "index_patterns": "logs-2018*",
        "order": 5,
        "settings": {
          "number_of_shards": 6,
          "number_of_replicas": 2
        }
      }

            `}
              />
              <br />
            </div>
            <div className="answer">
              The mapping is from the 1st template (cause the 2nd of order 5 has
              none), while the and the number_of_shards (primary) of 6 and
              number_of_replicas of 2 will be set from the 2nd template.
            </div>
          </div>
        </div>

        {/* <div className="pair">
          Define a template, stored at cluster level in cluster state, PUT
          _template
          <br /> to make sure it goes to a specific alias (missing in ex query
          below)
          <textarea
            rows={20}
            defaultValue={`
    PUT _template/logs_template
    {
      "index_patterns": "logs-*",
      "order": 1,
      "settings": {
        "number_of_shards": 4,
        "number_of_replicas": 1
      },
      "mappings": {
        "properties": {
          "@timestamp": {
            "type": "date"
          }
        }
      }
    }
            `}
          />
        </div> */}

        <br />

        {/* </div> */}
        <div className="summary">
          <h3> Summary </h3>
          <br />• Index templates allow you to define mappings and settings that
          will automatically be applied to newly-created indices
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              2. True or False. A template of order 1 overrides the settings of
              a template of order 5.
            </div>
            <div className="answer">
              FALSE goes in order, 1 is first and then 5 overrides earlier ones
            </div>
          </div>
        </div>

        <div style={{ display: "none" }}>
          <div className="Notes">
            <h3>Index Templates </h3>
            <h4>Use Case</h4>
            <p>
              Blue print for any new index that fits a criteria. Defines
              mappings and settings. Useful when you create another related
              index like monthly logs index
            </p>
          </div>
          <div className="Notes">
            <h3>Multiple Templates </h3>
            <p>
              It's like a class heirarchy of index instances. Multiple templates
              can be applied to subsets of newly generated templates. The
              template with the highest order #, overrides all prior templates.
            </p>
            <div className="pair">
              <div className="question">
                What are the steps for applying multi templates to a new index?
              </div>
              <div className="answer">
                <p>1) Default settings are applied</p>
                <p>
                  2) Then the list of relevant templates get applied in
                  order--starting with 1, to reset the default settings/mappings
                  .{" "}
                </p>
                <p>3) The next template gets applied, overriding the first.</p>
                <p>
                  4) Lastly, the settings/mappings that are explicitly
                  innumerated in the PUT request to create the index are applied
                  as the ultimate authority.
                </p>
              </div>
            </div>
            <div className="pair">
              <div className="question">Example of two templates</div>
              <div className="answer">
                <p>
                  Let's say the first template matches all log indices with
                  index pattern log-* (order 1).
                </p>
                <p>
                  Then the 2nd template matches all logs from 2018 with index
                  pattern log-2018* (with order 5).
                </p>
                <p>And you create a new index named logs-2018-06.</p>
                <p>
                  The mapping is from the 1st template, while the
                  number_of_replicas and the number_of_shards (primary) are set
                  by the 2nd template.
                </p>
              </div>
            </div>
            <div className="pair">
              Demo
              <textarea
                style={{ height: "190px", width: "750px" }}
                defaultValue={`
    PUT _template/jens_custom_template
    {
    "index_patterns": "is_jenslog*",
    "settings": {
      "number_of_shards": 3,
      "number_of_replicas": 3
    },
    "mappings": {
      "aliases": {
        "properties": {
          "firstName": {
            "type": "text"
          },
          "lastName": {
            "type": "text"
          }
        }
      }
    }
  }


  then test it out like on EXAM
  PUT jenslogstest
  GET jenslogstest/_mapping
  GET jenslogstest
            `}
              />
            </div>

            <div className="pair">
              Multiple Templates
              <br /> when new templates are created, “order” value to control
              the merging process
              <br /> default settings: {`GET blogs?include_defaults=true`}
              <br /> it will go from lowest order first, precedence
              <br /> Settings and mappings from the lowest “order” template are
              applied
              <textarea
                style={{ height: "190px", width: "750px" }}
                defaultValue={`
    PUT _template/logs_2018_template
    {
      "index_patterns": "logs-2018*",
      "order": 5,
      "settings": {
        "number_of_shards": 6,
        "number_of_replicas": 2
      }
    }
            `}
              />
              <br /> 2nd template
            </div>
          </div>
        </div>
      </div>
    );
  }
}
