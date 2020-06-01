import React, { Component } from "react";

export default class DM1Denormalization extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Data Modeling Part 1: Denormalization</h2>
        {/* <h4>Lab 1.1</h4> */}
        <div className="exam-objective">
          <h3>
            ** Define an index that satisfies a given set of requirements.
          </h3>
          <div className="pair">
            Questions for memorization/review: what field type should id and
            code be, how to apply a analyzer to a mapped field, how to define a
            field with inner data, how to map a field of objects array
          </div>
          <div className="pair">
            <div className="question">
              What field type should fields like id and code be?
            </div>
            <div className="answer">
              They should be set simply as "keyword" since there is no analysis
              or or tokenization for them.
              <textarea
                rows={10}
                defaultValue={`
    "code" : {
      "type" : "keyword"
    },
    ...
    "id" : {
      "type" : "keyword"
    },
          `}
              />
            </div>
          </div>

          <div className="pair">
            <div className="question">
              When do you apply an analyzer to a field?
            </div>
            <div className="answer">
              When it will be tokenized and compared with related words, ie when
              it's not a proper noun.
            </div>
            <textarea
              rows={11}
              defaultValue={`
    "title": {
      "type": "text",
      "analyzer": "english",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
          `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What type should array fields like "products" be?
            </div>
            <div className="answer">
              Since there is no array field type, these should be set as a
              multifield with type text as well as keyword.
            </div>
            <textarea
              rows={10}
              defaultValue={`
    "products" : {
      "type" : "text",
      "fields" : {
        "keyword" : {
          "type" : "keyword",
          "ignore_above" : 256
        }
      }
    },
          `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What type should fields with inner fields like country with name
              and code be?
            </div>
            <div className="answer">
              Those fields should be type object, which is NOT set explicityly.
              It's infered when you give the field properties
              <textarea
                rows={17}
                defaultValue={`
    "country" : {
      "properties" : {
        "code" : {
            "type" : "keyword"
        },
        "name" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword"
            }
          }
        }
      }
            `}
              />
            </div>
          </div>
        </div>
        <div className="Notes">
          <h4>Notes</h4>
          <ul>
            <li>Denormalizing your data refers to “flattening” your data</li>
            <li>
              Instead of using join tables, you store redundant pieces of data
              but then Elastic compresses _source later
            </li>
            <li>Upside is avoiding expensive join operation at query time</li>
            <li>Relational databses store data that is normalized.</li>
            <li>
              Instead of doing multiple searches in multiple tables to answer
              the questions "which blogs are written by monica", you can search
              for blogs that meet multiple criteria all in a single index.
            </li>
            <li>
              When you denormalize data from a relational database, some of the
              fields like extra ids become redundant. You dont have to index
              fields you wont be searching on.
            </li>
            <li>
              Story: You no longer need to index country id or company id
              because you aren’t storing the person’s company and country in a
              different table, and you need to join them later for the whole
              picture
            </li>
            <li>
              {" "}
              Disk space is no longer the concern, it’s all compressed anyways
            </li>
          </ul>
        </div>
        <div className="pair">
          <div className="question">
            Discuss the storage implications of denormalized data
          </div>
          <div className="answer">
            some duplication but Elastic comiles _source for space optimization.
            Plus care more about speed of query which is improved without join
            operations
          </div>
        </div>
        <div className="pair">
          <div className="question">
            For mapping relational data into an index, how to decide which
            fields are type keyword
          </div>
          <div className="answer">
            For regular text fields like content and title, you want to enable
            both keyword for aggregations and text for parsing for partial
            matches and analyzing (stemming etc). Good examples of fields to map
            as only keyword are ids and codes.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Do you need to map every value and id from the relational tables
            into a field with type text and type keyword?
          </div>
          <div className="answer">
            No, only the fields you are gonna search on.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            When might you be *TEMPTED* to keep data normalized?
          </div>
          <div className="answer">
            WHen it there is a fast flow of it and it's be super intensive to
            keep indexing.
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• Denormalizing your data refers to “flattening” your data, and
          typically provides the best performance in terms of how your data is
          modeled <br />• When modeling your documents, prefer denormalization
          whenever possible
        </div>
        {/* <h3>Quiz on slide 35 and answers 493</h3> */}
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              It is a best practice to denormalize your data before indexing it
              into Elasticsearch. O
            </div>
            <div className="answer">True</div>
          </div>
          <div className="pair">
            <div className="question">
              There is typically a 1:1 mapping between the tables in your
              relational database and the indices in your Elasticsearch cluster
            </div>
            <div className="answer">
              False. You should index denormalized documents to Elasticsearch.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              Denormalizing your data allows you to easily and quickly search
              across multiple fields in a single query without joining datasets
            </div>
            <div className="answer">True</div>
          </div>
        </div>
      </div>
    );
  }
}
