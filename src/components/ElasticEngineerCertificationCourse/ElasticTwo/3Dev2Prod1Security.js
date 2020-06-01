import React, { Component } from "react";
import SecureACluster from "./images/SecureACluster.png";
export default class Dev2Prod1Security extends Component {
  render() {
    return (
      <div className="exam-topic">
        <h2>Development to Production: Security</h2>

        <div className="exam-sub-topic">
          <h3>
            ** Define role-based access control using Elasticsearch Security
          </h3>
          <div>
            <br />
            Once xpack.security.enabled: true, then go into Kibana Management
            Dashboard and Section for Security: Define User or Role will appear,
            you can set which indices they can read and/or write to
          </div>
        </div>
        <div className="exam-sub-topic">
          <h3>** Secure a cluster using Elasticsearch Security</h3>
          <h3>
            » Docs » Secure a cluster » Tutorial: Getting started with security
            » Enable Elasticsearch security features
          </h3>
          <h4>Just search for "tutorial secure a cluster":</h4>
          <a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.6/get-started-enable-security.html">
            https://www.elastic.co/guide/en/elasticsearch/reference/7.6/get-started-enable-security.html
          </a>
          Secure a cluster --> Tutorial: Getting started with security -->
          Enable Elasticsearch security features
          <br />
          EXAM enable security by 1) editing each yml file, 2) restart nodes, 3)
          open new tab to regenerate the passwords with set up command
          <ul style={{ listStyleType: "decimal" }}>
            <li>Stop kibana</li>
            <li>Bring down your nodes</li>
            <li>
              Edit elasticsearch.yml file of each node to enable xpack security
              and single-node discovery:
              <textarea
                rows={5}
                defaultValue={`
                xpack.security.enabled: true
                discovery.type: single-node
                `}
              />
            </li>
            <li>
              Create passwords for built-in users (in a new tab)
              <br />
              <br />
              <code>./bin/elasticsearch-setup-passwords interactive</code>
            </li>
          </ul>
        </div>

        <div className="Notes">
          <div className="pair">
            <div className="question">
              How to enable Elastic default security feature? ON THE EXAM
            </div>
            <div className="answer">
              1) Configuration: modify yml file for EVERY NODE ON THE EXAM go to
              each node's yml file, set {`xpack.security.enabled: true`}, and
              restart nodes.
              <br />
              2) Then in a new tab, set passwords for all <br></br>
              <code>
                {" "}
                {`./elasticsearch/bin/elasticsearch-setup-passwords interactive`}
              </code>
              <br />
              *Note: you wont see what you are typing, so use a simple password
            </div>
          </div>
          <img
            className="image-border"
            src={SecureACluster}
            alt="secure a cluster"
          />
        </div>
        <div className="Notes">
          <div className="pair">
            <div className="question">Defining Roles and Privileges</div>
            <div className="answer">
              sometimes as granular as the field level, like hide salary field,
              but allow to employee index. Or permission by index.
              <br />
              Create user, assign access to roles (Kibana class goes more in
              depth, saved objects, multiple spaces) Summary: Elastic Security
              free, xpack in basic sub
            </div>
          </div>
        </div>
        <div className="summary">
          <h3> Summary </h3>
          <br />• You can secure your cluster with firewalls, reverse proxy, and
          Elastic Security
          <br />• Elastic Security provides a complete solution for securing
          Elasticsearch
          <br />• If Elastic Security is enabled, unless you have a trial
          license, you must configure SSL/TLS for internodecommunication
          <br />• Make sure to secure your cluster!
        </div>
        <div className="quiz">
          <h3>QUIZ</h3>
          <div className="pair">
            <div className="question">
              1. Explain three options to secure your cluster.
            </div>
            <div className="answer">
              Firewall, Reverse Proxy, elastic security/TLS
            </div>
          </div>
          <div className="pair">
            <div className="question">
              2. True or False. An Elasticsearch cluster comes with security
              enabled by default.
            </div>
            <div className="answer">False, not enabled but available</div>
          </div>
          <div className="pair">
            <div className="question">
              3. It is required to enable SSL/TLS communication when Elastic
              security is enabled on the basic license.
            </div>
            <div className="answer">
              False. It works without security with 1 node. As soon as you have
              2 nodes you need encrypted communication via TSL.
            </div>
          </div>
        </div>
        <div className="Notes">
          <h3>Notes</h3>
          <h4>
            Unimportant security alternatives: FireWalls and Reverse Proxy
          </h4>
          FireWalls: never expose port 9200 http publicly on the internet
          <br />
          Restrict Ports like 9200, but NOT 9300 cause that's how nodes talk to
          each other
          <br />
          Reverse Proxy: not important
          <h4>Elastic Security: </h4>
          <br />
          basic subcription includes encrypted communication (TLS)
          <br />
          role base access control, permissions
          <div className="pair">
            <div className="question">
              TLS: Configuring Transport Layer Security (dont think on the test)
            </div>
            <div className="answer">
              Slide 157 (recommend 2 hour on demand course on security) move to
              each node and copy all the settings.
              <br />
              EXAM put plain text password in your yml file, dont have to do key
              store on exam
              <br />
              kibana.yml
              <br /> elasticsearch.username: "kibana"
              <br />
              elasticsearch.password: "kibanapassword"
              <br />
              EXAM enable security by 1) editing each yml file, 2) restart
              nodes, 3) open new tab to regenerate the passwords with set up
              command
              <br /> Kbana username is system user, not used to physically used
              to log into kibana it's for system account.
              <br />
              Notes about lab for this section:
              <br />
              Use the super user account "elastic" with which ever password you
              gave it.
              <br />
              go to admin section and set up roles (easy part) create new role,
              place user in the role (elastic user is super user which is
              admin), report only user for report creator for visualizations
            </div>
          </div>
        </div>
      </div>
    );
  }
}
