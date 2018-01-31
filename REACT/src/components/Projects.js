import React from 'react'
import ProjectData from '../data.json'
import ProjectItem from './ProjectItem'
import Hero from './Hero'


export default class Projects extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {projectData: []};
    }

    componentDidMount() {
        console.log("Component did mount");
        //fetch('http://localhost:3000/api/projects')
        
        fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(data => this.setState({ projectData: data }));
    }



    createProjects(data){
        var Projects = [];
        
        for (var project in data) {
             const projObj = data[project];
             console.log("Project: ", projObj);
             console.log("Project ID : ", projObj['_id']);
             console.log("Project Name : ", projObj['title']);
             
             
         
           Projects.push( 
           <ProjectItem 
            key={projObj['_id']}  
            name={projObj['title']} 
            data={projObj}/>
        );
        }
        return Projects;
      }



      render(){
          
       return(
          
        <div className="projects">
            <Hero/>
            {this.createProjects(this.state.projectData)}
        </div>
       )
      }
}
