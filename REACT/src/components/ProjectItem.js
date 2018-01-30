import React, { Component } from 'react';
import ProjectDetail from './ProjectDetail';
import ReactModal from 'react-modal';

class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        children:null
    };

   
    
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <ProjectDetail data={this.props.data} closeCallback={this.closeModal.bind(this)}/>
         
        </Modal>
      </div>
    );
  }
}

export default ProjectItem;
