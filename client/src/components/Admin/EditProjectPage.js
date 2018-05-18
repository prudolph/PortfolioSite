import React from 'react'
import ContentEditor from './ContentEditor'
import {firebase} from '../../firebase/firebase'
import moment from 'moment'


class EditProjectPage extends React.Component {

    constructor(props){
        super(props);
        const pathname = this.props.location.pathname;
        const projectId  = pathname.substr(pathname.lastIndexOf('/') + 1)
        
        console.log("Prject ID", projectId);
        
        this.state ={
            projectId,
            projectData:{}
        }
        this.database = firebase.database();
        this.handleChange=this.handleChange.bind(this);
      }

      componentWillMount(){
        
        this.fetchProjectFromFirebase();

     
      }

      fetchProjectFromFirebase(){
        
        this.database.ref(`projects/${this.state.projectId}`).once('value')
        .then((snapshot) => {
            const val = snapshot.val();
            console.log(val);
            this.setState({projectData:snapshot.val()})
        })
        .catch((e) => {
            console.log('Error fetching data', e);
        });
      }

      fetchProjectFromOldDatabase(){

        const url = 'http://localhost:3000/api/projects/id/'+this.state.projectId
        console.log("Getting project: ",url)
        fetch(url)
        .then(response => response.json())
        .then(data =>{
             this.setState({ 
                projectData: data
            })
        });
      }
     
     
      handleChange(e){
        
        var title = this.state.projectData.title;
        console.log("Title ", title);
        
        console.log("On change handler target :",e.target.name);
        var projectData = this.state.projectData;
        projectData[e.target.name] = e.target.value;
        this.setState({"projectData":projectData});
        
     }
  
        saveUpdates(){

            console.log("Save Updates")
            console.log("Description: ",this.refs.description.getCurrentContent());
            console.log("project data ", this.state.projectId);
            this.database.ref(`projects/${this.state.projectId}`).set({
               
                title:this.refs.title.value,
                slug:this.refs.slug.value,
                subtitle:this.refs.subtitle.getCurrentContent(),
                description: this.refs.description.getCurrentContent(),
                facts:this.refs.subtitle.getCurrentContent(),
                installDate:this.refs.installDate.value,
                tags:this.refs.tags.value,
                thumbnailURL:this.refs.thumbnailURL.value,
                heroURL:this.refs.heroURL.value,
                mediaURLS:this.refs.mediaURLS.value

              }).then(() => {
              console.log('Data is saved!');
            }).catch((e) => {
              console.log('This failed.', e);
            });
        }
 
      render() {

        
        var {   
                title="",
                description = "",
                slug="",
                subtitle="",
                facts="",
                installDate="",
                tags="",
                thumbnailURL="",
                heroURL="",
                mediaURLS="" } = this.state.projectData;

                console.log("this.state.projectData ",this.state.projectData)
        return (
          <div>
          

            <label htmlFor="title">Title</label>
            <input type="text" ref = "title" name="title" id="title" value={title}   onChange={this.handleChange.bind(this)}/>
            <br/>
            
            <label htmlFor="slug">Slug</label>
            <input type="text" ref = "slug" name="slug" id="slug" value={slug}  onChange={this.handleChange.bind(this)}/>
            <br/>

           <label htmlFor="subtitle">Subtitle</label>
            <ContentEditor content={ subtitle } ref = "subtitle" name="subtitle" />
            <br/>
    
           
            <label htmlFor="description">Description</label>
            <ContentEditor content={ description } ref = "description" name="description" />
            <br/>

            <label htmlFor="facts">Facts</label>
            <ContentEditor content={ facts } ref = "facts" name="facts" />
            <br/>
           
            <label htmlFor="installDate"> Install Date</label>
            <input type="date" ref = "installDate" name="installDate" id="installDate" value={moment(Date(installDate)).format("YYYY-MM-D")}   onChange={this.handleChange.bind(this)} />
            <br/>

            <label htmlFor="tags">Tags</label>
            <input type="text" ref = "tags" name="tags" id="tags" value={tags}  onChange={this.handleChange.bind(this)}/>
            <br/>

            <label htmlFor="thumbnailURL">Thumbnail URL</label>
            <input type="text" ref = "thumbnailURL" name="thumbnailURL" id="thumbnailURL" value={thumbnailURL}  onChange={this.handleChange.bind(this)}/>
            <br/>


            <label htmlFor="heroURL">Hero URL</label>
            <input type="text" ref = "heroURL" name="heroURL" id="heroURL" value={heroURL}  onChange={this.handleChange.bind(this)} />
            <br/>

             <label htmlFor="mediaURLS">Media URLs</label>
            <textarea ref = "mediaURLS" name="mediaURLS" id="mediaURLS" value={mediaURLS}  onChange={this.handleChange.bind(this)}/>
            <br/>
           
            <button className={"saveBtn"} onClick = {this.saveUpdates.bind(this)}>Save</button>
          </div>
        );
      }

};
export default EditProjectPage;

