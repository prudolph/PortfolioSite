import React, { Component } from 'react';


class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
    return (
      <div 
        className="projectItem" 
        onClick={this.props.handleProjectSelect}>
        <img className="projectItem__image" src={this.props.image} alt="project" />
        {<h1 className="projectItem__title">{this.props.title}</h1>}

      </div>
    );
  }
}

export default ProjectItem;
