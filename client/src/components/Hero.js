import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import {firebase} from '../firebase/firebase'

//import DynamicBkg from './DynamicBkg'
class Hero extends Component {
  constructor(props) {
		super(props);
		this.state = {
      bioData:""
    };
    this.database = firebase.database();
	}

  componentWillMount() {

    var self = this;
		this.database.ref('bio')
			.ref.once("value")
  			.then(function(snapshot) {
        var projects =[];
        
				snapshot.forEach((childSnapshot)=> {
          self.setState({bioData:childSnapshot.val()})
				})
			
			
  	});
    /*
		fetch('http://localhost:3000/api/bio')
			.then(response => response.json())
			.then(data => this.setState({ bioData: data },()=>{
       // console.log("BIO DATA: ", this.state);
      }));
      */
  }
  
  render() {
    return (
    
      <div className="hero">
        {/*<DynamicBkg colors={['#000000','#0000FF','#00FF00','#FF0000']}/>*/}
        <div className="hero_bioData">
          {!!this.state.bioData.bioImageUrl &&(<img className="hero__bioimg" src={this.state.bioData.bioImageUrl}  alt="profileImg" />)}
          {!!this.state.bioData.description &&  renderHTML("<div className='hero__biotxt'>"+this.state.bioData.description+"</div>")}          
        </div>
        <a className="hero_resume" href="https://s3-us-west-2.amazonaws.com/paulportfoliostorage/resume/Resume_PaulRudolph_May2018.pdf">Resume</a>

      </div>
    );
  }
}

export default Hero;
