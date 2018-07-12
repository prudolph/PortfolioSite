import React from 'react';
import { Router , Route,Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header'
import Projects from '../components/Projects'
import About from '../components/About'
import Posts from '../components/Posts'
import NotFound from '../components/NotFound'

import LoginPage from '../components/Admin/LoginPage'
import ProjectListPage from '../components/Admin/ProjectListPage'
import ProjectEditPage from '../components/Admin/EditProjectPage'
import BioEditPage from '../components/Admin/EditBioPage'
import PrivateRoute from './PrivateRoute'
import ProjectDetail from '../components/ProjectDetail';


export const history = createHistory();

 const AppRouter = () =>(

    <Router history={history}>
    <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={Projects}/>
            <Route exact path="/project/:slug" component={ProjectDetail}/>

            <Route exact path="/login" component={LoginPage}/>

            <PrivateRoute exact path="/admin/" component={ProjectListPage}/>
            <PrivateRoute exact path="/admin/projects/edit/:id" component={ProjectEditPage}/>
            <PrivateRoute exact path="/admin/bio/edit/" component={BioEditPage}/>
  
            <Route exact path="/about" component={About}/>
            <Route path="/posts" component={Posts}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
    </Router>

 )

 export default AppRouter;