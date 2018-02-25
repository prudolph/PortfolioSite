import React, { Component } from 'react';
import renderHTML from 'react-render-html';

class Hero extends Component {
  constructor(props) {
		super(props);
		this.state = {
      bioData:""
		};
	}

  componentWillMount() {
		fetch('http://localhost:3000/api/admin/bio')
			.then(response => response.json())
			.then(data => this.setState({ bioData: data },()=>{
        console.log("BIO DATA: ", this.state);
      }));
  }
  
  render() {
    return (
      <div className="hero__container">
       {!!this.state.bioData.description && renderHTML(this.state.bioData.description)}          
      </div>
    );
  }
}

export default Hero;
