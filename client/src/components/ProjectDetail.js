import React, { Component } from 'react';
import Modal from 'react-modal'
import renderHTML from 'react-render-html';
//import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
 

class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		
		this.close = this.close.bind(this);
		this.renderImages = this.renderImages.bind(this);
	}

	componentWillMount() {
		Modal.setAppElement('body');
		this.renderImages();
	}
	
	close() { this.props.closeCallback(this) }

	renderImages() {
		var images = [];
		const imageData = JSON.parse("["+this.props.projectData.mediaURLS+"]");
		
		for (var imageIndex in imageData) {
			const img=imageData[imageIndex];
			images.push(img.url)
		}
		this.setState({ images })
	}

	render() {

		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			className:"projectDetail__carousel",
			adaptiveHeight:true
		  };

		return (
			<Modal
				isOpen={!!this.props.projectData}
				onRequestClose={this.props.handleProjectClose}
				contentLabel="Project Detail"
				className="projectDetail__Modal"
				overlayClassName="projectDetail__Overlay"
			>	
				<div className="projectDetail">
					<button className="projectDetail__closeBtn" onClick={this.props.handleProjectClose} >X</button>
						  <Slider {...settings}>
		
						{this.state.images.map(
							(assetUrl, index) => {
							
								var filename = assetUrl.split('\\').pop().split('/').pop();
								var ext = filename.split('.').pop();
								if(ext =="mp4"){
										return <div className = "projectDetail_Slide" key={index}>
											<video src = {assetUrl} autoPlay loop muted/>
										</div>;
								}else{
									return <div className = "projectDetail_Slide" key={index}><img src={assetUrl} alt="img"/></div>;
								}
						
							
								
							})
						}
					</Slider>
					<h3 className="projectDetail__title">{this.props.projectData.title}</h3>
			
						<div className="projectDetail__info">
						<div><p className="projectDetail__description">{renderHTML(this.props.projectData.description)}</p></div>
						{/*<div><p className="projectDetail__facts">{renderHTML(this.props.projectData.facts)}</p></div>*/}
					</div>
					{/*<p className="projectDetail__tags">{this.props.projectData.tags}</p>*/}
					</div>
			</Modal>





		);
	}
}

export default ProjectDetail;
