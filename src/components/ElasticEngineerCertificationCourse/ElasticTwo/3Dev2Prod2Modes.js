import React, { Component } from "react";

export default class Dev2Prod2Modes extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Development to Production: Development v. Production Mode</h2>
        <div className="executive-summary">
          <h4>not directly related to an exam objective</h4>
          <h3>Executive Summary</h3>
          <ul>
            <li>
              Bootstrap checks happen when node starts up, in prod mode any
              errors will prevent start up
              <ul>
                <li>
                  make sure the heap size in jvm.options is the same as the max
                  size
                </li>
                <li>
                  and make sure that all the nodes are listed in the
                  discovery.seed_host settings of yml file
                </li>
              </ul>
            </li>

            <li>
              Caching: aggs are cached by default, queries are not
              <ul>
                <li>
                  With an agg, size 0 turns caching on. size >0 turns it off.
                </li>
                <li>
                  Another way to force caching on (or off) is with query param{" "}
                  {`?request_cache=true`}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="Notes">
          <h3>Notes</h3>

          <div className="pair">
            <p>HTTP v Transport</p>
            <div className="question">Development vs. Production Mode</div>
            <textarea
              rows={8}
              defaultValue={`
            my_dev_cluster
              my_prod_cluster
              http.port: 9200
              http.host: 192.168.1.21
              transport.tcp.port: 9300
              transport.bind_host: 192.168.1.21
            `}
            />
          </div>
          <div className="pair">
            <div className="question">Bootstrap Checks</div>
            <div className="answer">
              heap size has to be the same as max (cant be above 30g), discovery
              config for running multiple nodes (discovery.seed_host)
            </div>
          </div>
          <h2>Cache</h2>
          <div className="pair">
            <div className="question">When is a Query Cached?</div>
            <div className="answer">
              request_cache=true, aggs size 0, and filter searches are cached
              <br /> Use Filter for non-scoring yes/no questions, cant be cached
              unles you use filter, lightening speed on 2nd time
            </div>
          </div>
          <div className="pair">
            <div className="question">
              what's Least Recently Used (LRU) eviction policy?
            </div>
            <div className="answer">
              The cache uses an LRU eviction policy: when the cache is full, the
              least recently used query results are evicted to make way for new
              data.
            </div>
          </div>
          <div className="pair">
            <div className="question">Are aggs auto cached?</div>
            <div className="answer">
              Pretty much unless size > 0. Buckets are also auto cached.
              (Sidenote: Aggs are default candidates for caching, unless master
              node decides not to until the 3rd time (rare).)
            </div>
          </div>
          <div className="pair">
            <div className="question">
              When are aggregation searches not cached?
            </div>
            <div className="answer">
              When you dont specify size=0 on an aggregation, it is inherently a
              match_all query. The default # of documents is 10. So the
              aggregation will return 10 documents. (not 20 cause the size auto
              completes to 20)
            </div>
          </div>
          <div className="pair">
            <div className="question">Track total hits param </div>
            <div className="answer">
              Use track_total_hits helps provide the hits count more tha 10,000.
              Cause otherwise it will max out for performance reasons.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to force caching (without size 0)?
            </div>
            <div className="answer">
              Query param forces caching {`?request_cache=true`}
            </div>
          </div>
          <div className="pair">
            <div className="question">Configuration Management</div>
            <div className="answer">
              Linux Packages, tarball package, use a tool (like Puppet, Check,
              Ansible) for clusters with tons of nodes. Or easier to run in
              Elastic Cloud SaSS.
            </div>
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• A node in production mode must pass a series of checks, or the
          node will not start <br />• A query in a filter context can be cached
          by Elasticsearch to improve performance <br />• Installing
          Elasticsearch with Linux packages makes it easier to manage your
          cluster configurations
        </div>
        <br />
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. True or False. In production mode, if a bootstrap check fails
              then the node will not start.
            </div>
            <div className="answer">
              True, in dev env just warning. Bootstrap checks aim to make sure
              you have the basic requirement to run in production, if one fails,
              Elasticsearch is not going to start.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False. Elasticsearch caches any query to improve
              performance.
            </div>
            <div className="answer">
              FALSE only filter, aggs or when query param request_cache set to
              true.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. Why would you use Linux packages to install Elasticsearch?
            </div>
            <div className="answer">
              For example, to store the configuration and log files in standard
              locations, and to take advantage of updates through package
              management
              <br />
              Dependency mgmt,standardization of file location, configuration
              etc
            </div>
          </div>
        </div>
      </div>
    );
  }
}
