import React, { Component } from "react";

export default class Aggregations extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Aggregations</h2>
        {/* TODO add in more here, like examples slides 185-240 */}
        {/* TODO add code examples */}
        <div className="pair">
          <div className="question">
            When a question asks about interval, what comes to mind?
          </div>
          <div className="answer">Histogram</div>
        </div>

        <div className="pair">
          <div className="question">
            When a question askas about count, what comes to mind?
          </div>
          <div className="answer">
            terms aggregation agg --> terms_agg_name --> terms --> field
          </div>
        </div>
        <div className="pair">
          <div className="question">
            When a question askas about "top 5" authors, what comes to mind?
          </div>
          <div className="answer">
            terms aggregation agg --> terms_agg_name --> terms --> field:
            "author.keyword" and size: 5
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What is the field of a terms aggregation by author?
          </div>
          <div className="answer">author.keyword</div>
        </div>
        <div className="pair">
          <div className="question">
            What's the syntax for a percentiles agg?
          </div>
          <div className="answer">percentiles</div>
        </div>
        <div className="pair">
          <div className="question">
            When a question askas about distribution, what comes to mind?
          </div>
          <div className="answer">percentiles</div>
        </div>
        <div className="pair">
          <div className="question">
            Which aggregation returns the response_size distribution for the
            logs indices with an interval of 10000?
          </div>
          <div className="answer">A histogram</div>
          <textarea
            rows={14}
            defaultValue={`
    GET logs_server*/_search
    {
      "size": 0,
      "aggs": {
        "runtime_histogram": {
          "histogram": {
            "field": "response_size",
            "interval": 10000
          }
        }
      }
    }
          `}
          />
        </div>
        <div className="pair">
          <div className="question">What is min_doc_count used for?</div>
          <div className="answer">
            In a histgram, you can specify it after field and interval. It's how
            you can exclude the buckets that have less than 1000 documents. like{" "}
            {`"min_doc_count": 1000`}
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What is the field value for weekly count historgram?
          </div>
          <div className="answer">
            @timespamp (date_historgram, calendar_interval)
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What's an example of Top Hits Aggregation?
          </div>
          <div className="answer">What are each authors’ top five blogs?</div>
        </div>
        <div className="pair">
          <div className="question">
            How do you write a Top HIts Aggregation for What are each authors’
            top five blogs??
          </div>
          <div className="answer">HERE IS THE CODE TODO</div>
        </div>

        <div className="pair">
          <div className="question">What's Significant Terms Aggregation?</div>
          <div className="answer">XYZ</div>
        </div>

        <div className="pair">
          <div className="question">
            What does this error indicate?{" "}
            {`"type": "illegal_argument_exception","reason": "Fielddata is disabled on text fields by default. Set fielddata=true on [originalUrl] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory. Alternatively use a keyword field instead."`}
          </div>
          <div className="answer">
            should add a ".keyword" to the field specified for the nested aggs
            search
          </div>
        </div>

        <div className="pair">
          <div className="question">
            How to do a search and only return a field in the results?
          </div>
          <div className="answer">
            if you only want the title field of each document, sibling to the
            query in the JSON add this key-value pair: {`"_source": ["title"]`}
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How to do a terms aggregation and sort by the term alphabetically?
          </div>
          <div className="answer">
            using the _key order {`"order": {"_key" : "asc" }`} default ordering
            is by doc_count
          </div>
          <textarea
            rows={14}
            defaultValue={`
  GET logs_server*/_search
    {
      "size": 0,
        "aggs" : {
            "status_codes" : {
                "terms" : { "field" : "status_code" },
                "order" : { "_key" : "asc" }
            }
        }
    }
          `}
          />
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• The bool query allows you to combine queries using Boolean
          logic
          <br />• Any clause in a “should” clause increases the _score of hits
          <br />• Any clause inside a “filter” clause has no contribution to
          score
        </div>
        {/* <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">Question</div>
            <div className="answer">Answer</div>
          </div>
          <div className="pair">
            <div className="question">Question</div>
            <div className="answer">Answer</div>
          </div>
          <div className="pair">
            <div className="question">Question</div>
            <div className="answer">Answer</div>
          </div>
        </div> */}
      </div>
    );
  }
}
