import React, { Component } from "react";

export default class ReactRouter extends Component {
  render() {
    return (
      <div>
        <div>
          <h2 className="header">React and Redux</h2>
          <div>Jump to:</div>
          <br />
          <a href="#setup">Set Up</a>
          <br />
          <a href="#boilerplate">Boilerplate</a>
          <br />
          <a href="#example">Basic Example</a>
          <br />
          <a href="#params">Passing params</a>
          <br />
          <a href="#link">Link tag</a>
          <br />
          <a href="#switch">Switch</a>
          <br />
          <a href="#navlink">Navlink</a>
          <br />
          <a href="#navlink">Nested Routing</a>
          <br />
          <br />
          <br />
          <div>
            Code Examples from React Training (the publishers of React Router){" "}
            <a href="ttps://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom/examples">
              here
            </a>
          </div>
          <br />
          <h3>Topics to consider: </h3>
          <div className="description" id="example">
            what's the difference between the following?
          </div>
          <textarea style={{ height: "100px", width: "550px" }}>
            {`
              <Route component={Home}/>
              <Route path="/" component={Home}/>
              <Route path="*" component={Home}/>
            `}
          </textarea>
          <div>
            <h3>Intro: React Router Primary Components:</h3>
            <ul style={{ textAlign: "left" }}>
              <li>routers {`<BrowserRouter>`}</li>
              <li>
                Route matchers, like {`<Route>`} and {`<Switch>`}
              </li>
              <li>
                Navigation (aka route changers): {`<Link>`}, {`<NavLink>`}, and{" "}
                {`<Redirect>`}
              </li>
            </ul>

            <div className="description" id="setup">
              Make sure {`<BrowserRouter>`} is rendered at the root of your
              element hierarchy. Typically you’ll wrap your top-level {`<App>`}{" "}
              element in a router, like this:
            </div>
            <textarea style={{ height: "300px", width: "550px" }}>
              {`
                  import React from "react";
                  import ReactDOM from "react-dom";
                  import { BrowserRouter } from "react-router-dom";

                  function App() {
                    return <h1>Hello React Router</h1>;
                  }

                  ReactDOM.render(
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>,
                    document.getElementById("root")
                  );`}
            </textarea>
          </div>
          <ul style={{ textAlign: "left", listStyleType: "none" }}>
            <li>
              <h3 className="description">ReactTraining.com</h3>
              <a href="https://reacttraining.com/react-router/web/example/basic">
                Code Sample
              </a>
            </li>

            <li>
              <h3 className="label">React Router Complete Guide by TechSith</h3>
              <a href="https://www.youtube.com/watch?v=XRfD8xIOroA">
                Link to the Tutorial on YouTube
              </a>
              <br />
              <br />
              <div className="description" id="boilerplate">
                React Router Boilerplate
              </div>
              <textarea style={{ height: "50px", width: "550px" }}>
                {`
            import { BrowserRouter as Router, Route } from 'react-router-dom';`}
              </textarea>
              <br />
              <br />
              <div className="description" id="example">
                Basic Example with Router and Routes, highlighting different
                ways to determine what is shown at each path.
              </div>
              <textarea style={{ height: "400px", width: "550px" }}>
                {`
                  import React from "react";
                  import { BrowserRouter as Router, Link } from 'react-router-dom';
                  
                  export default function BasicExample() {
                    return (
                      <Router>
                            <Route exact path="/" component={Home}/>
      
                            <Route path="/about">
                              <About />
                            </Route>

                            <Route path="/dashboard" render={
                                () => {
                                  return ( <h1>Dashboard</h1>);
                                }
                            }/>
                      </Router>
                    );
                  }`}
              </textarea>
              <div className="description" id="example">
                Additional parameters in the Route tag include "exact" and
                "strict" which specify rules on how to match the path specified
              </div>
              <br />
              <br />
              <div className="description" id="params">
                Params: You can pass a parameter through the path to the
                component so that on App {`this.props`}, the "match" prop will
                have match params.username.
              </div>
               
              <textarea style={{ height: "50px", width: "500px" }}>
                {`
                  <Route path="/user/:username" component={App} />`}
              </textarea>
              <br />
              <br />
              <br />
              <h3 id="link">{`<Link>`}</h3>
              <div className="description">
                To Link to one of the routes anywhere in the app, for example
                use:
              </div>
              <textarea style={{ height: "50px", width: "500px" }}>
                {`
                  <Link to="/users/>`}
              </textarea>
              <br />
              <br />
              <h3 id="redirect">{`<Redirect >`}</h3>   
              <textarea style={{ height: "130px", width: "500px" }}>
                {`
              <Route path=" /user/:username" render{(match) => (
                this.state.loggedIn 
                   ? <User username={match} /> 
                   : <Redirect to="/" />
              />`}
              </textarea>
              <br />
              <br />
              <div className="description">
                You can pass the match into the render attribute method of the
                Route, match has the  params on it labeled Prompt
              </div>
              <textarea style={{ height: "120px", width: "500px" }}>
                {`
              <Prompt when={!this.stae.loggedIn} message={(location} => 
                return location.pathname.startsWith('/user') 
                  ? "Are you sure?" 
                  : true
              }`}
              </textarea>
              <br />
              <br />
              <h4 id="switch">{`<Switch>`}</h4>
              <div className="description">
                Wrapping your Routes in a {`<Switch>`} tag, means that as soon
                as the first Route path matches, it stops and only show one
                Route at a time
              </div>
              <div className="description">
                A {`<Switch>`} looks through all its children {`<Route>`}
                elements and renders the first one whose path matches the
                current URL. Use a {`<Switch>`} any time you have multiple
                routes, but you want only one of them to render at a time
              </div>
              <textarea style={{ height: "320px", width: "500px" }}>
                {`
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </Switch>
              </div>
            </Router>`}
              </textarea>
              <br />
              <br />
              <div className="description">
                A {`<Switch>`} looks through all its children {`<Route>`}
                elements and renders the first one whose path matches the
                current URL. Use a {`<Switch>`} any time you have multiple
                routes, but you want only one of them to render at a time
              </div>
              <h3 className="description">
                Handling 404 pages (catch all routes) with React Router v4 by
                Tyler McGinnis
              </h3>
              <a href="https://tylermcginnis.com/react-router-handling-404-pages/">
                Link
              </a>
              <div className="description">
                To catch non existent paths, you can create a Route that doesnt
                specify a path, which means it'll always be shown, but use it
                with Switch and it will only show when not of the other paths
                are matched
              </div>
              <textarea style={{ height: "120px", width: "500px" }}>
                {`
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/will-match" component={WillMatch} />
                <Route component={NoMatch} />
              </Switch>`}
              </textarea>
              <br />
              <br />
              <li>
                <h3 className="description">Dev Ed Video</h3>
                <a href="https://www.youtube.com/watch?v=Law7wfdg_ls">
                  Link to the Tutorial
                </a>
                <div className="description">
                  If no path is found, shows error component.
                </div>
                <textarea style={{ height: "120px", width: "500px" }}>
                  {`
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                      <Route path="/features" component={FeaturePage} />
                      <Route path="" component={NotFoundPage} />
                  </Switch>`}
                </textarea>
              </li>
              <br />
              <h3 className="description">Stackoverflow</h3>
              <a href="https://stackoverflow.com/questions/32128978/react-router-no-not-found-route">
                Link
              </a>
              <div className="description">
                This example provides an elegant way to render error state
                messages specific to a grouping of routes.{" "}
              </div>
              <textarea style={{ height: "220px", width: "550px" }}>
                {`
                  <Route path='/' component={Layout} />
                    <IndexRoute component={MyComponent} />
                    <Route path='/users' component={MyComponent}>
                        <Route path='user/:id' component={MyComponent} />
                        <Route path='*' component={UsersNotFound} />
                    </Route>
                    <Route path='/settings' component={MyComponent} />
                    <Route path='*' exact={true} component={GenericNotFound} />
                </Route>`}
              </textarea>
              <br />
              <br />
              <div className="description">
                you can provide a catch all for non-existent routes to redirect
                to the homepage
              </div>
              <textarea style={{ height: "120px", width: "500px" }}>
                {`
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/users" component={Users} />
                    <Redirect to="/home" />
                </Switch>`}
              </textarea>
              <br />
              <div className="description">
                or you can redirect to an error page
              </div>
              <textarea style={{ height: "120px", width: "500px" }}>
                {`
                  <Switch>
                    <Route path="/users" component={MyComponent} />
                    <Route path="/404" component={GenericNotFound} />
                    <Redirect to="/404" />
                </Switch>`}
              </textarea>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
