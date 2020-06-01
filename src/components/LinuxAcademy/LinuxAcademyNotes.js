import React, { Component } from "react";
import Crud from "./images/LinuxAcademyCrud.png";
import IndexTemplate from "./images/LinuxAcademyIndexTemplate.png";
import ReindexRemoteIndexWithQueryAndScriptProcessor from "./images/LinuxAcademyReindexRemoteIndexWithQueryAndScriptProcessor.png";
import DynamicTemplate from "./images/LinuxAcademyDynamicTemplate.png";
import UpdateByQuery from "./images/LinuxAcademyUpdateByQuery.png";
import IngestPipeline from "./images/LinuxAcademyIngestPipeline.png";
import UseMultiFieldsAnalyzers from "./images/LinuxAcademyUseMultiFieldsAnalyzers.png";

import QueryTypes1 from "./images/LinuxAcademyQueryTypes1.png";
import QueryTypes2 from "./images/LinuxAcademyQueryTypes2.png";
import BoolCombinedQuery from "./images/LinuxAcademyBoolCombinedQuery.png";
import Sorting from "./images/LinuxAcademySorting.png";
import Highlight from "./images/LinuxAcademyHighlight.png";
import Scroll from "./images/LinuxAcademyScroll.png";
import SearchTemplate from "./images/LinuxAcademySearchTemplate.png";
import FuzzinessAndFuzzyQuery from "./images/LinuxAcademyFuzzinessAndFuzzyQuery.png";
import CrossClusterSearch from "./images/LinuxAcademyCrossClusterSearch.png";
import CombineAggs from "./images/LinuxAcademyCombineAggs.png";
import DiagnoseAllocationIssues1 from "./images/LinuxAcademyDiagnoseAllocationIssues#1.png";
import DiagnoseAllocationIssues2 from "./images/LinuxAcademyDiagnoseAllocationIssues#2.png";

// import CombineAggs from "./images/LinuxAcademyCombineAggs.png";

import AllocareShardsToSpecificNodes from "./images/LinuxAcademyAllocareShardsToSpecificNodes.png";
import ShardAllocationAwarenessForced from "./images/LinuxAcademyShardAllocationAwarenessForced.png";
import SnapshotRestore from "./images/SnapshotRestore.png";
import HotWarmArchitecture1 from "./images/HotWarmArchitecture1.png";
import HotWarmArchitecture2 from "./images/HotWarmArchitecture2.png";
import "./LinuxAcademyNotes.css";

export default class LinuxAcademyNotes extends Component {
  render() {
    return (
      <div className="linux-container">
        <h1>Linux Academy Course notes</h1>
        {/* slides 282-300 */}
        <div className="topic-pair">
          <div className="topic-header">CRUD operations</div>
          <div className="topic-description">
            You can get a doc with meta data using the _doc endpoint, or just
            get the doc fields with _source endpoint.
            <br />
            the _update endpoint request body has doc property
            <textarea
              rows={8}
              defaultValue={`
    POST test_index/_update/1
    {
      "doc": {
        "last_name": "Jones"
      }
    }
              `}
            />
            <br /> you can delete a field of a document with a scripted update
            where request body is:
            <code>script: source: ctx._source.remove('field_name')</code>
            <textarea
              rows={9}
              defaultValue={`
    POST test_index/_update/2
    {
      "script": {
        "source": "ctx._source.remove('last')",
        "lang": "painless"
      }
    }
              `}
            />
          </div>
          <img
            className="linux-image-medium"
            src={Crud}
            alt="crud operations"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Index Template</div>
          <div className="topic-description">
            specify a index_pattern to match on index names and a alias so that
            new indices that match the name pattern will all have the same alias
            and can be queries jointly
          </div>
          <img
            className="linux-image-large"
            src={IndexTemplate}
            alt="crud operations"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Dynamic Template</div>
          <div className="topic-description">
            Using the _template API, you can set up mapping rules for a index
            naming pattern (index_patterns: []) with either "match"/"unmatch"
            and a name pattern, or a "match_mapping_type"
          </div>
          <img
            className="linux-image-medium"
            src={DynamicTemplate}
            alt="crud operations"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">ReIndex</div>
          <div className="topic-description">
            Using the _reindex API you can set the source index and the
            destination index that the documents will be reindexed into. For
            another layer of complexity, you can add a query to the soure index
            so the destination index will only contain a subset of the source
            index. Additionally, you can add a script process to edit the
            documents as they are reindexed.{" "}
          </div>
          <img
            className="linux-image-medium"
            src={ReindexRemoteIndexWithQueryAndScriptProcessor}
            alt="crud operations"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Update By Query</div>
          <div className="topic-description">
            you can use the _update_by_query to run a script on documents
            matching a query
            <br />
            <br />
            also can combine with a pipeline
          </div>

          <img
            className="linux-image-medium"
            src={UpdateByQuery}
            alt="update by query"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Ingest Pipeline</div>
          <div className="topic-description">
            you can create a pipeline with a combination of processors
            <br /> Example processors include remove, set convert and the
            generic one: script
          </div>

          <img
            className="linux-image-medium"
            src={IngestPipeline}
            alt="ingest pipeline"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Using Analyzers with Multi Fields</div>
          <div className="topic-description">
            Default mapping of a string field is to text and keyword multi
            field.
            <br />
            you can add infinite multifields, each analyzed with a different
            analyzer
          </div>

          <img
            className="linux-image-small"
            src={UseMultiFieldsAnalyzers}
            alt="multi fields"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">
            Query Types: match, match_phrase, multi-match and query string
          </div>
          <div className="topic-description"></div>

          <img
            className="linux-image-medium"
            src={QueryTypes1}
            alt="query types"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">
            Non Analyzed Query Types: term, terms, range, wildcard
          </div>
          <div className="topic-description"></div>

          <img
            className="linux-image-small"
            src={QueryTypes2}
            alt="query types"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Combined Bool Queries</div>
          <div className="topic-description">
            Super cool trick is to have a bool query with a must clause, and use
            a term query. THEN specifc the _name of that aspect of the query so
            the results will be tagged with which criteria they match on
          </div>

          <img
            className="linux-image-large"
            src={BoolCombinedQuery}
            alt="bool queries"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Sorting</div>
          <div className="topic-description">
            sort is array because yon can sort on multiple fields in a heirarchy
            of sorting conditions, the results are tagged with each doc's values
            for the sort parameters
          </div>

          <img className="linux-image-large" src={Sorting} alt="sorting" />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Highlighting</div>
          <div className="topic-description">
            Quite straight forward, just hadd hightlight before "query" in your
            _search and specify pre-tags and post-tags array, and field
          </div>

          <img
            className="linux-image-large"
            src={Highlight}
            alt="highlighting"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Scroll API</div>
          <div className="topic-description">
            First you hit the API to open a scroll window (length of time), set
            the size, and get the scroll id. Then you can hit the API with the
            scroll id repeatedly for the next page until the scroll window
            duration ends.
            <br />
            Best practice to set sort by doc id in the request param when
            initializing a scroll session since sorting is not always consistent
            otherwise.
          </div>

          <img
            className="linux-image-large"
            src={Scroll}
            alt="crud operations"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">
            Fuzzy Term Query and Fuzziness match query{" "}
          </div>
          <div className="topic-description"></div>

          <img
            className="linux-image-medium"
            src={SearchTemplate}
            alt="highlighting"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Fuzziness</div>
          <div className="topic-description">
            For misspellings, setting fuzziness to 1 allows for a character
            difference (removed, added or replaced), you can also set
            transpositions true to search for matches where two letters have
            been swaped.
          </div>

          <img
            className="linux-image-small"
            src={FuzzinessAndFuzzyQuery}
            alt="highlighting"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Search Template</div>
          <div className="topic-description">
            Create a script with <code>POST _script/script_name</code> that's a
            query using mustache to designate param values, then use
            _search/template with id: script_name and params: values to leverage
            your script.
          </div>

          <img
            className="linux-image-medium"
            src={SearchTemplate}
            alt="search template"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">
            How to allocate shards to a specific node
          </div>
          <div className="topic-description">
            You can set a specific index setting with
            <code>
              PUT index_name/settings{" "}
              {`{ "index.routing.allocation.exclude._name": "node1"}`}
            </code>
            <br />
            ^that would move the index's shards off of node1, as long as it
            could still keep the index health green.
            <br />
            You could also move all the index's shards to hot nodes with{" "}
            <code>index.routing.allocation.require.my_temp: hot</code>
            <br />
            if you wanted to go a step broader, you can put all the cluster's
            shards onto a specific node or onto nodes with a specific
            temperature PUT _cluster/settings{" "}
            {`{"transient": {"cluster.routing.allocation.requre.my_temp": warm}"}`}
            <br /> Routing allocation can be on an index or on the cluster and
            the setting can be for the node name, node temp, or a hardware
            designation like zone or rack
          </div>

          <img
            className="linux-image-medium"
            src={AllocareShardsToSpecificNodes}
            alt="highlighting"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">
            Shard Allocation Awareness and Forced Awareness
          </div>
          <div className="topic-description">
            How do you tell your cluster to not double up copies of shards onto
            the same hardware? allocation awareness
            <br />
            In the case of failure, how do you prevent replicas from being
            reassigned to the last available zone? forced awareness of all the
            possible zones so the cluster can tell when only one zone is left,
            in order to know not to try and overwhelm it.
          </div>

          <img
            className="linux-image-medium"
            src={ShardAllocationAwarenessForced}
            alt="highlighting"
          />
        </div>
        <div className="topic-pair">
          <div className="topic-header">Snapshot and Restore</div>
          <div className="topic-description">{/* FILL IN TODO */}</div>

          <img
            className="linux-image-medium"
            src={SnapshotRestore}
            alt="Snapshot and Restore"
          />
        </div>

        <div className="topic-pair">
          <div className="topic-header">
            Configure a Cluster for Use with a Hot/Warm Architecture
          </div>
          <div className="topic-description">
            The code below is really cool because it shows that old_logs
            settings is configureed to index routing allocation require my_temp
            warm and the recent_logs to mytemp hot.
            <br />
            <br />
            Then when you run GET _cluster/allocation/expplain API, it will say
            that the shards of recent_logs arent on data2 node because it isn't
            temp hot.
            <br />
            *The 2nd image below shows that node data-1 is hot and node data-2
            is warm.
          </div>

          <img
            className="linux-image-large"
            src={HotWarmArchitecture1}
            alt="Hot Warm Architecture1"
          />
          <img
            className="linux-image-large"
            src={HotWarmArchitecture2}
            alt="Hot Warm Architecture1"
          />
        </div>
        {/* <div className="topic-pair">
          <div className="topic-header">topic-header</div>
          <div className="topic-description">topic-description</div>
          <textarea
            rows={7}
            defaultValue={`
    XYZ
              `}
          />
        </div> */}
      </div>
    );
  }
}
