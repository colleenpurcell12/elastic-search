import React, { Component } from "react";

export default class Aggregations2BucketAggs extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 3 Aggregations: Lesson 3.2 Bucket Aggregations</h2>
        <div className="exam-objective">
          <h3>** Write and execute metric and bucket aggregations</h3>
          <h3>
            » Docs » Aggregations » Metrics Aggregations » Bucket Aggregations
          </h3>
          <h3>
            bucket aggs like histogram, date_histogram (calendar interval),
            range aggregations, terms aggregation (frequent/popular) provides
            doc_count and orders on that, bucket sorting order, min_doc_count
          </h3>
        </div>
        <div className="pair">
          <div className="question">Describe Bucket Aggregations</div>
          <div className="answer">
            Unlike Metrics aggregations that provide summary statistics, Bucket
            aggregations are great for combined aggs. Examples types of bucket
            aggs include terms agg, date histogram and range aggs.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How do you answer: Which are the 5 most popular blog categories?
          </div>
          <div className="answer">
            Use a terms aggregations on the category.keyword field
          </div>
          <textarea
            rows={14}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "country_name_terms": {
          "terms": {
            "field": "category.keyword",
            "size": 5
          }
        }
      }
    }
                `}
          />
        </div>
        <div className="pair">
          <div className="question">How do you run a histogram?</div>
          <div className="answer">
            The example below provides the # of results for various speeds in
            100 ms increments.
          </div>
          <textarea
            rows={14}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "runtime_histogram": {
          "histogram": {
            "field": "runtime_ms",
            "interval": 100
          }
        }
      }
    }
                `}
          />
        </div>
        <div className="pair">
          <div className="question">How do you run a date_histogram?</div>
          <div className="answer">
            The example below provides the # of results for various speeds in
            100 ms increments.
          </div>
          <textarea
            rows={14}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "logs_by_day": {
          "date_histogram": {
            "field": "@timestamp",
            "calendar_interval": "day"
          }
        }
      }
    }
                `}
          />
        </div>
        <div className="pair">
          <div className="question">
            What's the difference between a histogram and a date histogram
          </div>
          <div className="answer">
            Both bucket by fixed ranges, one is numerical with "interval" and
            the other is date with "calendar_interval"
          </div>
          <textarea
            rows={4}
            defaultValue={`
    "interval": 100
    "calendar_interval": "day"
                `}
          />
        </div>
        <div className="pair">
          <div className="question">How do you sort a date_histogram?</div>
          <div className="answer">
            Default sorting order is by ascending _key. "_key" refers to the
            field you're aggregating on like @timestamp
          </div>
          <textarea
            rows={18}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "logs_by_day": {
          "date_histogram": {
            "field": "@timestamp",
            "calendar_interval": "day",
            "order": {
              "_key": "desc"
            }
          }
        }
      }
    }
                `}
          />
        </div>

        <div className="pair">
          <div className="question">What else can you sort on?</div>
          <div className="answer">
            _count sorts by their doc_count (default in terms). In the exmple
            below, the day with the most hits will be at the top of the list.
          </div>
          <textarea
            rows={18}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "logs_by_day": {
          "date_histogram": {
            "field": "@timestamp",
            "calendar_interval": "day",
            "order": {
              "_count": "desc"          <-------  days with the most traffic at the top
            }
          }
        }
      }
    }
                `}
          />
        </div>
        <div className="pair">
          <div className="question">
            exclude the buckets that have less than 1000 documents.
          </div>
          <div className="answer">
            Use min_doc_count to filter out certain buckets
          </div>
          <textarea
            rows={14}
            defaultValue={`
    GET logs_server*/_search?size=0
    {
      "aggs": {
        "num_hits_per_cat": {
        "histogram": {
          "field": "response_size",
          "interval": 10000,
          "min_doc_count" : 1000               <-----
        }
        }
      }
    }
                `}
          />
        </div>
        <div className="pair">
          <div className="question">
            A terms aggregation is sorted by doc_count by default. Modify your
            previous search so that its terms are sorted alphabetically.
          </div>
          <textarea
            rows={17}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "status_code_buckets": {
          "terms": {
            "field": "status_code",
            "order": {
              "_key": "asc"
            }
          }
        }
      }
    }
                `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How many log requests are there for each week?
          </div>

          <textarea
            rows={14}
            defaultValue={`
    GET logs_server*/_search?size=0
    {
      "aggs": {
        "logs_per_week": {
          "date_histogram": {
            "field": "@timestamp",
            "interval": "week"
          }
        }
      }
    } 
                `}
          />
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• A bucket represents a collection of documents that share
          common criteria <br />• The terms aggregation dynamically creates
          buckets for every unique term it encounters for a specified field
          <br />• Some bucket aggs allow you to specify the sorting “order” !
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. Which aggregation would you use to put logging events into
              buckets by log level (“error”, “warn”, “info”, etc.)?
            </div>
            <div className="answer">bucket agg or terms agg</div>
          </div>
          <div className="pair">
            <div className="question">
              2. Which question does the following request answer?
              <textarea
                rows={14}
                defaultValue={`
    GET blogs/_search
    {
      "size": 0,
      "query": {
        "range": {
          "publish_date": {
            "gte": "2017-01-01",
            "lt": "2018-01-01"
          }
        }
      },
      "aggs": {
        "NAME": {
          "date_histogram": {
            "field": "publish_date",
            "calendar_interval": "month"
    } } } }
                `}
              />
            </div>
            <br />
            <div className="answer">
              for blogs in 2017, how many were published monthly
            </div>
          </div>
        </div>
      </div>
    );
  }
}
