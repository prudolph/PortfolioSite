import React, { Component } from 'react';
import data from '../data.json'
import {findDOMNode} from 'react-dom';

class Header extends Component {

  handleLinkClick(event){

    event.preventDefault();
     var targetID = event.target.href.split("/").pop().substring(1);
     var target = document.getElementById(targetID);
     var targetPos = target.getBoundingClientRect().top;
		 var offset = window.pageYOffset;
     window.scrollTo(0, offset+targetPos-200);
    }


  createCategoryLinks(data){
    var categories = [];
    var cnt=0, limit=4;
    for (var category in data) {
       categories.push(  <a className={"category"}  key={category} href={"#"+category.replace(/[^0-9a-zA-Z]/g, '')} onClick={this.handleLinkClick.bind(this)}>{category}</a>);
       if(categories.length>limit)break;
    }
    return categories;
  }

  render() {
    return (

      <div className="site-header" >
        
      </div>
    );
  }
}

export default Header;
