import React from 'react'
import ProjectData from '../data.json'
import Project from './Project'

export default class Projects extends React.Component{
    constructor(props){
        super(props);
   
    }

    
    createProjects(data){
        var Projects = [];
        
        for (var project in data) {
           Projects.push( 
           <Project 
            key={project}  
            name={project} 
            data={data[project]}/>
        );
        }
        return Projects;
      }

      render(){
          
       return(
        <div className="projects">
            {console.log("Loading Projects")}
            <h1>Projects:</h1>
            {this.createProjects(ProjectData)}
        </div>
       )
      }
}
