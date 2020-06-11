import React from "react";
import { render } from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { Desks, DeskOverview, NotFound } from "pages";

import { WithApollo } from "utils";

import "styles.css";

const App = () => (
  <WithApollo>
    <Router>
      <Switch>
        <Route exact path="/">
          <Desks />
        </Route>
        <Route path="/desk/:id">
          <DeskOverview />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </WithApollo>
);

render(<App />, document.getElementById("root"));
