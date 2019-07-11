import React, { Component } from 'react';
//import PageLayout from '../../containers/PageLayout';
import Home from '../Home';
import { StaticRouter,  Route, Switch } from 'react-router-dom';


export default ( {req} ) => {
  const context = {};
  return (
    <div className="appWrapper">
      <h1>React is running</h1>
      <StaticRouter location={ req.url } context={context}>
        <Switch>
          <Route exact path="*" component={Home} />  
        </Switch>            
      </StaticRouter>
    </div>
  );
}