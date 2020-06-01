import React, { Component } from "react";
import OverviewOfUpgrades from "./images/OverviewOfUpgrades.png";
export default class Aggregations extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 4 Cluster Deployment Part 2: Overview of Upgrades and Cluster
          Restart
        </h2>
        <br />
        <div>
          <div>
            ´h3 regarding bringing back up nodes in your cluster: start with the
            master node, and only move on to 2nd node when master has asigned
            its self master.
          </div>
          <div className="pair">
            <div className="question">
              What are the two types of upgrades for new versions of
              ElasticSearch?
            </div>
            <div className="answer">
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <h3>A rolling upgrade</h3>
                  <ul>
                    <li>
                      no downtime, reads and writes continue to operate normally
                    </li>
                    <li>for minor version changes like 7.6 to 7.7</li>
                    <li>
                      nodes updated one at a time, master eligible nodes get
                      updated last
                    </li>
                    <li>
                      Steps: DISABLE SHARD ALLOCATION for replicas
                      <br /> WHY? the allocation process replicates the shards
                      on a node that's shut down to other nodes in the cluster,
                      which can involve a lot of I/O. Since the node is shortly
                      going to be restarted, this I/O is unnecessary.
                      <textarea
                        rows={8}
                        defaultValue={`
            PUT _cluster/settings
            {
              "transient": {
                "cluster.routing.allocation.enable": "primaries"
              }
            }

            POST _flush/synced
            `}
                      />
                      <br />
                      once finished, reset -->{" "}
                      <code>"cluster.routing.allocation.enable": "all"</code>
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <h3>A full cluster restart</h3>
                  <ul>
                    <li>some downtime, cluster unavailable during update</li>
                    <li>faster than a rolling upgrade</li>
                    <li>for major version changes like 6.0 to 7.0</li>
                    <li>
                      Steps: back up your cluster before hand!!
                      <textarea
                        rows={8}
                        defaultValue={`
            PUT _cluster/settings
            {
              "persistent”": {
                "cluster.routing.allocation.enable": "primaries"
              }
            }

            POST _flush/synced
            `}
                      />
                    </li>
                  </ul>
                </li>
                <br />
                <br />
                <li>
                  **Note: Sometimes you will need to BOTH reindex and do a full
                  cluster restart. If you have indices from 2 major versions
                  ago, you have to reindex.
                </li>
              </ul>
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className="pair">
            <div className="question">
              <h3>transient v persistent”</h3> Before an upgrade, when do you
              disable shard allocation on a transient basis versus a permenant
              basis?
            </div>
            <div className="answer">
              Well since persistent type of setting is one that persistents
              through a restart, so set allocation to primaries only during a
              full cluster restart.
              <br />
              And for a rolling restart, do the disable shard allocation under
              transient settings on your cluster.
            </div>
          </div>
          <div className="pair">
            <div className="question">What's a synced flush</div>
            <div className="answer">
              it's a way to ensure the data is stored permanently stored in a
              Lucene index (if it's currently only on a transaction log)
            </div>
          </div>

          <br />
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />
          - Major and minor versions contains a lot of new features <br />
          - Mainly major versions will have breaking changes <br />
          <ul>
            <li>
              minor versions might have breaking changes in experimental
              features or due to bug fixes
            </li>
          </ul>
          - When upgrading to a new major version of Elasticsearch
          <ul>
            <li>
              use rolling upgrades if you are onthe latest minor (6.8 to 7.2){" "}
            </li>
            <li>use a full cluster restart otherwise (e.g. 6.3 to 7.2) </li>
          </ul>
          - A rolling upgrade allows the nodes in the cluster to be restarted
          one at a time (no downtime) <br />- A full cluster restart usually
          makes updates faster, though it requires bringing all nodes down
          before the update
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. True or False. You can search and index documents during a
              rolling restart.
            </div>
            <div className="answer">TRUE but it slows down recovery time</div>
          </div>
          <div className="pair">
            <div className="question">
              2. What is the benefit of performing a synced flush right before a
              node restart?
            </div>
            <div className="answer">
              It greatly speeds up the recovery time of indices that have not
              changed while the node (or nodes) was down{" "}
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False. You can upgrade from 6.1 to 7.1 with a single
              rolling restart.
            </div>
            <div className="answer">
              FALSE need full cluster restart (can do rolling restart until 6.8)
              <b />
              True, but you need to first upgrade from 6.1 to 6.8 and then from
              6.8 to 7.3
            </div>
          </div>
        </div>
        <hr />
        <div className="Notes">
          <h3>Notes</h3> <br />
          When you restart a node, have to wait for node1 to restart and assign
          itself as master before starting up new nodes.
          <br />
          <h4>Upgrades</h4>
          major, minor version and patch level or maintenance
          <br />A major version adds breaking changes and new features you have
          to reindex indices that were created two versions ago. Otherwise, a
          index can jump one major version.
          <br />
          fill in Slides 250 to 253 Rolling restarts or full cluster restart,
          downtime (no GET or PUT commands)
          <br />
          <img
            style={{ width: "80%", margin: "7px auto" }}
            src={OverviewOfUpgrades}
            alt="OverviewOfUpgrades"
          />
          <br />
          <h3>Cluster Restart</h3>
          Full cluster restart is faster but has downtime Rolling restart means
          that a node/server goes down one at a time
          <h3>Steps for rolling restart:</h3>
          1) stop non essential indicing
          <br />
          2) disable shard allocation BIG ONE cause otherwise the master node
          tries to promote replicas to primary
          <br />
          <textarea
            rows={8}
            defaultValue={`
            PUT _cluster/settings
            {
              "transient": {
                "cluster.routing.allocation.enable" : "none"
              }
            }
            `}
          />
          <br />
          restore settings once finished
          <br />
          <textarea
            rows={8}
            defaultValue={`
            PUT _cluster/settings
            {
              "transient": {
                "cluster.routing.allocation.enable": "all"
              }
            }
            `}
          />
          <br />
          check status {`GET _cat/health`} and {`GET _cat/nodes`}
          <h3>Steps for Full Cluster Restart:</h3>
          Scheduled downtime, disable shard allocation, synced flush to clear
          data, start master nodes first, reenable shard allocation
          <br />
        </div>
      </div>
    );
  }
}
