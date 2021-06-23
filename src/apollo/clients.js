import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

export const protocol2 = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
  }),
  cache: new InMemoryCache(),
});

export const coumpound = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2      ',
  }),
  cache: new InMemoryCache(),
});
