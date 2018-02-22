import React, { Component } from 'react';
import Modal from 'react-modal'



class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    
    console.log("Project Detail", this.props);
    this.close = this.close.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');

  }
  close() {this.props.closeCallback(this)}

  render() {
    return ( 
      <Modal 
        isOpen={!!this.props.selectedProject}
        onRequestClose ={this.props.handleProjectClose}
        contentLabel = "Project Detail" 
        
      >
      <h3>Project</h3>
      <button onClick ={this.props.handleProjectClose} >Close</button>
      </Modal>
      /*
      <div className="project-overlay-container" onClick={this.close}>
        <div className="project-detail-container">

          <img className="close-btn" onClick={this.close}  src='./closebtn.png'></img>
          
          <div className="project-content">
            <div className="project-image"> <img src={this.props.data.imagePath_detail}></img> </div>
            <div className="project-copy">
              <p className="project-title"> {this.props.data.destination}</p>
              <p className="project-subtitle">{this.props.data.teaser}</p>
              
              <p className="project-description" dangerouslySetInnerHTML={{__html: this.props.data.description}} />
            
            </div>
          </div>
        </div>

      </div>
      */
   
     


    );
  }
}

export default ProjectDetail;
