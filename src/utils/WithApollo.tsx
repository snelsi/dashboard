import * as React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://my-tasks-manager.herokuapp.com/v1/graphql",
  }),
});

export const WithApollo: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
