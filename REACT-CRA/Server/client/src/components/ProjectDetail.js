import React, { Component } from 'react';
import Modal from 'react-modal'
import renderHTML from 'react-render-html';
import { Carousel } from 'react-responsive-carousel';

import  'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
		return (
			<Modal
				isOpen={!!this.props.projectData}
				onRequestClose={this.props.handleProjectClose}
				contentLabel="Project Detail"
			>	
				<div className="projectDetail">
					<button className="projectDetail__closeBtn" onClick={this.props.handleProjectClose} >X</button>
					<h3 className="projectDetail__title">{this.props.projectData.title}</h3>
				
					<Carousel className="projectDetail__carousel" axis="horizontal" width={"100%"} showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} emulateTouch={true} >
						{this.state.images.map(
							(image, index) => {
								return <div key={index}><img src={image} alt="img"/></div>;
							})
						}
					</Carousel>
						<div className="projectDetail__info">
						<div><p className="projectDetail__description">{renderHTML(this.props.projectData.description)}</p></div>
						<div><p className="projectDetail__facts">{renderHTML(this.props.projectData.facts)}</p></div>
					</div>
					<p className="projectDetail__tags">{this.props.projectData.tags}</p>



								</div>
			</Modal>





		);
	}
}

export default ProjectDetail;
