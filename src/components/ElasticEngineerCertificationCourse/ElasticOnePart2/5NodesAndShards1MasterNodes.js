import React, { Component } from "react";

export default class NodesAndShards extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 5 Nodes and Shards: Lesson 5.1 Master Nodes</h2>
        <h3>NOT DIRECTLY ON EXAM</h3>
        <br />
        {/* slides 328-350 */}
        <div>
          Topics: setting the host/port of the http and transport level
          communication, special values to avoid hard coding ip addresses
          network.host: _site_, discovery module discovery.seed_hosts, what's
          included in cluster state, responsibility of master node, list of
          voting nodes cluster_coordination cluster setting, back up master
          nodes, bootstraping with cluster.initial_master_nodes
        </div>
        <div>
          <h4>NOTES</h4>
          HTTP vs. Transport Communication
          <br />
          HTTP is the exposed APIs, and transportation layer which is how nodes
          communicate with eachother in the back end
          <br />
          HTTP is bound to localhost by default and can be set explicitly with
          http.host, default port 9200 and can be set with http.port
          <br />
          Transport is bound to localhost by default and can be set explicitly
          with http.host, default port 9200 and can be set with http.port
        </div>
        <div className="pair">
          <div className="question">
            How do you set the host and port of the HTTP communication
          </div>
          <div className="answer">below are default values (set in yml?)</div>
          <textarea
            rows={4}
            defaultValue={`
    http.host: localhost
    http.port: 9200
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How do you set the host and port of transport communication
          </div>
          <div className="answer">below are default values (set in yml?)</div>
          <textarea
            rows={4}
            defaultValue={`
    transport.host: localhost
    transport.tcp.port: 9300
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How can you configure both the http and the transportation layer
            settings at once?
          </div>
          <div className="answer">with network.* settings</div>
          <textarea
            rows={4}
            defaultValue={`
    network.host: localhost
    network.port: 9300
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            What are the special values for network settings?
          </div>
          <div className="answer">
            These help to avoid hard-coding IP addresses. _local_ is the
            loopback address.
          </div>
          <textarea
            rows={5}
            defaultValue={`
    network.host: _site_        <--- important for exam
    http.publish_host: _global_
    transport.bind_host: _local_
              `}
          />
        </div>
        <div className="pair">
          <div className="question">What's the discovery module?</div>
          <div className="answer">
            It's how a node knows which other nodes are in the cluster, via SEED
            HOSTS which is a list of hostnames of fellow nodes.
          </div>
        </div>
        <div className="pair">
          <div className="question">How is the discovery module used?</div>
          <div className="answer">
            Wen a node starts up, they look for the rest of the nodes in the
            cluster. The start with the first host in the list of seed hosts and
            try to find the node at that host ip address.
          </div>
        </div>

        <div className="pair">
          <div className="question">How to configure the discovery module?</div>
          <div className="answer">in yml file with discovery.seed_hosts</div>
          <textarea
            rows={3}
            defaultValue={`
    discovery.seed_hosts: ["server1", "server2", "server3"]
              `}
          />
        </div>
        <div className="pair">
          <div className="question">Describe cluster state?</div>
          <div className="answer">
            You can get it with <code>GET _cluster/state</code>
            <br />
            it has the mappings, settings, shard allocation, and indices
            <br />
            it's stored on each node, but only changed by master node
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What is the master node responsible for?
          </div>
          <div className="answer">
            It's the only one node that can change/add/delete indices, nodes
            and/or shard allocation
          </div>
        </div>
        <div className="pair">
          <div className="question">How does a node become master?</div>
          <div className="answer">
            First it has to be configured as master eligible as node.master:
            true in yml.
            <br />
            Then it has to be elected. Has to be enough nodes to break a tied
            vote to avoid split brain (two master nodes, aka two cluster state
            managers)
            <br />
            Cluster state has a list of voting node ids. If there is an even
            amount of master-eligible nodes, one will automatically be left off
            the list. (kind cool)
          </div>
          <textarea
            rows={3}
            defaultValue={`
    GET /_cluster/state?filter_path=metadata.cluster_coordination.last_committed_config
              `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How to ensure high availability of master node?
          </div>
          <div className="answer">
            Back ups incase the first master node goes down. When it comes back
            up, it'll no longer be the master eligible node.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            How to initialize a cluster with a master node?
          </div>
          <div className="answer">
            Bootstrapping: when you start your cluster, the master nodes have to
            have the following setting
          </div>
          <textarea
            rows={3}
            defaultValue={`
    cluster.initial_master_nodes: ["node1", "node2", "node3"]              `}
          />
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• Elasticsearch uses two network communication mechanisms: HTTP
          for REST clients; and transport for inter-node communication <br />{" "}
          The details of a cluster are maintained in the cluster state <br />{" "}
          Every cluster has one node designated as the master <br /> You need to
          bootstrap the Elasticsearch cluster when you start it for the very
          first time
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>

          <div className="pair">
            <div className="question">
              1. How does a new node joining a cluster find the cluster?
            </div>
            <div className="answer">
              When a new nodes starts up, it looks in it's yml config to find
              the discovery.seed_host list of ip addresses, it looks for those
              addresses to find the other nodes and join the cluster.
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. What do you need to do for bootstrapping a cluster?
            </div>
            <div className="answer">
              each master node needs cluster.initial_master_nodes list in yml
            </div>
          </div>
          <div className="pair">
            <div className="question">
              3. True or False: Every Elasticsearch cluster should run an even
              number of nodes.
            </div>
            <div className="answer">
              FALSE need odd number of voting, master eligible nodes for master
              node election quorums.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
