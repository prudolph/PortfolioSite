import React from 'react';
import Hero from './Hero'
import Categories from './Categories'



export default class PortfolioApp extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="app">
      <h1>Main Project Page</h1>

       {/*
        <Hero/>
        <Categories/>
       */}
      </div>
    );
  }
}


