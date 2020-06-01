import React, { Component } from "react";

export default class AdvTips2 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 6 Elasticsearch Advanced Tips and Tricks Part 3: Controlling
          Dynamic Behaviors
        </h2>
        <h3>
          Disabling Dynamic Indices, Dynamic Templates, Controlling Dynamic
          Fields
        </h3>
        {/* <div>Lab 6.3</div> */}
        <div className="exam-objective">
          <h3>
            ** Define and use a dynamic template that satisfies a given set of
            requirements
          </h3>
          {/* slide 414 */}

          <div className="pair">
            <div className="question">Example dynamic mapping rules</div>
            <div className="answer">
              <ul>
                <li>
                  or field type matching like mapping type string to keyword
                  only, instead of inefficient default of type text
                </li>
                <textarea
                  rows={17}
                  defaultValue={`
    PUT test
    {
      "mappings": {
        "dynamic_templates": [
          {
            "my_string_fields": {
              "match_mapping_type": "string",
              "mapping": {
                "type": "keyword"
              }
            }
          }
        ]
      }
    }
            `}
                />
                <br />
                <li>
                  {" "}
                  field name matching pattern like fields starting with f_ get
                  mapping to data type float (instead of long)
                </li>
                <textarea
                  rows={19}
                  defaultValue={`
    PUT test2
    {
      "mappings": {
        "dynamic_templates": [
          {
            "my_float_fields": {
              "match": "f_*",
                "mapping": {
                  "type": "float"
              }
            }
          }
        ]
      }
    }
            
          
            `}
                />
              </ul>
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to prevent documents with unmapped fields from being indexed?
            </div>
            <div className="answer">
              set <code> dynamic: strict</code>
            </div>
            <textarea
              rows={12}
              defaultValue={`
    PUT surveys2
    {
      "mappings": {
        "dynamic": "strict",
        "properties": {
          "feedback": {"type": "text"},
          "course_rating": {"type": "integer"}
        }
      }
    }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              EXAM PREP: Using a dynamic template, create a new index named
              surveys that satisfies the following criteria:
            </div>
            <ul>
              <li>The job_title field is mapped as text and keyword</li>
              <li> The miles_travelled field is mapped as an integer_range</li>
              <li>
                Any field name that ends in _rating is dynamically mapped as an
                integer
              </li>
              <li>
                Any string field that is not already in the mapping is
                dynamically mapped as keyword only, and is not indexed
              </li>
            </ul>

            <div className="answer">
              Note: you can match by field type with{" "}
              <code>match_mapping_type</code> or by field name pattern{" "}
              <code>"match": "*_rating",</code>
            </div>
            <textarea
              rows={30}
              defaultValue={`
    PUT surveys
    {
      "mappings": {
        "properties": {
          ...
        }, 
        "dynamic_templates": [
          {
            "rating_fields": {
              "match": "*_rating",
              "mapping": {
                "type": "integer"
              }
            }
          },
          {
            "all_string_fields": {
              "match_mapping_type": "string",
              "mapping": {
                "type": "keyword",
                "index": false
              }
            }
          }
        ]
      }
    }
            `}
            />
          </div>
        </div>
        <div>
          <div className="pair">
            <div className="question">Disabling Dynamic Indices</div>
            <div className="answer">
              By default, if you try and PUT a new doc into an index that doesnt
              exist, it will automatically create an index. You can turn that
              off.
            </div>
            <textarea
              rows={9}
              defaultValue={`
    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index": false
      }
    }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              When disabling auto_create_index, how do you whitelist systems
              indices?
            </div>
            <div className="answer">
              Instead of specifying "false" and banning all auto generation on
              indices, you can specify the naming pattern for ones allowed to be
              auto generated.
            </div>
            <textarea
              rows={9}
              defaultValue={`
    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index": ".monitoring-es*,logstash-*"
      }
    }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How can you find how which systems indicies there are?
            </div>
            <div className="answer">
              <code>GET _cat/indices?v&h=index&s=index</code> is one way to see
              the index names sorted, the ones starting with a perios "." are
              the systems ones
            </div>
            <textarea
              rows={25}
              defaultValue={`
    GET _cat/indices?v&h=index&s=index
  
    .kibana_1
    .kibana_task_manager_1
    .monitoring-es-7-2020.05.17
    .monitoring-es-7-2020.05.18
    .monitoring-kibana-7-2020.05.17
    .monitoring-kibana-7-2020.05.18

    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index": ".monitoring-es*, logstash-*, .monitoring-kibana*, .kibana_*"
      }
    }

    LABS: CORRECT ANSWER FOR EXAM, TODO memorize this
    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index" : ".monitoring*, .watches, .triggered_watches, .watcher-history*, .ml*"
      }
    }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What settings help prevent mapping explosion?
            </div>
            <div className="answer">--></div>
            <textarea
              rows={12}
              defaultValue={`
    index.mapping.total_fields.limit
    index.mapping.depth.limit
    index.mapping.nested_fields.limit
    index.mapping.nested_objects.limit
            
    PUT surveys2/_settings
    {
      "index.mapping.total_fields.limit": 10
    }
            `}
            />
          </div>
        </div>
        <div className="Summary">
          <h3> Summary </h3>
          <br />
          EXAM--> • When you disable dynamic indices in production, don't forget
          to whitelist any index patterns for system indices
          <br />
          • Using dynamic templates, you can define a field’s mapping based on
          its name or datatype
          <br />• You can control the effect of new fields added to a mapping
          using the “dynamic” property
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False. If you disable dynamic indices, you should
              whitelist index patterns for system indices.
            </div>
            <div className="answer">
              TRUE exam Remember system indices, not in documentation
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. How would you configure an index so that it rejects documents
              that contain fields not defined in its mapping?
            </div>
            <div className="answer">dynamic: strict</div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False. If dynamic is set to false, you can still add
              new fields in your index with dynamic templates.
            </div>
            <div className="answer">TRUE</div>
          </div>
          <br />
        </div>
        {/* <div className="Notes">
          <h3>Notes</h3>
          <h4>Disabling Dynamic Indices</h4>
          <p>
            if you try and PUT a new doc into an index that doesnt exist, it
            will automatically create an index
            <br />
            that is bad practice for production, since they can overload servers
            <br /> How to disable adding to new index? POST doesnt work but PUT
            with or without index does work
            <br /> default is true,
            <textarea
              style={{ height: "190px", width: "750px" }}
              defaultValue={`
    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index": false
      }
    }
            `}
            />
            <br />
            <br /> whitelist with patterned, system behavior needs the dynamic
            behavior, you could just whitelist ".*" whildcard for all the system
            indices
            <textarea
              style={{ height: "190px", width: "750px" }}
              defaultValue={`
    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index" : ".monitoring-es*,logstash-*"
      }
    }
            `}
            />
            <br /> PERSISTENT v TRANSIENT persistent will survive the rebot
            <br /> you can also set this in the yml
            <br />
          </p>
        </div>
        <div className="Notes">
          <h5>Dynamic Templates:</h5>
          <p>manual config of index, # of shards, field need to be data type</p>
          <p>similar to index template, kinda like mapping</p>
          <p>
            multi field, when it finds a string it gives it type text and type
            keyword
          </p>
          <p>
            for number, default type is long even when you dont need it to be
            long.{" "}
          </p>
          <p>
            Might wanna override default types for number or for a string in the
            Dynamic Template
          </p>
        </div>
        <div className="Notes">
          <h6>How to create a Dynamic Template</h6>
          <p>you can manually configure a index with a dynamic template</p>
          <p>
            in example below, any incoming string property gets auto assigned as
            keyword instead of text.
          </p>
          <p>
            the default type text is very inefficient, many strings are proper
            names for exact matches
          </p>
        </div>
        <div className="Notes">
          <h6>Match Mapping Type</h6>
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
    PUT test2
    {
      "mappings": {
        "dynamic_templates": [
          {
            "my_string_fields": {
              "match_mapping_type": "string",
              "mapping": {
                "type": "keyword"
              }
            }
          }
        ]
      }
    }
            `}
          />
        </div>
        <div className="Notes">
          <h4>Matching Field Names</h4>
          <p>
            option for match_mapping_type and match which matches the field name
            pattern, like floating numerical fields start with f*
          </p>
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
    PUT test2
    {
      "mappings": {
        "dynamic_templates": [
          {
            "my_float_fields": {
              "match": "f_*",
                "mapping": {
                  "type": "float"
              }
            }
          }
        ]
      }
    }
            `}
          />
        </div>
        <div className="Notes">
          <h4>Controlling Dynamic Field </h4>
          Strict Mappings: ensure host field always has the same name
          <br />
          Controlling the Dynamic Field Feature
          <br />
          If dynamic is set to “strict”...
          <br />
          Adding Fields to a Mapping
          <br />
          Doing a PUT into the mappings as an admin still works, but you cant
          index a doc with a new field and let it through
          <br />
          maybe you wanna return an error message if you get a bad log format
          <br />
          maybe you wanna accept it but just not map the extra fields
          <br /> Mappings Explosion: trying to avoid mapping explosions, memory
          issues, and you cant aggregate on the host name if it's called 4
          different things (host IP, host name, host server, etc)
          <br /> you cant aggregate on it but it's still in the _source of the
          document
          <br />
          <p>Settings to prevent mapping explosion</p>
          <textarea
            style={{ height: "190px", width: "750px" }}
            defaultValue={`
    index.mapping.total_fields.limit
    index.mapping.depth.limit
    index.mapping.nested_fields.limit
    index.mapping.nested_objects.limit
            `}
          />
          <br />
          <br />
        </div>
        <div className="Demo">
          <h4>Demo </h4>
          {`"persistent": {"auto_create_index": false}`} prevents PUTs on new
          indices, whitelist system indices what if you create a index manually,
          but not send a doc to it?
          <br />
          {`PUT new_index`} works but no default mapping, you can still manually
          create an index if you set mapping dynamic to strict, it will error
          when PUT a new doc with new field. You can still add it explicitly as
          an admin to the mapping, controlled env like in production.
          <br />
        </div>{" "}
        */}
      </div>
    );
  }
}
