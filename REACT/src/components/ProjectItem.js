import React, { Component } from 'react';


class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div 
        className="project" 
        id={this.props.data.slug} 
        onClick={this.props.handleProjectSelect}>
        <img className="project-image" src={this.props.data.imagePath_trip} alt="project" />
        {<h1 className="project-title">{this.props.data.headline}</h1>}
        {<p className="project-description">{this.props.data.teaser}</p>}
      </div>
    );
  }
}

export default ProjectItem;
