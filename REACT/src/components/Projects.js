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
        console.log("Projects Component did mount"); 
        fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(data => this.setState({ projectData: data }));
    }

    handleProjectSelect(projectSlug){
        const foundProject =  this.state.projectData.find(({slug})=>{return slug===projectSlug;});
      
        this.setState({selectedProject:foundProject},()=>{

            console.log("displaying prject ", this.state.selectedProject)
        })
    }
    handleProjectClose(){
        this.setState({selectedProject:undefined})
    }

    createProjects(data){
        var Projects = [];        
        for (var project in data) {
             const projObj = data[project];
        
             try{
                const [imageUrlString]= projObj.mediaUrls
                const imageUrl = JSON.parse(imageUrlString).url;

                const {_id:key,slug,title}=projObj;
                Projects.push( 
                    <ProjectItem 
                        handleProjectSelect ={this.handleProjectSelect.bind(this,slug)}
                        key={key}  
                        title={title} 
                        image={imageUrl}
                        />
                );

                } catch(e){
                    console.log("could not load image");
                }
        
        }
        return Projects;
      }
    createProjectDetail(){
        console.log("createProjectDetail");
       return( <ProjectDetail 
        handleProjectClose = {this.handleProjectClose.bind(this)}
        selectedProject={this.state.selectedProject}
    />)

    }

      render(){
          
       return(
          
        <div className="projects">
            <Hero/>
            {this.createProjects(this.state.projectData)}
          
            {this.createProjectDetail.bind(this)}
          
       
        </div>
       )
      }
}
