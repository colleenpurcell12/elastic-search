import React, { Component } from "react";

export default class Aggregations1MetricsAggs extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 3 Aggregations: Lesson 3.1 Metrics Aggregations</h2>
        <div className="exam-objective">
          <h3>** Write and execute metric and bucket aggregations</h3>
          <h3>
            » Docs » Aggregations » Metrics Aggregations » Percentile Ranks
            Aggregation
          </h3>
          <h3>
            agg types, how it looks in results, combining queries and aggs,
            summary statistics, stats aggregation, percentile, cardinality
          </h3>

          <div className="pair">
            <div className="question">
              What does an aggregation query look like
            </div>
            <div className="answer">
              /_search {`{aggs "my_agg_name" "my_agg_type"`}
            </div>
            <textarea
              rows={12}
              defaultValue={`
    GET my_index/_search
    {
      "aggs": {
        "my_aggregation": {
          "AGG_TYPE": {
            ...
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">How do you do a sums aggregation?</div>
            <div className="answer">
              The sum aggregation below adds up all the response sizes from
              every document into a huge number
            </div>
            <textarea
              rows={12}
              defaultValue={`
    GET logs_server*/_search
    {
      "aggs": {
        "total_sum_bytes": {
          "sum": {
            "field": "response_size"
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Why do you need to name your aggregations?
            </div>
            <div className="answer">
              to distinguish it from other aggregation results in the output
            </div>
            <textarea
              rows={14}
              defaultValue={`
    sample output:

    "aggregations": {
      "total_sum_bytes": {
        "value" : 9.5314417057E10
      },
      "my_other_agg": {
        ...
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How can you limit the scope of an aggregation?
            </div>
            <div className="answer">Combine it with a query</div>
            <textarea
              rows={18}
              defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "query": {
        "match": {
          "language.code": "fr-fr"
        }
      },
      "aggs": {
        "french_sum_bytes": {
          "sum": {
            "field": "response_size"
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What kind of summary statistics can you agg on?
            </div>
            <div className="answer">Min, max and average</div>
          </div>
          <div className="pair">
            <div className="question">
              How do you get a bundle of summary statistic in one agg?
            </div>
            <div className="answer">with a "stats" agg</div>
            <textarea
              rows={14}
              defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "request_time_stats": {
          "stats": {
            "field": "runtime_ms"
          }
        }
      }
    }
              `}
            />
          </div>

          <div className="pair">
            <div className="question">
              What's the problem with doing a "median" agg?
            </div>
            <div className="answer">
              it's not offered the same way "max", "min" or "sum" is. Instead
              you have to specify a percentile to get the value of the field at
              that percentile (like specify percent 50 to get the median).
            </div>
            <textarea
              rows={18}
              defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "runtime_quartiles": {
          "percentiles": {
            "field": "runtime_ms",
            "percents": [
              25,
              50,
              75
            ]
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Instead of finding the value for a percentile, what if you wanna
              find the percentile of a value?
            </div>
            <div className="answer">
              Use percentile_ranks and pass in a field value
            </div>
            <textarea
              rows={15}
              defaultValue={`
    GET latency/_search
    {
      "size": 0,
      "aggs": {
        "load_time_ranks": {
          "percentile_ranks": {
            "field": "load_time",
            "values" : [500, 600]
          }
        }
      }
    }

              `}
            />
          </div>
          <div className="pair">
            <div className="question">What's a cardinality aggregation?</div>
            <div className="answer">
              It's asking for the number of unique things. For example, the
              query below asks "How many unique countries did we receive
              requests from?"
            </div>
            <textarea
              rows={13}
              defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "number_of_countries": {
          "cardinality": {
            "field": "geoip.country_name.keyword"
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Implementing a cardinality agg--How many distinct URL requests
              were logged in the logs_server* indices? (originalUrl field)
            </div>
            <div className="answer">*Remember to use the .keyword field</div>
            <textarea
              rows={13}
              defaultValue={`
    GET logs_server*/_search
    {
      "aggs": {
        "my_url_unique_values_count": {
          "cardinality": {
            "field": "originalUrl.keyword"
          }
        }
      }
    }
              `}
            />
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• Metrics aggregations compute numeric values based on your
          dataset <br />‒ such as min, max, avg, and stats <br />• Use the
          percentiles aggregations to calculate different percentiles, such as
          the 50% (median) <br />• Use the cardinality aggregation to calculate
          unique counts
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False: You can choose arbitrary names to identify
              aggregation clauses.
            </div>
            <div className="answer">TRUE</div>
          </div>
          <div className="pair">
            <div className="question">
              2. In our logs_server* indices, how could you verify that 95% of
              web requests are executed in less than 100ms?
            </div>
            <div className="answer">
              You could do a percentile aggregation on 95 and look at the result
              value (the amount that 95% are faster than) and compare that
              duration to make sure it's lte 100ms
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3.What aggregation(s) would you use to answer the following
              question: “How many unique visitors came to our website today?”
            </div>
            <div className="answer">cardinality agg!</div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
