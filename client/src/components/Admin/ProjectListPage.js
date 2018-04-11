import React from 'react'
import { Link} from 'react-router-dom';

class ProjectListPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projectData: [],
			selectedProject: undefined
        };
        
        console.log("Project List Page ");
	}

	componentDidMount() {
		console.log("Projects Component did mount");

		
		fetch('http://localhost:3000/api/projects')
			.then(response => response.json())
			.then(data => this.setState({ projectData: data }));
    }


    render(){
		console.log("projectData ", this.state.projectData)
        return(
            <div>
				<h1>EDIT Bio:</h1>
				<Link to={"/admin/bio/edit/"}>Bio PAge</Link>
                <h1>EDIT Projects:</h1>
				<ul>
					{this.state.projectData.map((project)=>{
						return  <li key={project.slug}><Link to={"/admin/projects/edit/"+project._id} key={project.slug}> {project.title}</Link></li>
					})}
				</ul>

				  


            </div>
        )
    }

}
export default ProjectListPage;

