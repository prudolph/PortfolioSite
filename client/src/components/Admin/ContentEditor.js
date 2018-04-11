import React from 'react'
import { EditorState, convertToRaw, convertFromHTML,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



class ContentEditor extends React.Component {

    constructor(props){
        super(props);
       
        this.onEditorStateChange=this.onEditorStateChange.bind(this);
        
        this.state = {
          editorState: EditorState.createEmpty()
        };
      }


      onEditorStateChange(updatedEditorState){  
          this.setState({
           editorState:updatedEditorState
        });
      };
      
      
      componentWillReceiveProps(props){
        
    
        if( props.content){
        
         const blocksFromHTML = convertFromHTML(props.content.trim());
         const contentState = ContentState.createFromBlockArray(
           blocksFromHTML.contentBlocks,
           blocksFromHTML.entityMap
         );
          this.setState ({
              editorState:EditorState.push(this.state.editorState, contentState)
          })  
             
        }
    }

    getCurrentContent(){
      return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    
      render() {
        const { editorState } = this.state;
  
        
        return (
          <div className="editorContainer">
            <Editor
              editorState={editorState}
              wrapperClassName="editorWrapper"
              editorClassName="contentEditor"
              onEditorStateChange={this.onEditorStateChange}
              toolbarOnFocus
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
                inline: {
                  options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                  bold: { className: 'bordered-option-classname' },
                  italic: { className: 'bordered-option-classname' },
                  underline: { className: 'bordered-option-classname' },
                  strikethrough: { className: 'bordered-option-classname' },
                  code: { className: 'bordered-option-classname' },
                },
                blockType: {
                  className: 'bordered-option-classname',
                },
                fontSize: {
                  className: 'bordered-option-classname',
                },
                fontFamily: {
                  className: 'bordered-option-classname',
                },
              }}
            />
          </div>
        );
      }

};
export default ContentEditor;

