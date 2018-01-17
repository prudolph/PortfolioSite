import React, { Component } from 'react';
import Project from './Project';

class Category extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      projects:[]
    };
  }

  componentWillMount(){
    for (var project in this.props.data) {
      var projectData = this.props.data[project];
      this.state.projects.push( <Project key={projectData.id}  data={projectData}/>);
   }
  }
   
  render() {
    return (
      <div id={this.props.name}>
        <div className="category-title" >
          <hr/>
          <p>{this.props.name}</p>
          <hr/>
        </div>
        <div className="projects">
          {this.state.projects}
        </div>
      </div>
    );
  }
}

export default Category;
