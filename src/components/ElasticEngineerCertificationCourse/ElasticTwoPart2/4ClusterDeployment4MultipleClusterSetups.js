import React, { Component } from "react";
// import CreateFollowerIndex from "./images/CreateFollowerIndex.png";

export default class ClusterDeployment4 extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 4 Cluster Deployment Part 4: Multiple Cluster Setups</h2>
        <h3>Cross Cluster Search (CCS) AND Cross Cluster Replication (CCR) </h3>
        <div className="exam-objective">
          <h3>Objectives covered in this section include:</h3>
          <br />
          <ul
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "10px",
            }}
          >
            <li>Configure a cluster for cross cluster search</li>
            <li>
              Write and execute a query that searches across multiple clusters
            </li>
            <li>CCR IS NOT ON THE EXAM</li>
          </ul>
        </div>
        <br />
        <hr />

        <div className="exam-objective">
          <h3>** Configure a cluster for cross cluster search</h3>
          <div className="pair">
            <div className="question">
              How to make one cluster aware of the other to enable Cross Cluster
              search?
            </div>
            <div className="answer">
              <h4> Configure remote cluster</h4>
              <p>
                seeds is a list of nodes in the remote cluster, seed nodes are
                indentified by HOST.IP and PORT NUMBER
              </p>
              <textarea
                rows={49}
                defaultValue={`
    3 examples

    slides:
    PUT _cluster/settings
    {
      "persistent": {
        "cluster.remote": {
          "germany_cluster": {
            "seeds": [
              "my_server:9300",
              "64.33.90.170:9300"
            ]
          }
        }
      }
    }

    docs:
    PUT _cluster/settings
    {
      "persistent": {
        "cluster": {
          "remote": {
            "cluster_one": {
              "seeds": [ "10.0.1.1:9300" ]
            }
          }
        }
      }
    }

    labs:
    PUT _cluster/settings
    {
      "persistent": {
        "cluster": {
          "remote": {
            "my_cluster_2": {
              "seeds": [
                "server6:9300"
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
        </div>
        <br />
        <hr />
        <div className="exam-objective">
          <h3>
            ** Write and execute a query that searches across multiple clusters
          </h3>

          <div className="pair">
            <div className="question">
              How to search the blogs index on the other?{" "}
            </div>
            <div className="answer">
              prefix the index name with the remote cluster name -->{" "}
              <code>{`GET cluster_name:index_name/_search`}</code>
              <textarea
                rows={10}
                defaultValue={`
    GET germany_cluster:blogs/_search
    {
      "query": {
        "match": {
          "title": "network"
        }
      }
    }
              `}
              />
            </div>
          </div>
          <div className="pair">
            <div className="question">
              How to search the local index and the indices on the remote
              clusters?{" "}
            </div>
            <div className="answer">
              with wildcard {`GET index_name,*:index_name/_search`}
              <textarea
                rows={10}
                defaultValue={`
    GET blogs,*:blogs/_search
    {
      "query": {
        "match": {
          "title": "network"
        }
      }
    }
              `}
              />
            </div>
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />
          • Cross cluster search allows you to search multiple clusters within
          the same search request
          <br />• You can configure CCR through the Kibana management UI in the
          local cluster ‒or through the dedicated API
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              Why would you use cross cluster search? ?
            </div>
            <div className="answer">
              To have a single view of the data spread across multiple clusters.
            </div>
          </div>

          <div className="pair">
            <div className="question">
              True or False. You can write data into follower indices.
            </div>
            <div className="answer">FALSE it's a read only</div>
          </div>
          {/*
           <hr />
          <br />
          <br />
          <div className="Notes">
            <h3>Notes</h3> <br />
            <h3>Cross Cluster Search</h3>
            <br />
            Demo: seeds are publically broadcast servers, needs port cause it's
            on the transport layer
            <textarea
              row={12}
              defaultValue={`
            PUT _cluster/settings
            {
              "persistent": {
                "cluster.remote": {
                  "server6_cluster": {
                    "seeds": ["server6:9300"]
                  }
                }
              }
            }
            `}
            />
            <br />
            Now look in Kibana management dashboard for registration of the
            remote cluster, see it listed as server6_cluster.
            <br />
            Here is how you would search the blogs index across two clusters
            <textarea
              row={10}
              defaultValue={`
             GET blogs, server6_cluster:blogs/_search
            { 
              "query":{
                "match": {
                  "title": "network"
                }
              }
            }
            `}
            />
            <br />
            Use this command:
            <br />
            ./kibana/bin/kibana --elasticsearch.hosts="http://server6:9200"
            --elasticsearch.username=kibana --elasticsearch.password=password
            <br />
            <h3>
              Cross Cluster Replication: need platium license subscription from
              Elastic
            </h3>
            Leader and Follower index
            <br />
            Leader is on original cluster, Follower is only my_cluster_2 to
            follow another cluster's indice, so whenever there is a change to
            the original index, it will be updated with exact same commands
            <br />
            <img src={CreateFollowerIndex} alt="CreateFollowerIndex" />
            <br />
            You can use a wildcat query to search across all cluster that have
            the index name
              fill this in 
            <br />
            <div>
              Define Remote Clusters: slide 297 on how to set it up in Kibana
            </div>
            <div className="pair">
              <div className="question">
                Can you create a follower index on both Kibana and in the dev
                tools?
              </div>
              <div className="answer">Yes</div>
            </div>
            <br />
          </div>
          <br />
          <div className="Notes">
            <h3>Notes</h3> <br />
            <h1>Cross Cluster Replication</h1>
            <div className="pair">
              <div className="question">
                Use case, why would you bring an index from a remote cluster
                into your local cluster?
              </div>
              <div className="answer">
                for availability, disaster recovery, data locality and
                centralized reporting purposes (replicate it into a reporting
                cluster)
              </div>
            </div>
            <div className="pair">
              <div className="question">How do you implement it?</div>
              <div className="answer">
                <br /> index by index basis
                <br /> leader and a follower (can only write to leader)
                <br /> follower keeps requested updates from the leader to sync
                up, shard will get info from corresponding shard
              </div>
            </div>
            <div className="pair">
              <div className="question">How to set up a remote cluster? </div>
              <div className="answer">
                Option #1: In kibana management dashboard, click "remote
                cluster", " add a remote cluster" to your local, set up name and
                seed nodes (server1:9300)
                <br />
                Option #2: _cluster settings API
              </div>
            </div>
            <div className="pair">
              <div className="question">
                How to initiate cross cluster replication?
              </div>
              <div className="answer">
                Option #1: In Kibana management dashboard, click "cross cluster
                replication", "Add Follower Index" set up remote cluster, leader
                and follower indices
                <br />
                Option #2: Kibana dev tools
                <textarea
                  rows={12}
                  defaultValue={`
                generic
                PUT follower_index/_ccr/follow
                {
                  "remote_cluster": "my_remote_cluster",
                  "leader_index": "leader_index"
                }
                
                PUT blogs_copy/_ccr/follow
                {
                  "remote_cluster": "my_remote_cluster",
                  "leader_index": "blogs_ccr"
                }
              `}
                />
              </div>
            </div>
            <div className="pair">
              <div className="question">
                How to initiate cross cluster Replication for Index Patterns?
              </div>
              <div className="answer">
                CLI
                <textarea
                  rows={10}
                  defaultValue={`
                generic
                PUT _ccr/auto_follow/logs
                {
                  "remote_cluster": "my_remote_cluster",
                  "leader_index_patterns" : [ "logs*" ],
                  "follow_index_pattern" : "{{leader_index}}-copy"
                 }
              `}
                />
              </div>
            </div>
            <div className="pair">
              <div className="question">Why Cross Cluster Replication?</div>
              <div className="answer">
                Disaster Recovery (DR) / High Availability (HA)
                <br />
                Data Locality: can be helpful for CDN, Europe can have their
                copy of the index in a local cluster
              </div>
            </div>
            <div className="pair">
              <div className="question">CCR is on Index by Index basis</div>
              <div className="answer">
                Replication is configured at the index level:source is leader
                index, target is follower index{" "}
              </div>
            </div>
            <div className="pair">
              <div className="question">Replication is Active-Passive</div>
              <div className="answer">
                the follow is only used for reads, leader is the only one that
                does writes (and reads)
              </div>
            </div>
            <div className="pair">
              <div className="question">Replication is Pull-Based</div>
              <div className="answer">
                driven by follower index, leader doesnt need to know anything.
                my_remote_cluster has the leader index and my_local_cluster has
                the follower index
              </div>
            </div>
          </div>
          <div className="summary">
            <h3> Summary </h3>
            <br /> • Cross cluster replication allows you to replicate indices
            in a remote cluster to a local cluster
          </div>
          <div className="quiz">
            <h3>QUIZ</h3>
            <div className="pair">
              <div className="question">
                Why would you use cross cluster replication?{" "}
              </div>
              <div className="answer">
                availability, disaster recovery etc; locality: distributing the
                load in a geographic etc...
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    );
  }
}
