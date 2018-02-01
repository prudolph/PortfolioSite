import React from 'react'

import ProjectItem from './ProjectItem'
import ProjectDetail from './ProjectDetail'

import Hero from './Hero'


export default class Projects extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            projectData: [],
            selectedProject:undefined

        };
    }

    componentDidMount() {
        console.log("Component did mount"); 
        fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(data => this.setState({ projectData: data }));
    }

    handleProjectSelect(project){
        console.log("Project selected ",project);
        this.setState({
            selectedProject:true
        })
    }
    handleProjectClose(){
        console.log("Project close");
        this.setState({
            selectedProject:false
        })

    }

    createProjects(data){
        var Projects = [];
        
        for (var project in data) {
             const projObj = data[project];
         /*
             console.log("Project: ", projObj);
             console.log("Project ID : ", projObj['_id']);
             console.log("Project Name : ", projObj['title']);
           */  
             
         
           Projects.push( 
           <ProjectItem 
            handleProjectSelect ={this.handleProjectSelect.bind(this)}
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
            <ProjectDetail 
                 handleProjectClose = {this.handleProjectClose.bind(this)}
                selectedProject={this.state.selectedProject}
            />
        </div>
       )
      }
}
