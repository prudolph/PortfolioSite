import React from 'react';
import ReactDOM from 'react-dom';

//Components
import Header from './components/header';
import Bio from './components/bio';
import ProjectList from './components/projectList';
import Contact from './components/contact';


ReactDOM.render(
  <div>
    <Header/>
    <Bio/>
    <ProjectList
    url='http://localhost:3001/api/projects'
    pollInterval={2000}/>
    <Contact/>
  </div>,
  document.getElementById('root')
);
