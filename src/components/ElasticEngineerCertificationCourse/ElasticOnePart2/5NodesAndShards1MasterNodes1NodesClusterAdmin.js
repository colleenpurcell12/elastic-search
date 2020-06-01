import React, { Component } from "react";

export default class ClusterAdmin extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Cluster Administration</h2>
        <div className="pair">
          <h3> Nodes in a Cluster</h3>
          Add nodes to our cluster to spread the load over multiple machines,
          that work separately, nothing centralized that's
          organizing/controlling. parallel computing, not a giant machine
          <br />
          <h4> Communication Between the Nodes:HTTP and transport </h4>
          <br />
          default opens 2 ports HTTP and transport layer
          <h5> HTTP Communication</h5>
          <br />
          The HTTP port lets you do the CRUD operations via curl requests
          <br />
          Cluster of multiple nodes requires the transport layer to communicate
          over a separate port, so it's not sitting in the same task queue.
          <br />
          HTTP is for the rest of the world (only client), node communication is
          only for the insiders so it doesnt need to be opened up and you dont
          have to worry about security and firewall.
          <br />
          HTTP port localhost 9200, to use ES out of the box, they assume you're
          on a dev env locally (localhost is the loop back address)
          configuration variables
          <br />
          http.host is localhost
          <br />
          http.port is 9200
          <br />
          <h5> Transport Communication</h5>
          <br />
          configure with transport.host and transport.tcp.port 9300
          <br />
          you can configure jointly with network.host and network.port like in
          the labs
          <br />
          Reserved values instead of hard coding IP addresses
          {/* TODO add the SpecialValuesForNetworkSetting image here */}
          <br />
          gonna use _site_ for the labs so it's kibana as well as our local
          service
          <br />
          to bind both transport and HTTP protocols to a site-local address, add
          this to the elastic.yml config file:
          <br />
          network.host: _site_
          <br />
          The network.host setting will update both bind_host and publish_host
          for both the transport and HTTP protocols. <br />
          The _site_ value binds to any site-local addresses on the system, in
          this case the server IP.
          <h4> Discover Module</h4>
          <br />
          The discovery module is responsible for discovering nodes within a
          cluster
          <br />
          To join a cluster, given a list of seed hosts (IP addresses) a node
          issues ping requests to find other nodes on the same network and
          determine if they are reachable. If it cant find any more nodes, it
          starts its own cluster.
          <br />
          look around for another node on the same cluster otherwise it assumes
          its the first node, seed host list
          <br />
          even with 100 nodes, still want 3 seed hosts cause if you cant find
          any of the three than its a network problem, dont need more
          <br />
          elasticsearch.yml is where you set this, only run once with bring up
          cluster
          <br /> statis default way to set seed host providers of a cluster (the
          IP addresses for each node)
          <br />
          discovery.seed_hosts: ["server1", "server2", "server3"]
          <h4> Cluster State and Master Nodes</h4>
          <br />
          file thats used is Cluster State
          <br />
          GET _cluster/state
          <br />
          only indexes info on the cluster state is which and where, no
          documents
          <br />
          shards live on disk on a machine (listed on routing table), no such
          thing as index control versions, track which documents deleted <br />
          admin node is master node which can change the cluster state, make
          edits to cluster state THEN sent the diffs to rest of nodes, more like
          a manager than a master decide where the shards live (which is
          determined by cluster state)
          <h5> Master-eligible Nodes</h5>
          The master node is elected from the master-eligible nodes in the
          cluster
          <br />
          if cluster 3 cant find the master node, it will become the master
          node. Split brain situation, more than one cluster state. No recovery
          from this, worst case scenario. slide 342
          <h4> Discovery Module</h4>
          ???
          <br />
          set node role to decide which tasks will be performed on which
          machine, like node 1 can perform being "master-eligible", which out
          that limits availability of master nodes.
          <h5>Master Node Election</h5>
          <br />
          If there are 2 master eligible nodes, there's a master node election
          which simply deemed the node winner by which has the lexigraphically
          first id.
          <br />
          there has to be a minimum of 2 nodes to be a cluster.
          <br />
          so the prior master node that thinks it's the only node, it cant move
          shards, edits index or alter the cluster state in any way.
          <br />
          So if node 1 can suddenly find node 2 and 3 again, then the newly
          updated state will rewrite the updated state which will overwrite the
          old cluster state.
          <br />
          <br /> if the master node is down, not reachable by other nodes due to
          network issues. The up nodes pick a new master node. And then when
          node1 comes back online, one of the other master-eligible nodes will
          be the master‒ so the prious master node will simply re-join the
          cluster as a master-eligible node.
          <h4>Voting Configuration:</h4>
          let ES handle it and provide the default
          <br />
          Just set the master eligible node role, you dont set the master node
          directly
          <br />
          GET /_cluster/state?filter_path=
          metadata.cluster_coordination.last_committed_config
          <br />
          <h4>Bootstrapping a Cluster</h4>
          <br />
          As of Version 7, have to set up Cluster with new setting, if you have
          multiple nodes, start with initial master nodes in yml file for the
          1st time the cluster is run. no changes after the cluster has been up
          <br />
          cluster.initial_master_nodes: ["node1", "node2", "node3"]
          <br />
          ^ some legacy requirement, important and required (in labs)
          <br />
        </div>

        <div className="pair">
          <div className="question">
            which Kibana GET request provides node info?
          </div>
          <div className="answer">GET _cat/nodes?v</div>
        </div>

        <div className="pair">
          <div className="question">What does network.host set?</div>
          <div className="answer">
            update both bind_host and publish_host for both the transport and
            HTTP protocols
          </div>
        </div>
        <div className="pair">
          <div className="question">What's _site_?</div>
          <div className="answer">site-local address</div>
        </div>
        <div className="pair">
          <div className="question">
            What's the static default way to et seed host providers of a cluster
            (the IP addresses for each node)?
          </div>
          <div className="answer">
            discovery.seed_hosts: ["server1", "server2", "server3"]
          </div>
        </div>

        <br />
        <br />
        <div className="pair">
          <div className="question">
            How do you add another node to your cluster?
          </div>
          <div className="answer">
            In the elastic.yml config file of the initial node set the following
          </div>
          <textarea
            rows={7}
            defaultValue={`
    cluster.name: my_cluster
    node.name: node1
    network.host:  _site_
    cluster.initial_master_nodes: ["node1"]
    discovery.seed_hosts: ["server1", "server2", "server3"]
              `}
          />
          <div className="answer">
            Then SSH into the next server host (server2) to create the new node
            there, and update it's yml config
          </div>
          <textarea
            rows={7}
            defaultValue={`
      cluster.name: my_cluster
      node.name: node2
      network.host:  _site_
      cluster.initial_master_nodes: ["node1"]
      discovery.seed_hosts: ["server1", "server2", "server3"]
              `}
          />
          <div className="answer">
            Lastly update node2's jvm.options file, Set -Xms and a -Xmx setting
            configured to 512m.
          </div>
        </div>
        <br />
        <br />
        <div className="summary">
          <h3> Summary </h3>
          <br />
        </div>

        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              How does a new node joining a cluster find the cluster?
            </div>
            <div className="answer">discovery module</div>
          </div>
          <div className="pair">
            <div className="question">
              What do you need to do for bootstrapping a cluster?{" "}
            </div>
            <div className="answer">cluster.initial_master_nodes</div>
          </div>
          <div className="pair">
            <div className="question">
              True or False: Every Elasticsearch cluster should run an even
              number of nodes.
            </div>
            <div className="answer">FALSE</div>
          </div>
          <div className="pair">
            <div className="question">ideal # of master eligible nodes?</div>
            <div className="answer">
              recommendation is 3 regardless of size of cluster, more on that
              tmrw
            </div>
          </div>
        </div>

        <br />
      </div>
      // </div>
    );
  }
}
