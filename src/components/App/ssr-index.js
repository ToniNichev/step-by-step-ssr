import React, { Component } from 'react';
import Header from '../Header';
import Home from '../Home';
import Greetings from '../Greetings';
import { StaticRouter,  Route, Switch } from 'react-router-dom';


export default ( {req} ) => {
  const context = {};
  return (
    <div className="appWrapper">
      <h1>React is running</h1>
      <StaticRouter location={ req.url } context={context}>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />  
          <Route exact path="/greetings" component={Greetings} />  
        </Switch>            
      </StaticRouter>
    </div>
  );
}