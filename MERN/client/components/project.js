import React, { Component } from 'react';
import '../stylesheets/main.css';
import logo from '../logo.svg';
class Project extends Component {

  constructor(props) {
  super(props);
  console.log(props);

  this.state = {

      };
}
 render() {
     return (
       <div className = "project">

            <img className="project-thumb-image" src={logo} alt="trip" />
          <h1>Title:{this.props.data.title}</h1>
          <p>Description:{this.props.data.description}</p>
      </div>
    )}
  }

export default Project;
