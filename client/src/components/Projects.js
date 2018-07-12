import React from 'react'

import ProjectItem from './ProjectItem'
import ProjectDetail from './ProjectDetail'
import Hero from './Hero'
import {firebase} from '../firebase/firebase'


export default class Projects extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projectData: [],
			selectedProject: undefined
		};

		this.database = firebase.database();
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		
		//fetch('http://localhost:3000/api/projects')
		//	.then(response => response.json())
		//	.then(data => this.setState({ projectData: data }));
		var self = this;
		this.database.ref('projects')
			.ref.once("value")
  			.then(function(snapshot) {
				var projects =[];
				snapshot.forEach((childSnapshot)=> {
					projects.push( childSnapshot.val());	
				})
				self.setState({projectData:projects})
	
			
  	});
	
	}
	
	handleClick(e) {
		console.log("Handle projec select ", e);
		
		//const foundProject = this.state.projectData.find(({ slug }) => { return slug === projectSlug; });
		//this.setState({ selectedProject: foundProject })
	}
	
	handleProjectClose() {
		this.setState({ selectedProject: undefined })
	}

	createProjects(data) {
		var projects = [];
		for (var project in data) {
		
			const projObj = data[project];
			try {
				const imagesJsonString = "["+projObj.mediaURLS+"]"
				const imageUrlData = JSON.parse(imagesJsonString);
				var imageUrl="";
				var curOrder=1000;
				for (var imageObjIndex in imageUrlData){
					
					const imageObj = imageUrlData[imageObjIndex];
					if (imageObj.hero){
						imageUrl = imageObj.url;
						break;
					}
					else if(imageObj.order < curOrder){
						imageUrl = imageObj.url;
					}
					
				}
			if(imageUrl){
				const { slug, title ,subtitle} = projObj;


				projects.push(
					<ProjectItem
						handleProjectSelect={this.handleClick}
						key={slug}
						slug={slug}
						title={title}
						image={imageUrl}
						subtitle={subtitle}
					/>
				);
			}

			} catch (e) {
				console.log("could not load image", e);
			}

		}
		return projects;
	}

	displayDetail() {

		if (this.state.selectedProject) {
			return (
				<ProjectDetail
					handleProjectClose={this.handleProjectClose.bind(this)}
					projectData={this.state.selectedProject}
				/>
			)
		}
		else return
	}
	render() {

		return (
			<div>
				<Hero />
				<div className="projects">
					{this.createProjects(this.state.projectData)}
					{this.displayDetail()}
				</div>
			</div>
		)
	}
}
