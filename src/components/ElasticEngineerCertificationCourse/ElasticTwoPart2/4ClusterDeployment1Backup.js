import React, { Component } from "react";

export default class Aggregations extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Module 4 Cluster Deployment Part 1: Cluster Backup</h2>
        {/* <div>Lab 4.1</div> */}
        <div className="exam-objective">
          <h3>** Backup and restore a cluster and/or specific indices</h3>
          <div className="pair">
            <div className="question">
              How to do set up and take a snapshot backup?
            </div>
            <div className="answer">
              Overview of process: register a repo on your cluster, then tell
              your nodes about the path to it, then take the snapshot
            </div>
            <br />
            <div className="answer">Step #0: Prep step, CREATE the folder</div>
            <textarea
              rows={3}
              defaultValue={`
    mkdir /shared_folder/my_repo
            `}
            />
            <br />
            <div className="answer">Step #1: Register a repo</div>
            <textarea
              rows={10}
              defaultValue={`
    PUT _snapshot/my_repo_name
    {
      "type": "fs",
      "settings": {
        "location": "/path/to/my_repo_folder"
      }
    }
            `}
            />
            <br />

            <div className="answer">
              Step 2 update elasticsearch.yml on all nodes
            </div>
            <textarea
              rows={5}
              defaultValue={`
    path.repo: /mnt/my_repo_folder
    or path.repo: /shared_folder/repo
            `}
            />
            <br />

            <div className="answer">Step 3 take a snapshot</div>
            <textarea
              rows={12}
              defaultValue={`
    PUT _snapshot/my_repo_name/my_snapshot_name

    or if you only want to take a snapshot to your repo of some of your indices
    PUT _snapshot/my_repo/my_logs_snapshot_1
    {
      "indices": "logs-*",
      "ignore_unavailable": true,
      "include_global_state": true
    }
            `}
            />
            <br />

            <div className="answer">
              After youre finished, how can you view the status of a snapshot or
              a list of all your snapshots? <br />
              <br />
              DONE
              <br />
              <br />
              you can monitor with the _status endpoint -->{" "}
              <code>GET _snapshot/my_repo/my_snapshot_2/_status</code>
              <br />
              <br />
              another option to tag only your snapstot command -->{" "}
              <code>?wait_for_completion=true</code>
              <br />
              <br />
              get info all all your snapshots at -->{" "}
              <code>GET _snapshot/my_repo/_all</code>
            </div>

            <br />
          </div>
          <div className="pair">
            <div className="question">How to restore from a snapshot?</div>
            <div className="answer">
              use _restore API! super easy to restore your cluster from a
              snapshot
            </div>
            <textarea
              rows={12}
              defaultValue={`
  POST _snapshot/my_repo/my_snapshot_2/_restore

  POST _snapshot/my_repo/my_snapshot_2/_restore
  {
    "indices": "logs-*",
    "ignore_unavailable": true,
    "include_global_state": false
  }
            `}
            />
          </div>
          <div className="pair">
            <div className="question">
              RENAMING restored indices--- ensure you arent overwriting original
              indices?
            </div>
            <div className="answer">
              If an index starts with “logs-*”, create a new index as
              “restored-logs-*”
            </div>
            <textarea
              rows={23}
              defaultValue={`
    POST _snapshot/my_repo/my_snapshot_2/_restore
    {
      "indices": "logs-*",
      "ignore_unavailable": true,
      "include_global_state": false,
      "rename_pattern": "logs-(.+)",
      "rename_replacement": "restored-logs-$1"
    }


    ANOTHER EXAMPLE--when you wanna rename the restored indices

    POST /_snapshot/my_local_repo/cluster_snapshot_1/_restore
    {
      "indices": "logs_server*",
      "ignore_unavailable": true,
      "include_global_state": false,
      "rename_pattern": "logs_server(.+)",
      "rename_replacement": "restored_index_$1"
    }
            `}
            />
          </div>
        </div>

        <div className="summary">
          <h3> Summary </h3>
          <br />• The Snapshot and Restore API provides a cluster backup
          mechanism <br />• Snapshots are a “point-in-time” copy of the data ‒
          it ignores any changes that happen after the snapshot started ‒ taking
          frequent snapshots (e.g every 30m) is efficient <br />• Snapshots are
          incremental ‒ only changes since the last snapshot are copied !
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1.True or False. Configuring all indices to have 2 or more
              replicas provides a reliable backup mechanism for a cluster.
            </div>
            <div className="answer">
              False, wont help if cluster goes down. 1. False! Replicas provide
              no backup mechanism of any kind
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2.True or False. You can take a snapshot of your entire cluster in
              a single REST request.
            </div>
            <div className="answer">true, if you dont specify an index</div>
          </div>
          <div className="pair">
            <div className="question">
              3.True or False. After starting a snapshot process, all new
              indexing requests will also be included in the snapshot. TRUE
              until the next back up
            </div>
            <div className="answer">
              false, it's a point in time. 3. False. Snapshots are
              "point-in-time" copies of the data.
            </div>
          </div>
        </div>
        <div className="Notes">
          <h3>Notes</h3> <br />
          Availability
          <br />
          Snapshot back up and Restore API
          <br />
          Once snapshot is saved, updates just cumulate differences
          <h4>Configuring Repository</h4>
          Shared file system (type fs), or S3, Google Cloud Storage etc
          <br />
          1) Register the Repository: shared folder, accessible by nodes. For
          every host's (every node, every server) yml file, needs to have the
          path.repo.
          <textarea
            rows={15}
            defaultValue={`
            in yml file: 
            path.repo: /shared_folder/repo

            PUT _snapshot/my_repo
            {
              "type": "fs",
              "settings": {
                "location": "/mnt/my_repo_folder",
                "compress": true,
                "max_restore_bytes_per_sec": "40mb", 
                "max_snapshot_bytes_per_sec": "40mb"
              }
            }
            `}
          />
          <h4>S3</h4>
          <div>
            The way to install S3
            <br /> $ bin/elasticsearch-plugin install repository-s3
          </div>
          <textarea
            rows={13}
            defaultValue={`
            in yml file: 
            path.repo: /shared_folder/repo

            PUT _snapshot/my_repo
            {
              "type": "s3",
              "settings": {
                "bucket": "my_s3_bucket_name"
              }
            }
            `}
          />
          <br />
          2) Take a snapshot
          <br />
          use _snapshot API endpoint with command:{" "}
          {`PUT _snapshot/my_repo/my_snapshot_1`} you give the snapshot a
          location and a name. First initial one takes a long time. Then taking
          one every 30 mins, will be short.
          <br />
          TODO fill in slide 235-239 careful doesnt exceed disk space
          incremental, one snapshot is full restore
          <br />
          <h4>Using the Snapshot</h4>
          Renaming Indices: gives it a prefix
          <textarea
            rows={11}
            defaultValue={`
           POST _snapshot/my_repo/my_snapshot_2/_restore
            {
              "indices": "logs-*",
              "ignore_unavailable": true,
              "include_global_state": false,
              "rename_pattern": "logs-(.+)",
              "rename_replacement": "restored-logs-$1"
            }
            `}
          />
          Restore to anthoer cluster (not cross cluster duplication) needs to be
          registered. Use command
          {`POST _snapshot/my_repo/snap1/_restore`}
          <br />
          Demo
          <br />
          <br />
        </div>
      </div>
    );
  }
}
