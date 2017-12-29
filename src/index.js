import React from "react";
import ReactDOM from "react-dom";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./index.css";
import AppWithData from "./App";
import registerServiceWorker from "./registerServiceWorker";

// TODO: Add global config object and store endpoint in that...
const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjba398fn2ind01829ij9we5p",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppWithData />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
