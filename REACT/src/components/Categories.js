import React from 'react'
import CategoryData from '../data.json'
import Category from './Category'
export default class Categories extends React.Component{
    constructor(props){
        super(props);
        const categories = this.createCategories(CategoryData);
        console.log("categories", categories)
    }

    
    createCategories(data){
        var categories = [];
        for (var property in data) {
           categories.push( );
        }
        return categories;
      }

      render(){
          
       return(
        <div>

            {console.log("Cat Data",CategoryData)}
            {/*
            <Category 
                key={category}  
                name={category} 
                data={data[category]}/>
            */}
        </div>
       )
      }
}
