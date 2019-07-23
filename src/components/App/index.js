import React, { Component } from 'react';
import PageLayout from '../../containers/PageLayout';
import { BrowserRouter,  Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import styles from './styles.scss';

export default ( req, client ) => {
  return (
    <div className={styles.appWrapper}>
      <h1>React is running</h1>
      <ApolloProvider client={client}>      
        <BrowserRouter>
          <Switch>
            <Route exact path="*" component={PageLayout} />  
          </Switch>            
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );

}