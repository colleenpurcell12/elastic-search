import React, { Component } from "react";

export default class DM4Analyzers extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Data Modeling Part 4: Analyzers</h2>
        {/* <h4>Lab 1.4</h4> */}
        <div className="pair">
          Questions for memorization/review: how to define a custom analyzer
          with custom char filter while creating and index where the custom
          analyzer is used in the mapping
        </div>
        <div className="exam-objective">
          <h3>
            ** Define and use a custom analyzer that satisfies a given set of
            requirements
          </h3>
          <h3>
            ** Define and use multi-fields with different data types and/or
            analyzers
          </h3>
        </div>
        <div>slide 80</div>
        <div>
          <div className="pair">
            <div className="question">
              If asked to create a new index that uses a custom analyzer, how
              could you do it?
            </div>
            <div className="answer">
              PUT new index name, body of request has settings{" "}
              {`{analysis: ..., mappings...}`} you put the custom analyzer
              definition under analysis and the multi-field definitions under
              mappings.
            </div>
          </div>
          <div className="pair">
            <div className="question">How do you create a custom analyzer?</div>
            <div className="answer">
              Defined in settings under analysis. You set your analyzer type
              custom, and specify your one tokenizer, and you multiple optional
              filters. Then you define your custom filters below that.
            </div>
            <textarea
              rows={10}
              defaultValue={`
     PUT index_name
     {
      "settings": {
        "analysis": {
          "analyzer": {
            "my_special_analyzer_name":{
              "type": "custom",
              "tokenizer": ,
              "char_filters": [],
              "filters": []
            }
          },
          "char_filter: {
            "my_special_char_filter":{
              "type": "mapping",
              "mappings": []
            }
          },
          "filter": {
            "my_special_custom_stop": {
              "type": "stop",
              "stopwords": []
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
              Explain the following terms: Character Filters, Tokenizer, Token
              Filters, and Analyzer
            </div>
            <div className="answer">
              character filter is for special characters like underscore and
              dash, tokenizer is how to split a string into tokens, and a token
              filter is which tokens to remove like stop words
              <br /> so for example character filter is lowercase, tokenizer is
              english or standard, and token filter is stopwords and snowball
              <br /> analyzer is a combination of all 3
            </div>
          </div>
          <div className="pair">
            <div className="question">How to test an analyzer?</div>
            <div className="answer">
              with the _analyze API! body of request is a analyzer and the
              sample text
            </div>
          </div>
          <div className="pair">
            <div className="question">How can analyzers help with search?</div>
            <div className="answer">
              you can attach multiple analyzers to an index field through
              multi-field mapping
            </div>
            <textarea
              rows={10}
              defaultValue={`
      For example, a content field can have default standard analyzer, 
      but a user can also search content.english

      "content": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "english": {
          "type": "text",
          "analyzer": "english"
        }
      }
          `}
            />
          </div>

          {/* <div className="pair">
            <div className="question">How can analyzers help with search?</div>
            <div className="answer">
              you can attach multiple analyzers to an index field through
              multi-field mapping
            </div>
            <textarea
              rows={10}
              defaultValue={`
      For example, a content field can have default standard analyzer, 
      but a user can also search content.english

      "content": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "english": {
          "type": "text",
          "analyzer": "english"
        }
      }
          `}
            />
          </div> */}
          <div className="Notes">
            <h3>Notes</h3>
            If you want "x-pack" to become "xpack instead of "x" and "pack"
            <br />
            HOW TO character filter, before tokenizer. Mapping character filter
            <br />
            just you define the analyzer, then you create the field that the
            analyzer applies to
            <textarea
              rows={28}
              defaultValue={`
              PUT blogs_test
              {
                "settings": {
                  "analysis": {
                    "char_filter": {
                      "xpack_filter": {
                        "type": "mapping",
                        "mappings": [
                          "X-Pack => XPack"
                        ]
                      }
                    },
                    "analyzer": {
                      "my_content_analyzer": {
                        "type": "custom",
                        "char_filter": [
                          "xpack_filter"
                        ],
                        "tokenizer": "standard",
                        "filter": [
                          "lowercase"
                        ]
                      }
                    }
                  }
                }
              }
          `}
            />
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Mapping char_filter for Arabic numbers
            <a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.6/analysis-mapping-charfilter.html">
              {" "}
              link to docs
            </a>
          </div>
          <div className="answer">
            <textarea
              rows={45}
              defaultValue={`

              PUT my_index
                {
                  "settings": {
                    "analysis": {
                      "analyzer": {
                        "my_analyzer": {
                          "tokenizer": "keyword",
                          "char_filter": [
                            "my_char_filter"
                          ]
                        }
                      },
                      "char_filter": {
                        "my_char_filter": {
                          "type": "mapping",
                          "mappings": [
                            "٠ => 0",
                            "١ => 1",
                            "٢ => 2",
                            "٣ => 3",
                            "٤ => 4",
                            "٥ => 5",
                            "٦ => 6",
                            "٧ => 7",
                            "٨ => 8",
                            "٩ => 9"
                          ]
                        }
                      }
                    }
                  }
                }

                POST my_index/_analyze
                {
                  "analyzer": "my_analyzer",
                  "text": "My license plate is ٢٥٠١٥"
                }
          `}
            />
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Are Custom analyzers available globally (Across indices)?
          </div>
          <div className="answer">
            No. Custom analyzers are only defined at the index level
          </div>
        </div>
        <div className="pair">
          <div className="question">
            Token filter order for Standard one as example
          </div>
          <div className="answer">
            From left to right, order matters. First lowercase, then remove stop
            words, then stemming
          </div>
        </div>
        <div className="pair">
          <div className="question">
            If you dont make words like "To Be Or Not To Be" go through the stop
            words filter before the lowercase one, then they wont be considered
            stop words. HOw to fix that?
          </div>
          <div className="answer">
            Make the lowercase filter come before the stop word filter
          </div>
        </div>
        <div className="pair">
          <div className="question">What are the stop words?</div>
          <div className="answer">
            You can override the list with a custom file. These are them: "a,
            an, and, are, as, at, be, but, by, for, if, in, into, is, it, no,
            not, of, on, or, such, that, the, their, then, there, these, they,
            this, to, was, will, with"
          </div>
        </div>
        <br />
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              True or False. When defining an analyzer, token filters are
              applied in the order they are listed.
            </div>
            <div className="answer">TRUE</div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. A custom analyzer needs to be defined in the
              settings of an index.
            </div>
            <div className="answer">
              YES define in settings, point to in mappings
            </div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. It is possible to define multiple tokenizers in an
              analyzer.
            </div>
            <div className="answer">
              NO can only have one
              <br />
              Characterizers zero to many
              <br />
              Token filters: 0-many as well
            </div>
          </div>
        </div>
      </div>
    );
  }
}
