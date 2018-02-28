import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import DynamicBkg from './DynamicBkg'
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
       // console.log("BIO DATA: ", this.state);
      }));
  }
  
  render() {
    return (
      <div className="hero">
        <DynamicBkg colors={['#000000','#0000FF','#00FF00','#FF0000']}/>
        {!!this.state.bioData.imageUrl &&(<img className="bioImage" src={this.state.bioData.imageUrl}/>)}
       {!!this.state.bioData.description && renderHTML(this.state.bioData.description)}          
      </div>
    );
  }
}

export default Hero;
