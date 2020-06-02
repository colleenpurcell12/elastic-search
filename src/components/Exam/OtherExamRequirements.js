import React, { Component } from "react";
import kibanaDownloadDataset from "./images/kibanaDownloadDataset.png";
import ExamAnswersOnlyJSON from "./images/ExamAnswersOnlyJSON.png";

export default class OtherExamRequirements extends Component {
  render() {
    return (
      <div className="other-requirements">
        <h2>Tips and Advisories for Exam</h2>
        <ul>
          <li>
            Tricks in Kibana
            <ul>
              <li>Use auto complete in kibana</li>
              <li>
                Load page of relevant documentation in browser: put cursor on a
                query, then hit "command + /" and it will load the documentation
                page that's relevant!!
              </li>
            </ul>
          </li>
          <li>
            Pre Exam checklist
            <ul>
              <li>
                In the exam, when you enter your query answers from Kibana for
                submission you EXCLUDE the request and only include the JSON
                request body so make sure you know how not to rely on request
                params like ?size=0 and ?pipeline=my_pipeline for things like
                _update_by_query
                <img
                  style={{ maxWidth: "600px" }}
                  alt="exam directions"
                  src={ExamAnswersOnlyJSON}
                />
              </li>
              hot/warm architecture (NOT IN DOCUMENTATION
              <li>
                Watch out about hot/warm architecture because it's not exactly
                in the docs, configuring nodes' size attribute is though so you
                can infer from there.
                <textarea
                  rows={4}
                  defaultValue={`
          node.attr.size: medium
          
          PUT test/_settings
          {
            "index.routing.allocation.include.size": "big,medium"
          }
            `}
                />
              </li>
              <li>
                always check your ingest pipelines work using the _simulate
                endpoint first
              </li>
              <li>
                {" "}
                check to make sure your computer is compatible:
                https://www.examslocal.com/ScheduleExam/Home/CompatibilityCheck
              </li>
              <li>
                Watch{" "}
                <a
                  rel="noopener noreferrer"
                  alt="elastic"
                  href=" https://www.elastic.co/training/certification/faq"
                  target="_blank"
                >
                  this
                </a>{" "}
                video AGAIN right before the exam
              </li>
            </ul>
          </li>
          <li>
            Expect to use commands like cd, ssh and nano on exam (You will need
            to be familiar with basic Linux commands like ssh, ps and cd, as
            well as a Linux text editor like vi, vim, emacs, or nano.)
          </li>

          <li>
            <a
              rel="noopener noreferrer"
              alt="blog post"
              target="_blank"
              href="https://www.elastic.co/guide/en/elasticsearch/reference/7.6/elasticsearch-intro.html#"
            >
              Documentation 7.6:{" "}
            </a>{" "}
            search from here to only get up to date version of documentation
          </li>
        </ul>
        <br />
        <div>
          <h3>
            Practice Dataset:
            <img src={kibanaDownloadDataset} alt="kibana add sample dataset" />
          </h3>
        </div>
        <div>
          <h2>Other notes</h2>
          <ul>
            <li>
              {" "}
              Blog post about questions on his exam: first task was cluster
              setup leveraging hot-warm nodes. Easy-peasy, ssh to each node, set
              elasticsearch.yml with correct properties and run elasticsearch
              process. Five minutes including double-check of node attributes
              through Kibana. That was ego booster and stress reliever at the
              same time, so I went to next task; again some cluster properties…
              nothing that might surprise me. At the second half, the nature of
              tasks switched to operations with indexed data. I had to modify
              already indexed data; of course, I used ingest pipeline and
              Reindex API. Another task, create some custom analyzer and also
              one or two tasks about queries, nothing horrible just some
              aggregations and bool queries. More from this blog post{" "}
              <a href="https://www.ableneo.com/blog-detail/92260e9dabcaid/elastic-certified-engineer-exam">
                here
              </a>
            </li>
            <li>
              When you are restricting the ability to automatically create
              indices whenever you index a doc into a non-existent index, and
              you are creating an exceptions list to whitelist the ElasticSearch
              indices and you dont know which ones they are use this command to
              find the naming pattersn to exlcude GET _cat/templates
              <textarea
                rows={27}
                defaultValue={`
    GET _cat/templates?v&h=index_patterns&s=order:asc,index_patterns

    ^this means get me a list of templates, verbose column titles (?v), 
    for headers (h=) only include index_patterns and sort by (&s=) that in ascending order

    Response are a list of index template naming patterns: 
    index_patterns
    [.logstash]
    [.management-beats]
    [.ml-anomalies-*]
    [.ml-config]
    [.ml-inference-000001]
    [.ml-meta]
    [.ml-notifications-000001]
    [.ml-state*]

    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index": "dynamic_test,.monitoring*,.watches,.triggered_watches,.watcher-history*,.ml*"
      }
    }
              `}
              />
            </li>

            <li>
              This is a github repo with datasets to practice with{" "}
              <a href="https://github.com/ropensci/elastic_data">here</a>
            </li>
            <li>
              NESTED Mappings is on the exam, change the mapping of the index
              and requery the search the query ALSO has to specify that you are
              searching for a nested field
              {/* <br /> */}
              {/* **JOIN is not on the exam */}
            </li>
            <li>
              Do get partial credit, most people dont pass on the 1st try.
              <br />
              Comment about Exam scoring: Multiple ways to write a query, if you
              get the same results. The erxam grader will give you credit, in
              manual review even if scoring script marks it wrong.
            </li>

            <li>
              Example Exam Question: "Create a processor that does XYZ"
              Instructor says you should know the split, script and possibly
              even one that will allow you to work with arrays and loop through
              them FOREACH processor. HINT
            </li>
            <li>
              EXAM painless scripts accessing fields specific to the context
              ingest node v update (ctx._source['fieldname'] v ctx.fieldname)
            </li>
            <li>
              A good exercise is to find all the information required to answer
              in the Exam Prep Lab questions in the Elastic documentation.
            </li>

            <li>
              EXAM painless v mustache, one for scripts another for dynamic
              templates
            </li>
            <li>
              When searching in documentation, instead of searching by keyword
              like "and operator" or "query operator" try using exact query
              syntax like "operator": "and" to get a direct hit!
            </li>
            <li>
              (Non-exam related) TIP if your query isnt running properly, use a
              JSON lint website to generate erros
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OtherExamRequirements);
