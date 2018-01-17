import React from 'react';

import Header from './Header'
import Hero from './Hero'
import Categories from './Categories'



export default class PortfolioApp extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="app">
        <Header/>
        <Hero/>
        <Categories/>
      </div>
    );
  }
}


