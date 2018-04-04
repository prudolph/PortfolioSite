import React from 'react'
import {connect} from 'react-redux'




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
		//console.log("Projects Component did mount");
		fetch('http://localhost:3000/api/projects')
			.then(response => response.json())
			.then(data => this.setState({ projectData: data }));
    }


    render(){
        return(
            <div>
                <h1>ADMIN PROJECT LIST PAGE</h1>
            </div>
        )
    }

}
export default ProjectListPage;

