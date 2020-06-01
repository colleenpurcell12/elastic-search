import React, { Component } from "react";

export default class NodeIndexManagement2 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 5 Elasticsearch Nodes and Index Management: Lesson 5.2 Rollup
          and Rollover
        </h2>
        {/* <div>Lab 5.2</div> */}
        <div className="exam-objective">
          <h3>NOT on exam</h3>
          <h3>Contents: rollup, _rollover API, _shrink API, and _freeze API</h3>
          {/* slide 340 ish */}
          <h4>Rollups</h4>
          solution for retaining historical data without using too much memory
          <br /> new rollup feature that
          <br />‒ saves old data in a compact, aggregated format
          <br />‒ saves only the data that you are interested in
          <br /> active index (is_write_index = true)
          <h4>Rollover Pattern</h4>
          inactive index is shrunk (less primary nodes cause no longer need for
          indexing) and made read-only
          <br />
          alias name for an entire grouping of indices: where one is tagged as
          the write index which changes (updated for the new day's index, for
          instance of high throughput implementations)
          <h4>Rollover Index API</h4>
          rolls an alias over to a new index the name of the index must ends
          with a dash followed by anumber Step #1 create an alias
          <textarea
            rows={10}
            defaultValue={`
    PUT logs-1
    {
      "aliases": {
        "logs-alias": {
          "is_write_index": true
        }
      }
    }
            `}
          />
          Step #2 set rollover conditions, limits are for all primaries combined
          if a condition is met, then a new index is created
          <textarea
            rows={11}
            defaultValue={`
    POST logs-alias/_rollover
    {
      "conditions": {
        "max_age": "7d",
        "max_docs": 1000000,
        "max_size": "50gb"
      }
    }
            `}
          />
          <br />
          is_write_index property allows for a single alias to be both the write
          alias and the search alias
          <br />
          After a rollover, shrink an index: reduce # of primary shards, move
          from hot to warm
          <h4>Shrink Index API</h4>
          <br />
          shrink index API allows you to shrink an existing index
          <br />
          into a new index with fewer primary shards
          <h5>Preparing for Shrinking </h5>
          <br />
          Step #1:
          <br />• Allocate one copy of every shard to a single node;
          my_shrink_node.
          <br />• And Make the index read-only with {`"blocks.write": true`}
          <textarea
            rows={14}
            defaultValue={`
    PUT logs-1/_settings
    {
      "routing": {
        "allocation": {
          "require": {
            "my_tag": "my_shrink_node"
          }
        }
      },
      "blocks.write": true
    }
            `}
          />
          <br />
          Step #2:
          <br />• reduce primary shards to 1
          <br />• Set {`...my_tag": null`} to make sure the shards can be
          allocated to other nodes again
          <br />• Set {`"codec": "best_compression"`} which enables later
          merging segment files into a single segment with{" "}
          {`forcemerge?max_num_segments=1`}
          <textarea
            rows={13}
            defaultValue={`
    POST logs-1/_shrink/logs-1-inactive
    {
      "settings": {
        "index.number_of_shards": 1,
        "index.routing.allocation.require.my_tag": null,
        "codec": "best_compression"
      }
    }
            `}
          />
          but behind-the-scenes, the shard consists of multiple files
          <br />
          (referred to as segment files)
          <br />• As you are done writing to the index, you can merge those
          multiple segment files into a single segment
          <br />‒ also allows our best_compression setting to take effect
          <textarea
            rows={3}
            defaultValue={`
    POST logs-1-inactive/_forcemerge?max_num_segments=1 
            `}
          />
          <h5>Freezing an Index </h5>
          moving data to cold nodes and freezing the index
          <br /> benefits: almost no overhead on the cluster (but searches will
          take longer), persistent storage
          <br /> use _freeze API
          <textarea
            rows={3}
            defaultValue={`
    POST logs-2/_freeze
            `}
          />
        </div>
        <div className="Notes">
          <h3>Notes</h3> <br />
          Kibana has a GUI for index management like view status, delete, etc
          force merging? Eventual kibana will enable Change Mappings graphically
          Want monthly and yearly roll up
          <h5>Rollups</h5>
          <p>use case historical data</p>
          Story: At American Airline, to avoid surpassing the data limits, at 30
          days they'd purge with Curator product python. ILM instead.
          <br />
          One alternative was to move it into storage. Better to use Rollup.
          <br /> Every time a customer buys a ticket, 2000 lines of code are
          created, but only 2 documents mattered, the rest was varifying
          function calls. after 30 days, it was about metrics like 97.8% v 96%
          utilitzation, this time of year last year versus now.
          <br />
          Saving already aggregated data, moved into a new index, just saving
          the end result, every night or month etc, 85 million docs dailt,
          <br />
          Need about 24 documents is a lot less. haha By day, by product, by
          host--know what you need to not over aggregate it, drill down
          <br />
          PNR unique identifier
          <br />
          <p>
            Results aggregate into roll up index documents per bucket (like per
            host).
            <br />
            How to set it up (high level): Decide on datae internal for date
            histogram aggregation, which buckets and metrics to include.
          </p>
          <h6>Defining a Rollup Job</h6>
          1) set a job name, index pattern, my_metric_rollup is new rollup index
          name,
          <br />
          2) schedule the frequency, documents to roll up at a time, latency
          buffer (a week)
          <br />
          3) terms of aggregation: host and country (if you had 3 host and 200
          countries so 600 documents) Manage job
          <h6>How to access the metrics roll up?</h6>
          you a _rollup_search API (prior version, now it's just _search on roll
          up indices), aggregations on your aggregations
          <h5>Rollover Pattern</h5>
          better than rollups new index for everything like daily, can lead to
          too small (daily) or too large (monthly) indices
          <br />
          better to base new index based on size instead of time frequency
          <br />
          how to ensure always writing to the active index? ALIASES
          <br />
          cold warm and hot
          <br />
          rollover pattern relies on alias for active v inactive aliases
          <br />
          Template: # of replicas and shards, new active index will be created
          with the index pattern defined in the active template. You can put
          "is_write_index: true" IN THE TEMPLATE
          <br />
          Rollover conditions: at least one will trigger rollover, max # of
          daily, max size or max # of documents. Manual. Doesnt happen
          automatically.
          <textarea
            rows={10}
            defaultValue={`
    POST logs-alias/_rollover
    {
      "conditions": {
        "max_age": "7d",
        "max_docs": 1000000,
        "max_size": "50gb"
      }
    }
            `}
          />
          Index is so it is both write and read, in template, slide 354
          <br />
          <h4>Shrinking An Index with _shrink API</h4>
          <br />
          shrink # of primary shards when moving to warm node.
          <br />
          dont want to optimize for indexing anymore cause optimizing for query
          speed in warm.
          <br />
          target # of primaries must be a factor of the # of the original
          primaries (usually set to 1) one copy of every shard (P0 or R0) must
          be on the same node.
          <br />
          Preparing Step: make index read only
          <textarea
            rows={12}
            defaultValue={`
    POST logs-1/_shrink/logs-1-inactive
    {
      "settings": {
        "index.number_of_shards": 1,
        "index.routing.allocation.require.my_tag": null,
        "codec": "best_compression"
      }
    }

    POST logs-1-inactive/_forcemerge?max_num_segments=1

            `}
          />
          <br /> My shrink node
          <br /> Compress, save space by deleting
          <h4>Freezing an Index</h4>
          <br /> move to cold node and freeze, no overhead on cluster, memory
          moved to persistence storage,
          <br /> can still search but it'll just take longer, which is usually
          worth the trade off
          <textarea
            rows={3}
            defaultValue={`
    POST logs-2/_freeze
            `}
          />
        </div>
        <div className="demo">
          <h5>DEMO steps:</h5>
          <br />
          create index, routing it to hot node, alias is write index without
          template
          <br />
          use cat indices?v
          <br />
          POST 3 new documents
          <br />
          get count: GET logs-000001/_count and verify it's 3
          <br />
          then POST logs/_rollover
          <br />
          {`{conditions: max age is 1d, max docs is 2, max size is 1gb}`}
          <br />
          settings routing allocation require my temp hot
          <br />
          use cat indices?v
          <br />
          when criteria of max 3 documents, dont mover the docs right away into
          the spill over index
          <br />
          puts documents 4 and 5, those are routed to logs-000002 instead of
          logs-00001
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />
          <br /> •Rollups allow you to store aggregated results of data ‒it
          greatly reduces the amount of storage space needed to retain the data
          <br /> •Time-series indices often use a rollover pattern‒indexing is
          performed on an active index ‒when the active index is either too full
          or too old, roll it over to a new index
          <br /> •You can freeze a read-only index ‒the will have almost no
          overhead on the cluster ‒but searches will take longer
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1.What are the three conditions that you can configure for an
              index to rollover?
            </div>
            <div className="answer">
              max age, maz size and max docs-->time, size and number of docments
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2.True or False. A frozen index is closed and must be opened
              before it can be searched.
            </div>
            <div className="answer">FALSE you can search, just slow</div>
          </div>
          <div className="pair">
            <div className="question">
              3.True or False. To search a rolled up index, you need to use the
              _rollup_search endpoint.
            </div>
            <div className="answer">depends on the version</div>
          </div>
        </div>
      </div>
    );
  }
}
