import React, { Component } from 'react';
import ComponentList from './ComponentList';
import PagesLayoutData from './pages-layout-data';
import { graphql } from 'react-apollo';
import query from './query';


class PageLayout extends Component {
    constructor(props) {
      super(props);      
    } 
  
    render() {
      console.log("getPageByUrl  >>>>>", this.props.data.getPageByUrl);

      const url = this.props.history.location.pathname;
      const pageComponentsList = PagesLayoutData[url];

      debugger;
      const layout = pageComponentsList.map((componentName, id , components) => {
        const Component = ComponentList[componentName];
        return(<Component key={componentName} />);
      });
      
      return(layout);
    }
}

export default graphql(query, {
  options(props) {
    return {
      variables: {
        url: props.history.location.pathname
      },
    };
  },
})(PageLayout);