import React from 'react'
import ContentEditor from './ContentEditor'
import {firebase} from '../../firebase/firebase'


class EditBioPage extends React.Component {

    constructor(props){
        super(props);
        const pathname = this.props.location.pathname;
        const projectId  = pathname.substr(pathname.lastIndexOf('/') + 1)
        this.state ={
            bioData:{}
        }
        this.database = firebase.database();
      }

      componentWillMount(){
        
        this.fetchProjectFromFirebase();

     
      }

      fetchProjectFromFirebase(){
        console.log("Fetching bio from firebase")
        var bio={};
        this.database.ref('bio').once('value')
        .then((snapshot) => {

          snapshot.forEach((childSnapshot)=> {
           bio= childSnapshot.val();	
          })
            
              this.setState({
                bioData:bio
              },()=>{
                console.log(this.state.bioData);
              })

        })
        .catch((e) => {
            console.log('Error fetching data', e);
        });
      }

      fetchBioFromOldDatabase(){

        const url = 'http://localhost:3000/api/bio/'
        fetch(url)
        .then(response => response.json())
        .then(data =>{
             this.setState({ 
              bioData: data
            })
        });
      }
     onChangeHandler(e){

        
     }
  
        saveUpdates(){

            console.log("Save Updates")
            console.log("Description: ",this.refs.description.getCurrentContent());
            
            this.database.ref('bio').push({
                oldID:this.state.bioData._id,
                description: this.refs.description.getCurrentContent(),
                bioImageUrl:this.refs.bioImageUrl.value

              }).then(() => {
              console.log('Data is saved!');
            }).catch((e) => {
              console.log('This failed.', e);
            });
        }
 
      render() {

        console.log("BIO DATA::::: ", this.state.bioData)
        
        var {   
                description = "",
                bioImageUrl="",
                id="" } = this.state.bioData;
        return (
          <div>
          

         
           
            <label htmlFor="description">Description</label>
            <ContentEditor content={ description } ref = "description" name="description" />
            <br/>

             <label htmlFor="bioImageUrl">BioImage Url </label>
            <textarea ref = "bioImageUrl" name="bioImageUrl" id="bioImageUrl" value={bioImageUrl}/>
            <br/>
           
            <button className={"saveBtn"} onClick = {this.saveUpdates.bind(this)}>Save</button>
          </div>
        );
      }

};
export default EditBioPage;

