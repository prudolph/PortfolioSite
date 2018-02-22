import React, { Component } from 'react';


class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
    return (
      <div 
        className="project" 
        onClick={this.props.handleProjectSelect}>
        <img className="project-image" src={this.props.image} alt="project" />
        {<h1 className="project-title">{this.props.title}</h1>}

      </div>
    );
  }
}

export default ProjectItem;
