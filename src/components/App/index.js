import React, { Component } from 'react';
import Header from '../Header';
import Home from '../Home';
import Greetings from '../Greetings';
import { BrowserRouter,  Route, Switch } from 'react-router-dom';


export default ( {req, client} ) => {
  return (
    <div className="appWrapper">
      <h1>React is running</h1>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />  
          <Route exact path="/greetings" component={Greetings} />  
        </Switch>            
      </BrowserRouter>
    </div>
  );

}