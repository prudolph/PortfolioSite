import React from 'react';
import renderHTML from 'react-render-html';

class ProjectItem extends React.Component {


  render() {
    return (
      <div 
        className="projectItem" 
        onClick={this.props.handleProjectSelect}>
        <img className="projectItem__image" src={this.props.image} alt="project" />
        {<h1 className="projectItem__title">{this.props.title}</h1>}
        {<div className="projectItem__subtitle">{renderHTML(this.props.subtitle)}</div>}

      </div>
    );
  }
}

export default ProjectItem;
