import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter.js'
import 'normalize.css/normalize.css';
import './stylesheets/main.scss'

ReactDOM.render(<AppRouter/>,document.getElementById('app'));
