import React, { Component } from "react";
export default class ExamObjectives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSection: false,
      showCode: false,
    };
  }

  toggleShowCode = () => {
    this.setState(function (prevState) {
      return {
        showCode: !prevState.showCode,
      };
    });
  };

  toggleShowSection = () => {
    this.setState(function (prevState) {
      return {
        showSection: !prevState.showSection,
      };
    });
  };

  getObjectives = () => {
    const sectionClassName = this.state.showSection
      ? "relevant-section"
      : "relevant-section relevant-section--hide";

    const exampleCodeClassName = this.state.showCode
      ? "example-section"
      : "example-section example-section--hide";
    return (
      <>
        <div className="objectives-container">
          <h3>Installation and Configuration</h3>
          <ul>
            <li className="exam-objective">
              Deploy and start an Elasticsearch cluster that satisfies a given
              set of requirements{" "}
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /1Fundamentals2InstallAndConfig)
              </div>
              <textarea
                className={exampleCodeClassName}
                rows={10}
                defaultValue={`
    "@timestamp": {
      "type": "date"
      },
      "code": {
        "type": "keyword"
      },
      "status_code": {
        "type": "short"
      }
            `}
              />
            </li>
            <li className="exam-objective">
              Configure the nodes of a cluster to satisfy a given set of
              requirements{" "}
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /5NodeIndexManagement1ShardAllocation)
              </div>
            </li>
            <li className="exam-objective">
              Secure a cluster using Elasticsearch Security
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /2Dev2Prod1Security)
              </div>
            </li>
            <li className="exam-objective">
              Define role-based access control using Elasticsearch Security
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /2Dev2Prod1Security)
              </div>
            </li>
          </ul>
        </div>
        <div className="objectives-container">
          <h3>Indexing Data</h3>
          <ul>
            <li className="exam-objective">
              Define an index that satisfies a given set of requirements
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /1DM1Denormalization)
              </div>
            </li>
            <li className="exam-objective">
              Perform index, create, read, update, and delete operations on the
              documents of an index{" "}
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /1Fundamentals3CRUDOperations)
              </div>
            </li>
            <li className="exam-objective">
              Define and use index aliases
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /6AdvTips2IndexAliasesPart1)
              </div>
            </li>
            <li className="exam-objective">
              Define and use an index template for a given pattern that
              satisfies a given set of requirements
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /6AdvTips2IndexAliasesPart2)
              </div>
            </li>
            <li className="exam-objective">
              Define and use a dynamic template that satisfies a given set of
              requirements{" "}
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /6AdvTips3ControllingDynamicBehaviors)
              </div>
            </li>
            <li className="exam-objective">
              Use the Reindex API and Update By Query API to reindex and/or
              update documents{" "}
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /2DataProcess1UpdateQueryReindex)
              </div>
            </li>
            <li className="exam-objective">
              Define and use an ingest pipeline that satisfies a given set of
              requirements, including the use of Painless to modify documents
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /2DataProcess2IngestNodesAndPipelines and
              </div>
              <div className={sectionClassName}>
                <span className="second-section">ElasticTwo</span>
                /2DataProcessing3PainlessScripting)
              </div>
            </li>
          </ul>
        </div>
        <div className="objectives-container">
          <h3>Queries</h3>
          <ul>
            <li className="exam-objective">
              Write and execute a search query for terms and/or phrases in one
              or more fields of an index{" "}
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /2Queries2FullTextQueries)
              </div>
            </li>
            <li className="exam-objective">
              Write and execute a search query that is a Boolean combi nation of
              multiple queries and filters{" "}
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /2Queries3CombiningQueries)
              </div>
            </li>
            <li className="exam-objective">
              Highlight the search terms in the response of a query
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /2Queries4ImplementingASearchPage)
              </div>
            </li>
            <li className="exam-objective">
              Sort the results of a query by a given set of requirements
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /2Queries4ImplementingASearchPage)
              </div>
            </li>
            <li className="exam-objective">
              Implement pagination of the results of a search query
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /2Queries4ImplementingASearchPage)
              </div>
            </li>
            <li className="exam-objective">
              Use the scroll API to retrieve large numbers of results
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /1Fundamentals3CRUDOperations)
              </div>
            </li>
            <li className="exam-objective">
              Apply fuzzy matching to a query
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /2Queries2FullTextQueries)
              </div>
            </li>
            <li className="exam-objective">
              Define and use a search template
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /6AdvTips2SearchTemplatesPart3)
              </div>
            </li>
            <li className="exam-objective">
              Write and execute a query that searches across multiple clusters
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /4ClusterDeployment4MultipleClusterSetups)
              </div>
            </li>
          </ul>
        </div>
        <div className="objectives-container">
          <h3>Aggregations</h3>
          <ul>
            <li className="exam-objective">
              Write and execute metric and bucket aggregations
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /3Aggregations1MetricsAggs and 3Aggregations2BucketAggs)
              </div>
            </li>
            <li className="exam-objective">
              Write and execute aggregations that contain sub-aggregations
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /3Aggregations3CombiningAggs)
              </div>
            </li>
          </ul>
        </div>
        <div className="objectives-container">
          <h3>Mappings and Text Analysis</h3>
          <ul>
            <li className="exam-objective">
              Define a mapping that satisfies a given set of requirements
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /4TextAnalysisAndMappings)
              </div>
            </li>
            <li className="exam-objective">
              Define and use a custom analyzer that satisfies a given set of
              requirements
              <br />
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /1DM4Analyzers) (<span className="first-section">Elastic</span>
                /4TextAnalysisAndMappings)
              </div>
            </li>
            <li className="exam-objective">
              Define and use multi-fields with different data types and/or
              analyzers
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /1DM3FieldModelingAndCommonSchema
                {/* <br/> TODO ADD MORE */}
              </div>
            </li>
            <li className="exam-objective">
              Configure an index so that it properly maintains the relationships
              of nested arrays of objects
              <div className={sectionClassName}>
                (<span className="second-section">ElasticTwo</span>
                /1DM2NestedAndJoinDataTypes
              </div>
            </li>
          </ul>
        </div>
        <div className="objectives-container">
          <h3>Cluster Administration</h3>
          <ul>
            <li className="exam-objective">
              Allocate the shards of an index to specific nodes based on a given
              set of requirements
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /5NodeIndexManagement1ShardAllocation
              </div>
            </li>
            <li className="exam-objective">
              Configure shard allocation awareness and forced awareness for an
              index{" "}
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /4ClusterDeployment3Topology
              </div>
            </li>
            <li className="exam-objective">
              Diagnose shard issues and repair a cluster’s health
              <div className={sectionClassName}>
                (<span className="first-section">Elastic</span>
                /6MonitoringandTroubleshooting)
              </div>
            </li>
            <li className="exam-objective">
              Backup and restore a cluster and/or specific indices
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /4ClusterDeployment1Backup
              </div>
            </li>
            <li className="exam-objective">
              Configure a cluster for use with a hot/warm architecture
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /5NodeIndexManagement1ShardAllocation
              </div>
            </li>
            <li className="exam-objective">
              Configure a cluster for cross cluster search
              <div className={sectionClassName}>
                (<span className="last-section">ElasticTwoPart2</span>
                /4ClusterDeployment4MultipleClusterSetups
              </div>
            </li>
          </ul>
          <hr />
        </div>
      </>
    );
  };
  render() {
    return (
      <div>
        {/* <div className="exam-objective-container">
          <h2>Exam Objectives</h2>
          <button
            className="toggleShowObjectivesButton"
            onClick={this.toggleShowHide}
          >
            {this.state.show ? (
              <span>Collapse Exam Objectives</span>
            ) : (
              <span>
                <ExpandMoreIcon /> Expand Exam Objectives
              </span>
            )}
          </button>
        </div> 
         {this.state.show && this.getObjectives()}*/}
        <h2>Exam Objectives</h2>
        <div className="exam-objective-container">
          <h2>Exam Objectives</h2>
          <button
            className="toggleShowObjectivesButton"
            onClick={this.toggleShowCode}
          >
            {this.state.showCode ? (
              <span> Hide Sample Code</span>
            ) : (
              <span>Show Sample Code</span>
            )}
          </button>
          <button
            className="toggleShowObjectivesButton"
            onClick={this.toggleShowSection}
          >
            {this.state.showSection ? (
              <span> Hide Section Labels</span>
            ) : (
              <span>Show Section Labels</span>
            )}
          </button>
        </div>
        {this.state.show && this.getObjectives()}
        {this.getObjectives()}
      </div>
    );
  }
}
