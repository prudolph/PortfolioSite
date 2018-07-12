import React from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
class ProjectItem extends React.Component {


	render() {
		return (
			<div
				className="projectItem"
				onClick={() => this.props.handleProjectSelect(this.props.slug)}
			>
			
				<Link to={`/project/${this.props.slug}`} >

					<img   className="projectItem__image" src={this.props.image} alt="project" />
					{<h1   className="projectItem__title">{this.props.title}</h1>}
					{<div  className="projectItem__subtitle">{renderHTML(this.props.subtitle)}</div>}
				</Link>
			</div>
		);
	}
}

export default ProjectItem;
