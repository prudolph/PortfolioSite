import React from 'react';
import { BrowserRouter , Route,Switch} from 'react-router-dom';

import Header from '../components/Header'
import Projects from '../components/Projects'
import About from '../components/About'
import Posts from '../components/Posts'
import NotFound from '../components/NotFound'
import LoginPage from '../components/Admin/LoginPage'

 const AppRouter = () =>(

    <BrowserRouter>
    <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={Projects}/>
            <Route path="/admin" component={LoginPage}/>
            <Route path="/about" component={About}/>
            <Route path="/posts" component={Posts}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
    </BrowserRouter>

 )

 export default AppRouter;