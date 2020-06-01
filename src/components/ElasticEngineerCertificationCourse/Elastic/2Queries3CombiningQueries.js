import React, { Component } from "react";

export default class Queries3CombiningQueries extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 2 Queries: Lesson 2.3 Combining Queries</h2>
        <h3>
          bool query, filter, must_not, _score, should, minimum_should_match,
          should match_phrase
        </h3>
        <h3>» Docs » Query DSL » Compound queries » Boolean query</h3>

        {/* TODO the lab has a crazy nested bool query, ignored that before */}
        <div className="exam-objective">
          <h3>
            ** Write and execute a search query that is a Boolean combination of
            multiple queries and filters
          </h3>
          <div className="pair">
            <div className="question">
              What if you have a should bool query for comments that include
              "watch" or "good", then you wanna filter for category "video" so
              you add a match clause. Then you get results back of category
              video that mention neither term in the comments field. What went
              wrong?
            </div>
            <div className="answer">
              What you're missing is that -->{" "}
              <code>
                If the bool query includes at least one should clause and no
                must or filter clauses, the default value is 1. Otherwise, the
                default value is 0.
              </code>{" "}
              Read more{" "}
              <a
                rel="noopener noreferrer"
                href="https://whatgeorgemade.com/posts/understanding-should-clauses/"
                alt="blog post"
                target="_blank"
              >
                here
              </a>
            </div>
          </div>

          <div className="pair">
            <div className="question">
              How can you combine multiple clauses into a single search
            </div>
            <div className="answer">
              Notice that bool is an object and every category of search clause
              is an array
            </div>
            <textarea
              rows={21}
              defaultValue={`
    GET my_index/_search
    {
      "query": {
        "bool": {
          "must": [
            {}
          ],
          "must_not": [
            {}
          ],
          "should": [
            {}
          ],
          "filter": [
            {}
          ]
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              How do you include two separate match clauses in a bool clause?
            </div>
            <div className="answer">
              <code>query bool must: [ {`{match},{match}`}]</code>
              <br />
              Note: a multi match bool query is different from a multi field
              cause it's not the same terms being searched across multiple
              fields.
            </div>
            <textarea
              rows={21}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "content": "logstash"
              }
            },
            {
              "match": {
                "category": "engineering"
              }
            }
          ]
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What if you wanna score results of a certain author higher?
            </div>
            <div className="answer">Use a should clause</div>
            <textarea
              rows={19}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": {
            "match_phrase": {
              "content": "elastic stack"
            }
          },
          "should": {
            "match_phrase": {
              "author": "shay banon"
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
              What if you only want to look for a topic in a single category?
            </div>
            <div className="answer">
              if you dont care about ranking results higher, then just use a
              filter
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How do you remove results not category engineering?
            </div>
            <div className="answer">FILTER CLAUSE</div>
            <textarea
              rows={20}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": {
            "match_phrase": {
              "content": "elastic stack"
            }
          },
          "filter": {
            "match": {
              "category": "engineering"
            }
          }
        }
      }
    }
              `}
            />
          </div>
          <div className="pair">
            <div className="question">Do filter clauses impact score?</div>
            <div className="answer">No</div>
          </div>
          <div className="pair">
            <div className="question">
              Which other phrase besides filter reduces # of hits and doesnt not
              impact score?
            </div>
            <div className="answer">must_not</div>
          </div>
          <div className="pair">
            <div className="question">
              If a bunch of should clauses is too broad a search, how can you
              narrow it?
            </div>
            <div className="answer">minimum_should_match</div>
            <textarea
              rows={22}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "title": "elastic"
              }
            }
          ],
          "should": [
            {"match": {"title": "stack"}},
            {"match_phrase": {"author": "shay banon"}},
            {"range": {"publish_date": {"lt": "2017-01-01"}}}
          ],
          "minimum_should_match": 2
        }
      }
    }
                `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What if you are searching "open data", and a match query seems too
              broad but a match_phrase query seems too narrow. What type of
              query should you use?
            </div>
            <div className="answer">
              Combine a match and a should match_phrase!
            </div>
            <textarea
              rows={19}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "must": {
            "match": {
              "content": "open data"
            }
          },
          "should": {
            "match_phrase": {
              "content": "open data"
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
              What if you wanted to narrow you bool query, so that it must_not
              contain "released" or "releases" or "release" in the title field?
            </div>
            <div className="answer">
              use must_not match with multiple terms in the query string
            </div>
            <textarea
              rows={17}
              defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          ...
          "must_not": [
            {
              "match": {
                "title": "release releases released"
              }
            }
          ]
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
          <div className="quiz">
            <h3>QUIZ</h3>
            <div className="pair">
              <div className="question">
                1. A user searches our blogs for “scripting” and checks the box
                that only displays blogs from the “Engineering” category. How
                would you implement this query?
              </div>
              <div className="answer">
                match for fields [content and title], then filter for category
                Engineering
              </div>
            </div>

            <div className="pair">
              <div className="question">
                2. True or False: If a document matches a filter clause, the
                score is increased by a factor of 2.
              </div>
              <div className="answer">
                False, filter and must_not have no impact on score.
              </div>
            </div>
            <div className="pair">
              <div className="question">
                3. True or False: The following query will return all blogs, and
                documents that contain “performance” in the title field will be
                on top.
              </div>
              <textarea
                rows={17}
                defaultValue={`
    GET blogs/_search
    {
      "query": {
        "bool": {
          "should": [
            {
              "match": {
                "title": "performance"
              }
            }
          ]
        }
      }
    }
    `}
              />
              <br />
              <div className="answer">
                False. If there are only should clauses, the inherent
                minimum_should_match is 1.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
