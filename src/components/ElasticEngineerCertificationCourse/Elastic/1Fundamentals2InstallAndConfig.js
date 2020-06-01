import React, { Component } from "react";
import InstallElastic from "./images/InstallElastic.png";
import WrenchInKibanaCopyAsCLICommand from "./images/WrenchInKibanaCopyAsCLICommand.png";

export default class Fundamentals2InstallAndConfig extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>
          Module 1 Fundamentals: Lesson 1.2 Installation and Configuration
        </h2>
        <div className="exam-sub-topic">
          <h3>
            ** Deploy and start an Elasticsearch cluster that satisfies a given
            set of requirements
          </h3>
          <h3>
            » Docs » Set up Elasticsearch » Important Elasticsearch
            configuration
          </h3>
          <br />
          <div>
            Most of this is super easy: yml for node and cluster name name, jvm
            heap size, ssh into a server, use nano to open config files in
            config folder, know how to bring down a ndoe and bring it back up
          </div>
          <div className="pair">
            <div className="question">How to install ES?</div>
            <div className="answer">
              Find the installation page in documentation
              <br />
              <img
                style={{ display: "inline-block", border: "2px black solid" }}
                alt="install directions"
                src={InstallElastic}
              />
            </div>
          </div>

          <div className="pair">
            <div className="question">Check the cluster information in CLI</div>
            <div className="answer">
              <code>curl -X GET "http://localhost:9200/"</code>
            </div>
          </div>

          <div className="pair">
            <div className="question">
              How to start up and run an instance of ES?
            </div>
            <div className="answer">./bin/elasticsearch </div>
          </div>
          <div className="pair">
            <div className="question">
              Where are the scripts in the Elastic app structure?
            </div>
            <div className="answer">/bin </div>
          </div>

          <div className="pair">
            <div className="question">What are the 3 main config files?</div>
            <div className="answer">
              Elastic.yml, jvm.options, log4j2.properties (log config)
            </div>
          </div>
          <div className="pair">
            <div className="question">
              What settings can you specify in jvm.options?
            </div>
            <div className="answer">
              Heap size, change from 2G to 512MG: -Xmx4g to -Xmx512m
            </div>
            <textarea
              rows={15}
              defaultValue={`
    ## JVM configuration
    ################################################################
    ## IMPORTANT: JVM heap size
    ################################################################
    ## ## You should always set the min and max JVM heap ## size to
    the same value. For example, to set ## the heap to 4 GB, set: ##
    ## -Xms4g ## -Xmx4g ## 
    ################################################################
    # Xms represents the initial size of total heap space # Xmx
    represents the maximum size of total heap space 
    -Xms512m
    -Xmx512m
              `}
            />
          </div>
          <div className="pair">
            <div className="question">
              What settings can you specify in Elastic.yml?
            </div>
            <div className="answer">
              {" "}
              LOTS OF STUFF cluster.name and node.name, node.attr.my_temp,
              node.attr.my_rack, discovery seed servers, node roles like
              node.master: true
            </div>
            <textarea
              rows={15}
              defaultValue={`
    # ======================== Elasticsearch Configuration =========================
    #
    # ---------------------------------- Cluster -----------------------------------
    #
    # Use a descriptive name for your cluster:
    #
    cluster.name: my-cluster
    #
    # ------------------------------------ Node ------------------------------------
    #
    # Use a descriptive name for the node:
    #
    node.name: node-1
    `}
            />
          </div>
        </div>

        <div className="pair">
          <div className="question">What does GET / provide?</div>
          <div className="answer">CLUSTER defaultValueA</div>
          <textarea
            rows={25}
            defaultValue={`
    GET /

    {
      "name" : "C02XQ5H9JG5J",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "knFuOOW9T2StJjCssNutkw",
      "version" : {
        "number" : "7.6.1",
        "build_flavor" : "default",
        "build_type" : "tar",
        "build_hash" : "aa751e09be0a5072e8570670309b1f12348f023b",
        "build_date" : "2020-02-29T00:15:25.529771Z",
        "build_snapshot" : false,
        "lucene_version" : "8.4.0",
        "minimum_wire_compatibility_version" : "6.8.0",
        "minimum_index_compatibility_version" : "6.0.0-beta1"
      },
      "tagline" : "You Know, for Search"
    }

    ALSO WRITTEN IN CLI AS
    curl -X GET "http://localhost:9200/"

    `}
          />
        </div>
        <div className="pair">
          <div className="question">
            How to convert a Kibana query/request into a CLI command?
          </div>
          <div className="answer">click on the wrench icon</div>
          <img
            src={WrenchInKibanaCopyAsCLICommand}
            alt="WrenchInKibanaCopyAsCLICommand"
          />
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. What are the three main configuration files you will find in
              the Elasticsearch config folder?
            </div>
            <div className="answer">
              • elasticsearch.yml • jvm.options • log4j2.properties
            </div>
          </div>

          <div className="pair">
            <div className="question">
              2. True or False:The only way to configure settings is using the
              config files.
            </div>
            <div className="answer">FALSE also CLI</div>
          </div>
          <div className="pair">
            <div className="question">3. How do you set the node name?</div>
            <div className="answer">set node.name in yml</div>
          </div>
        </div>
      </div>
    );
  }
}
{
  /* 
            <div className="pair">
              <div className="question">
                How do you download and run logstash and kibana?
              </div>
              <div className="answer">
                <h5>logstash:</h5>
                tar -xf logstash-7.3.1.tar.gz
                <br /> ./logstash-7.3.1/bin/logstash
                <h5>kibana:</h5>
                tar -xf kibana-7.3.1-linux-x86_64.tar.gz
                <br />
                ./kibana-7.3.1-linux-x86_64/bin/kibana --host=0.0.0.0
              </div>
            </div>  <div className="pair">
              <div className="question">How to install ES?</div>
              <div className="answer">
                wget
                https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.6.2-darwin-x86_64.tar.gz
                <br />
                wget
                https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.6.2-darwin-x86_64.tar.gz.sha512
                <br />
                shasum -a 512 -c elasticsearch-7.6.2-darwin-x86_64.tar.gz.sha512
                <br />
                tar -xzf elasticsearch-7.6.2-darwin-x86_64.tar.gz
                <br />
                cd elasticsearch-7.6.2/
              </div>
              <div className="answer">
                <h5>or install :</h5>
                tar -xf elasticsearch-7.3.1-linux-x86_64.tar.gz
                <h5>config elastic.yml:</h5>
                nano elasticsearch-7.3.1/config/elasticsearch.yml
                <h5>and run:</h5>
                ./elasticsearch-7.3.1/bin/elasticsearch
                <br />
                ./elasticsearch/bin/elasticsearch
                <br />
                ./node1-7.3.1/bin/elasticsearch
                <br />
                ./elasticsearch-7.3.1/bin/elasticsearch -E node.name=node1
                <br />
                ./elasticsearch-7.3.1/bin/elasticsearch -E node.name=node1 -E
                http.host="localhost","server1"
              </div>
            </div> 
            
            <div className="pair">
              <div className="question">
                How to configure a ES Cluster on CLI?
              </div>
              <div className="answer">
                with -E syntax:
                <br />
                ./bin/elasticsearch -d -Ecluster.name=my_cluster
                -Enode.name=node_1
              </div>
            </div>

            <div className="pair">
              <div className="question">
                Where do you update the cluster.name?
              </div>
              <div className="answer">Elastic.yml</div>
            </div>
            <div className="pair">
              <div className="question">How to change configuration?</div>
              <textarea
                rows={12}
                defaultValue={`
    // TO CHANGE Cluster name: enter edit mode for yml config file to 
    nano elasticsearch-7.3.1/config/elasticsearch.yml
    // ^ inside you can change cluster_name or name of node
    // TO CHANGE default heap size, open jvm.options 
    elasticsearch-7.3.1/config/jvm.options
    // change from 4G to 512MB: edit -Xms4 to become  -Xms512m
    Make sure to restart the instance to incorporate the changes
    TO CHANGE the node name, use CLI
    ./elasticsearch-7.3.1/bin/elasticsearch -E node.name=node1 -E http.host="localhost","server1"
              `}
              />
            </div>
            
            */
}
