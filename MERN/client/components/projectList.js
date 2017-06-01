import React, { Component } from 'react';
import Project from './project';

import '../stylesheets/main.css';

import data from '../../data.json'

class ProjectList extends Component {
  constructor() {
      super();
        console.log( JSON.stringify(data)) ;

    }


    loadProjects(){
         var projects = [];
         for (var property in data) {
            projects.push( <Project  data={data[property]}/>);
         }
         return projects;
       }
 render() {
     return (
       <div className="projectList">
         {this.loadProjects()}
      </div>
    )}
}
export default ProjectList;
