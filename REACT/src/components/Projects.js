import React from 'react'
import ProjectData from '../data.json'
import ProjectItem from './ProjectItem'
import Hero from './Hero'

export default class Projects extends React.Component{
    constructor(props){
        super(props);
   
    }

    
    createProjects(data){
        var Projects = [];
        
        for (var project in data) {
           Projects.push( 
           <ProjectItem 
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
            <Hero/>
            {this.createProjects(ProjectData)}
        </div>
       )
      }
}
