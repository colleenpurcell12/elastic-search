import React, { Component } from "react";

export default class Queries extends Component {
  render() {
    return (
      <div>
        <h2>Queries Part 1: match_all, match, include/exclude, exists</h2>

        <h3>Background</h3>
        <div className="pair">
          <div className="question">What's DSL?</div>
          <div className="answer">
            Elastic queries are JSON over HTTP. The mark up languages is DSL.
            It's faster thean SQL. Instead of database and row, it has index,
            and document. Results are ranked by relevancy score.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What are the two search syntax components?
          </div>
          <div className="answer">Query context and filter context.</div>
        </div>
        <div className="pair">
          <div className="question">What are the various APIs?</div>
          <div className="answer">_doc, _search, _count, _cluster, _cat</div>
        </div>
        <div className="pair">
          <div className="question">Recall versus Precision?</div>
          <div className="answer">
            You want to expand recall to make sure you dont miss any relevant
            results, then increase precision to tighten the query for only the
            ones that match
          </div>
        </div>
        <br />
        <div className="exam-objective">
          <h3>
            ** Write and execute a search query for terms and/or phrases in one
            or more fields of an index
          </h3>

          <div className="pair">
            <div className="question">Various types of queries</div>
            <div className="answer">
              match, match_phrase, match_all, exists, multi-match, range
            </div>
          </div>
          <h4>MATCH_ALL QUERY</h4>
          <div className="pair">
            <div className="question">What is the most generate search?</div>
            <div className="answer">The "Match All" query --> match_all</div>
            <textarea
              rows={7}
              defaultValue={`
    GET comments/_search
    { "query": {
        "match_all": {}
      }
    }
              `}
            />
          </div>
          <h4>MATCH QUERY</h4>
          <div className="pair">
            <div className="question">How to search by a particular field?</div>
            <div className="answer"></div>
            <textarea
              rows={7}
              defaultValue={`
  GET comments/_search
  { "query": {
      "match": {"name": "anthropology"}
    }
  }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">How to run a "top 5 hits" query</div>
            <div className="answer">
              Just set size to 5 and automatically the results that score the
              highest will be returned.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to limit the fields returned in each search result?
            </div>
            <div className="answer">
              set the fields you want to exclude with _source --> excludes
              -->[fieldName1, ...]
            </div>
            <textarea
              rows={15}
              defaultValue={`
    GET blogs/_search
    {
      "size": 1,
      "_source": {
        "excludes": [
          "content"
        ]
      },
      "query": {
        "match_all": {}
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How to include only certain fields returned in each search result?
            </div>
            <div className="answer">
              at the top of a query set which field you wanna see{" "}
              {`"_source": ["author","title"],`}
              <br />
              or set the fields you want to include with _source --> includes
              -->[fieldName1, ...] as shown below
              <br />
              if you wanna see all the fields as if the default, set{" "}
              {`"_source": true`} just at the top level of the query.
            </div>
            <textarea
              rows={12}
              defaultValue={`
    GET blogs/_search
    {
      "size": 1,
      "_source": {
        "includes": ["author","title"]
      },
      "query": {
        "match_all": {}
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Query Operator: what's the default and how do you use it?
            </div>
            <div className="answer">
              The default is or, when you have a match query where content has
              two terms.
            </div>
            <div className="answer">
              USE CASE: you can use AND to increase precision
            </div>
            <textarea
              rows={11}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": "ingest nodes"
        }
      }
    }
              `}
            />
            <div className="answer">
              BECOMES this when you match content of you amtch query an object
              with query string and an explicit operator.
            </div>
            <textarea
              rows={12}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "match": {
          "content": {
            "query": "ingest nodes",
            "operator": "and"
          }
        }
      }
    }
              `}
            />
          </div>
          <h4>SIMPLE QUERIES</h4>
          <div className="pair">
            <div className="question">How does the exists query work?</div>
            <div className="answer">you set the </div>
            <textarea
              rows={8}
              defaultValue={`
    GET comments/_search
    { "query": {
        "exists": {"field": "name"}
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              Will the exists query return documents with the field when it's
              empty?
            </div>
            <div className="answer">Yes</div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
