import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SearchContainer } from "./search";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={SearchContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
