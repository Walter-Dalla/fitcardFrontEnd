import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router/lib';
//import { matchPattern } from 'react-router/lib/PatternUtils';
import * as serviceWorker from './serviceWorker';



import Home from './js/paginas/home.js';
import Equipe from './js/paginas/equipe.js';
import Login from './js/paginas/login.js';
import Estabelecimento from './js/components/estabelecimento/Estabelecimento'

let url = "http://localhost:8080";

ReactDOM.render(

    <Router history={browserHistory}>
        <Route path="/" component={() => <Home url={url}/> } />
        <Route path="/equipe" component={() => <Equipe url={url}/> } />
        <Route path="/login" component={() => <Login url={url}/> } />
        <Route path="/estabelecimento" component={() => <Estabelecimento url={url}/> } />
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
