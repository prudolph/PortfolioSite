import React, { Component } from 'react';
import ProjectDetail from './ProjectDetail';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        children:null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
  }


    openModal(e){
       if(!this.state.children){
         this.setState({children:<ProjectDetail data={this.props.data} closeCallback={this.closeModal.bind(this)}/>});
       }
     }

     closeModal(e){
         this.setState({children:null});
      }

  render() {
    return (
      <div className="project" onClick={this.openModal}>
        <img className="project-image" src={this.props.data.imagePath_trip} alt="project" />
        {<h1 className="project-title">{this.props.data.headline}</h1>}
        {<p className="project-description">{this.props.data.teaser}</p>}
        {this.state.children}
      </div>
    );
  }
}

export default Project;
