import React, { Component } from 'react';
import Modal from 'react-modal'
import renderHTML from 'react-render-html';
import { Carousel } from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';


class ProjectDetail extends Component {
	constructor(props) {
		super(props);

		console.log("Project Detail", this.props.projectData);
		this.close = this.close.bind(this);
		this.renderImages = this.renderImages.bind(this);
	}

	componentWillMount() {
		Modal.setAppElement('body');
		this.renderImages();
	}
	close() { this.props.closeCallback(this) }

	renderImages() {
		console.log("Render Images");


		var images = [];

		for (var imageIndex in this.props.projectData.mediaUrls) {
			const imageData = JSON.parse(this.props.projectData.mediaUrls[imageIndex]);
			images.push(imageData.url)
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

					<Carousel className="projectDetail__carousel" axis="horizontal" width={"100%"} showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} emulateTouch={true} >
						{this.state.images.map(
							(image, index) => {
								return <div key={index}><img src={image} /></div>;
							})
						}
					</Carousel>
					<h3 className="projectDetail__title">{this.props.projectData.title}</h3>
					<div className="projectDetail__info">
						<p className="projectDetail__description">{renderHTML(this.props.projectData.description)}</p>
						<p className="projectDetail__facts">{renderHTML(this.props.projectData.facts)}</p>
					</div>
					<p className="projectDetail__tags">{this.props.projectData.tags}</p>



								</div>
			</Modal>





		);
	}
}

export default ProjectDetail;
