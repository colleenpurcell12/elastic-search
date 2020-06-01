import React, { Component } from "react";

export default class Aggregations2BucketAggs extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 3 Aggregations: Lesson 3.3 Bucket Aggregations</h2>
        <h3>
          when to use a top_hits, significant_text v significant_terms, get
          fancy by sorting the aggs by one of the nested metrics
        </h3>
        <div className="exam-objective">
          <h3>
            ** Write and execute aggregations that contain sub-aggregations
          </h3>

          <div className="pair">
            <div className="question">
              When do you use a top_hits aggregation?
            </div>
            <div className="answer">
              Use case #1: When you combine a query with an aggregation. For
              example, you search for blogs of topic logstash, then you
              aggregate on author.keyword. Now you want the top blogs
              (documents) that match the query, for each author bucket. Like a
              sampling of results per bucket.
            </div>
            <textarea
              rows={25}
              defaultValue={`
    GET blogs/_search
    {
      "size": 0,
      "query": {
        "match": {
          "content": "logstash filters"
        }
      },
      "aggs": {
        "blogs_by_author": {
          "terms": {
            "field": "author.keyword"
          },
          "aggs": {
            "logstash_top_hits": {
              "top_hits": {
                "size": 5
              }
            }
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">Top hits questions</div>
            <div className="answer">
              It'll usually be worded not like top urls, but rather top blogs
              (or documents depending on the index)
              <br /> --> Write a query that searches for "elasticsearch siem" in
              the content field and use this scope of documents to list only the
              title field of the **TOP** three blogs of each one of the top 5
              categories.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How do you include only one specific field (name) in your sampling
              of docs per bucket of your aggregation?
            </div>
            <div className="answer">
              In your top_hits agg, specify {`"_source": "name"`}
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Write a query that searches for "elasticsearch siem" in the
              content field and use this scope of documents to list only the
              title field of the top three blogs of each one of the top 5
              categories.
            </div>
            <div className="answer">
              Step #1: Query match content field
              <br />
              Step #2: terms aggs by category with size 5
              <br /> Step #3: do an inner top_hits aggs on the category buckets,
              basically including a sample results subset. Step #4
              <br /> Step #4: to only include the title field, use{" "}
              {`"_source": "title"`}
            </div>
            <textarea
              rows={27}
              defaultValue={`
    GET blogs/_search
    {
      "size": 0,
      "query": {
        "match": {
          "content": "elasticsearch siem"
        }
      },
      "aggs": {
        "top5_categories": {
          "terms": {
            "field": "category.keyword",
            "size": 5
          },
          "aggs": {
            "top3_blogs": {
              "top_hits": {
                "size": 3,
                "_source": ["title"]
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
              What if you have an nested terms agg but the inner terms agg is
              only a field like content or description so the top terms per
              bucket would be super generic like "the" and "and"?
            </div>
            <div className="answer">
              Use a significant_text agg to group the content terms instead of a
              terms agg
            </div>
            <textarea
              rows={22}
              defaultValue={`
    GET blogs/_search
    {
      "size": 0,
      "aggs": {
        "author_buckets": {
          "terms": {
            "field": "author.keyword",
            "size": 10
          },
          "aggs": {
            "content_significant_text": {
              "significant_text": {                   <------ THIS
                "field": "content",
                "size": 10
              }
            }
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">When to use significant_terms?</div>
            <div className="answer">
              when aggregating on a .keyword field. Otherwise, use
              significant_text.
            </div>
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          • The top_hits aggregation returns the most relevant documents for
          each bucket <br />• The significant_text aggregation finds uncommonly
          common terms in your dataset
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          Explain which aggregations answer the questions below:
          <div className="pair">
            <div className="question">
              3. What are the most significant terms of the top 3 authors?
            </div>
            <div className="answer">
              a terms agg on author.keyword with an inner significant_text on
              content
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
