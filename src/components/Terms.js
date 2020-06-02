import React, { Component } from "react";
import "./Terms.css";

export default class Terms extends Component {
  render() {
    return (
      <div className="terms-container">
        <h2>Terms</h2>
        <div className="notes-pair">
          <div className="topic">Secure a Cluster</div>
          <div className="description">use xpack.security.enabled: true</div>
        </div>
        <div className="notes-pair">
          <div className="topic">The And operator</div>
          <div className="description">
            To change a simple match query with a two word search string (OR by
            default) to an AND query, change <code>{`"field": "value"`}</code>
            to <code>{`field: {"query": "value", "operator": "AND"`}</code>
          </div>
        </div>

        <div className="notes-pair">
          <div className="topic">Auto_Create_Index</div>
          <div className="description">
            it's a cluster setting good for production so you dont allow an
            index to be automatically created whenever a doc is indexed into an
            undefined index
            <br />
            <textarea
              rows={12}
              defaultValue={`
    PUT _cluster/settings
    {
      "persistent": {
        "action.auto_create_index": "dynamic_test,.monitoring*,.watches,.triggered_watches,.watcher-history*,.ml*"
      }
    }
              `}
            />
          </div>
        </div>
        <div className="notes-pair">
          <div className="topic">
            How to find the list of kibana settings indices that you need to
            whitelist?
          </div>
          <div className="description">
            Use GET _cat/templates to find the dynamic template index patterns
            to white list
          </div>
        </div>
        <div className="notes-pair">
          <div className="topic">
            Shard Allocation Awareness and Forced Awareness
          </div>
          <div className="description">
            shard allocation--spread the shards of an index across zones/racks
            <br />
            forced awareness--when the last node is left after a failure, dont
            risk overloading it by doubling up replicas and primaries on the
            same node
            <br />
            <textarea
              rows={15}
              defaultValue={`
    PUT /_cluster/settings
    {
      "persistent": {
        "cluster": {
          "routing": {
            "allocation": {
              "awareness.attributes": "my_rack" ,                <---shard awareness
              "awareness.force.my_rack.values": "rack1, rack2"   <---forced awareness
            }
          }
        }
      }
    }
              `}
            />
          </div>

          <div className="notes-pair">
            <div className="topic">
              How do you refer to the item of a field array within a foreach
              processor of a pipeline?
            </div>
            <div className="description">
              with <code>"_ingest._value"</code>
            </div>
            <textarea
              rows={17}
              defaultValue={`
              ...
    {
      "foreach": {
        "field": "sku",
        "processor": {
          "gsub": {
            "field" : "_ingest._value",
            "pattern": "ZO",
            "replacement": "EX"
          }
        }
      }
    }
    ...
              `}
            />
          </div>
        </div>
        <div className="notes-pair">
          <div className="topic">Dynamic Template</div>
          <div className="description">
            A mapping rule for dynamic mapping, so that upmapped fields will be
            mapped to a specific data type (stored in an index's mapping's
          </div>
        </div>
        <div className="notes-pair">
          <div className="topic">What are some common processors?</div>
          <div className="description">
            <ul>
              <li>
                <b>gsub</b>: takes a pattern and a replacement to swap out a
                section of a string field
              </li>
              <li>
                <b>convert</b>: changes the type of a field
              </li>
              <li>
                <b>set</b>: sets the values of a field (also can take an
                optional if property like "if": ctx['locales'].empty)
              </li>
              <li>
                <b>remove</b>: deletes a field from a document
              </li>
              <li>
                <b>foreach</b>: this is a processor that takes a processor, it
                applies a processor to every elemnt of an array field
              </li>
              <li>
                <b>grok</b>: it parses a string field pattern and maps the
                extracted matches to separate fields (complex syntax)
              </li>
              <li>
                <b>join</b>: similar to JS method, it
              </li>
            </ul>
          </div>
        </div>
        <div className="notes-pair">
          <div className="topic">What are common tokenizers?</div>
          <div className="description">
            <ul>
              <li>
                <b>Standard</b>:{" "}
              </li>
              <li>
                <b>Lowercase</b>: it splits a string into words delimited any
                non-letter (like the letter tokenizer), then lowercases the
                tokens (like the lowercase token filter)
              </li>
              <li>
                <b>Classic</b>: splits words by spaces and hyphens if not
                followed by number, keeps apostrophes, and removes puncuation
                unless it's a dot not faollowed by a space, recognizes email
                addresses{" "}
              </li>
              <li>
                <b>Letter Tokenizer</b>: splits a string into words delimited
                any non-letter
              </li>
              <li>English: </li>
            </ul>
          </div>
        </div>
        <div className="notes-pair">
          <div className="topic">
            What are common token filters (called filters?
          </div>
          <div className="description">
            <ul>
              <li>
                <b>Lowercase</b>: makes all tokens lowercase{" "}
              </li>
              <li>
                <b>Classic</b>: removes the english possessive ('s) from the end
                of words and removes dots from acronyms (A.B.C.)
              </li>
              <li>
                <b>Snowball</b>: it's a stemmer (can configure "language" when
                setting up your snowball filter)
              </li>
              <li>
                <b>ASCII folding</b>: converts letters like "çíà" into Basic
                Latin Unicode block{" "}
              </li>
              <li>
                <b>keyword_repeat</b>: it keeps the stemmed and unstemmed
                version of each token in a stream if used with a stemmer, then
                you can add remove_duplicates filter incase the stemmed version
                is identical
              </li>
              <li>remove_duplicates: self explanatory</li>
              <li>
                <b>delimited_payload</b>: removes the default | delimiter, or
                you can configure it to parse with a different one like{" "}
                {`"delimiter": "+"`}
              </li>
              <li>
                <b>Normalization filters</b>: these address characters from
                other languages
              </li>
              <li>Trim: Removes leading and trailing whitespace</li>
              <li>
                <b>Stemmer</b>: can be configured for different languages,
                porter is default
              </li>
              <li>
                <b>Stemmer_override</b>: this is cool cause like mapping a
                custom character filter, this stemmer override built in stemmer
                lets you configure it with a whole document of translations like
                <textarea
                  rows={5}
                  defaultValue={`
    running => run
    swam => swim
    stemmer => stemmer
              `}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
