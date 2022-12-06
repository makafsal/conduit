import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { URLs } from '../constants/common';

export const createApollo = (httpLink: HttpLink) => {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri: URLs.serverUrl })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}