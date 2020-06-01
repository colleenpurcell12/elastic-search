import React, { Component } from "react";

export default class Dev2Prod3Scaling extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Development to Production: Scaling</h2>
        <div className="executive-summary">
          <h4>not directly related to an exam objective</h4>
          <h3>Executive Summary</h3>
          Overallocating is having more shards than nodes, but it can be good
          cause it provides room to grow when new node is added.
          <br />
          If you're Optimizing for reads (queries), you want more replicas
          because they can do just as good of a job as primary shards and share
          the load.
          <br />
          If you're optimizing for write (indexing), you want more primaries
          because then the shards responsible for saving documents are spread
          out over more primary shards who bear the brunt of the load for
          writing, before the replicas have to mimic the work.
        </div>

        <div className="pair">
          <div className="question">Scaling for Reads</div>
          <div className="answer">
            <ul>
              <li> More replicas make queries faster</li>
            </ul>
            For searches, no different between primary and replica shards. More
            replicas make queries faster, cause burden distributed over more
            helpers. Replicas cant be on the same node as the primary. Downside
            is that it slows down indexing and takes up diskspace.
          </div>
        </div>
        <div className="pair">
          <div className="question">Optimizing for Read Throughput</div>
          <div className="answer">
            Get as many replica shards as nodes (minus one for primary copy of
            the shard data)
            <ul>
              <li>avoid nested data types, slow to query those</li>
              <li>
                Use copy_to to avoid using slower multi_match queries--If you
                have a field that has both first and last name for queries on
                both those fields ()
              </li>
              <li>keyword field searches</li>
              <li>force merge read only indices that are no longer updated</li>
              <li>use cachable filter queries</li>
            </ul>
          </div>
        </div>
        <div className="pair">
          <div className="question">Scaling for Writes</div>
          <div className="answer">
            <ul>
              <li> More primary makes indexing faster</li>
            </ul>
            More primary shards, "fan out" so each does less work. Lifecycle
            management can reduce # of the shards when writing is finished so we
            can switch back to read optimizations so dont have to pull data back
            together for indexes with documents across 10 shards.
            <br />
            All three nodes with 3 diff primaries can handle write requests in
            parallel
          </div>
        </div>
        <div className="pair">
          <div className="question">Optimizing for Write Throughput</div>
          <div className="answer">
            <ul>
              <li>
                For many updates, use _bulk instead of multiple PUT requests
              </li>

              <li>
                use refresh_interval:
                <ul>
                  <li>
                    set index.refresh_interval to -1 for very large writes (then
                    back to default when finished indexing)
                  </li>
                  <li>
                    set index.refresh_interval to 30s to increase indexing speed
                    but affect search as little as possible (e.g. logs use case)
                  </li>
                </ul>
              </li>
              <li>Disable replicas</li>
            </ul>
          </div>
        </div>

        <div className="pair">
          <div className="question">How to optimize for reindexing?</div>
          <div className="answer">
            Set the refresh_interval to -1 to disable and the number_of_replicas
            to 0 for efficient reindexing.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            If you had 3 primary shards and only 2 nodes, what's the max number
            of replica shards?
          </div>
          <div className="answer">
            There would be only one set of back up shards on the 2nd node --> 3.
          </div>
        </div>
        <div className="pair">
          <div className="question">
            What's Shard Overallocation (or Oversharding) and what are the trade
            offs?
          </div>
          <div className="answer">
            It's when there're more shards than nodes. Good for future scaling,
            but too many shards and it's slow to query cause you have to join
            the responses together from each shard. Since there is memory
            overhead for each shard, it becomes a storage issue to have too
            many.
          </div>
        </div>

        <div className="pair">
          <div className="question">
            Why use auto-generated IDs with POST request, instead of PUTs?
          </div>
          <div className="answer">
            Faster cause if you give an id of 77, it first has to check if there
            is a doc with that id.
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br /> • If you are expecting your cluster to grow, then it is good to
          plan for that by overallocating shards (which means you have more
          primary shards than nodes)
          <br />• A little overallocation is good. A “kagillion” shards is not
          <br />• You can scale the read workload of your cluster by adding more
          nodes and increasing the number of replicas of your indices
          <br />• You can scale the write workload of your cluster by adding
          more nodes and increasing the number of primaries of your indices
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              If you have a two node cluster, why would you ever create an index
              with more than two primary shards?
            </div>
            <div className="answer">
              Overallocate! It allows for future scaling of the cluster
            </div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. To maximize read throughput you need to divide your
              data over as many primaries as possible
            </div>
            <div className="answer">
              False. Use replicas instead. If your data fits in one primary, add
              as many replicas as you have additional nodes to query your data
              in parallel
            </div>
          </div>
          <div className="pair">
            <div className="question">
              True or False. Using auto-generated IDs is more efficient than
              providing your own IDs.
            </div>
            <div className="answer">TRUE</div>
          </div>
        </div>
        <div className="Notes">
          <h3>Notes</h3>
          <div>
            <br />
            auto_expand_replicas
            <br />
            copy_to
          </div>
          If you have two shards on a node, that's not scaling.
          <br />
          Elastic automatically balances shards across nodes when more are added
          <br />
          shard relocation doesnt require bringing cluster down
          <br /> when you have >278 nodes in a cluster, it's better to set up
          another cluster and do cross cluster communication
          <br />
          <h4>* Oversharding</h4>
          you can always change # of replica shards. Before V7.0 default shards
          number is 5 even with only 3 nodes, oversharding mean you have to join
          things back.
          <br /> now the default shards is 1. If 3 nodes, you should have 3
          shards.
          <br />
          goal is to alwasy stay distributed and available
          <br />
          <h4>Node Degregation</h4> is a sign for the need to manually move
          shard around, usually master node manages it
          <br />
          shards should hold minimum of 10g, ideally 30-50g per shard
          <br /> lifecycle management, not just roll over at midnight. Rule:
          when shard is more than 50g, need another shard if we wanna avoid
          degregation.
          <br />
          "cold node"
          <br />
          Index Lifecycle Management is ILM
        </div>

        {/* <div className="pair">
          <div className="question">How to enable parallel processing?</div>
          <div className="answer">FILL IN</div>
        </div> */}
      </div>
    );
  }
}
