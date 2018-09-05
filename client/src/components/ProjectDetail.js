import React, { Component } from 'react';
import Slider from "react-slick";
import {firebase} from '../firebase/firebase'

 

class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		this.state={
			currentProject:{},
			images:[]

		}
		this.renderImages = this.renderImages.bind(this);
		this.isMobileDevice = this.isMobileDevice.bind(this);
		this.database = firebase.database();
	}

	componentWillMount() {
		let slug = this.props.location.pathname.split("/").pop()

		var self = this;
		this.database.ref("projects").orderByChild('slug')
			.ref.once("value")
  			.then(function(snapshot) {
	
				snapshot.forEach((childSnapshot)=> {
					const record = childSnapshot.val();
					if(record.slug === slug){
						console.log("SNAPSHOT ", childSnapshot.val())
						self.setState({currentProject:record},()=>{
							self.renderImages();
						})
					}
				})
			})

	}
	


	renderImages() {
		console.log("Render images");
		var images = [];
		const mediaUrls= this.state.currentProject.mediaURLS;
		console.log("media urls: ",mediaUrls)
		const imageData = JSON.parse("["+mediaUrls+"]");
		
		for (var imageIndex in imageData) {
			const img=imageData[imageIndex];
			images.push(img.url)
		}
		this.setState({ images })
		
	}
	
	isMobileDevice() {
		return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	};
	
	renderDescription(){
		if(this.state.currentProject){
			return <p className="projectDetail__description"  dangerouslySetInnerHTML={{ __html: this.state.currentProject.description }}></p>
		}		
	}
	render() {

		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			className:"projectDetail__carousel",
			adaptiveHeight:false,
			autoPlay:true,
			//centerMode:true
			
		  };

		return (
			/*
			<Modal
				isOpen={!!this.props.projectData}
				onRequestClose={this.props.handleProjectClose}
				contentLabel="Project Detail"
				className="projectDetail__Modal"
				overlayClassName="projectDetail__Overlay"
			>
			*/	
				<div className="projectDetail">
				<div className="projectDetail_header">
				<h3 className="projectDetail__title">{this.state.currentProject.title}</h3>
				
				</div>
					<div className="projectDetail__info">
					<Slider {...settings}>
						{this.state.images.map(
							(assetUrl, index) => {
								var filename = assetUrl.split('\\').pop().split('/').pop();
								var ext = filename.split('.').pop();
								if(ext ==="mp4"){
										return <div className = "projectDetail_Slide" key={index}>
											<video src = {assetUrl} autoPlay loop muted playsInline/>
										</div>;
								}else{
									return <div className = "projectDetail_Slide" key={index}><img src={assetUrl} alt="img"/></div>;
								}			
							})
						}
				
					</Slider>
						{this.renderDescription()}
					</div>
					
					</div>
					/*
			</Modal>
*/




		);
	}
}

export default ProjectDetail;
