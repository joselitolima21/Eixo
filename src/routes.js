import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom'

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Points from './pages/Points';
import Home from './pages/Home';
import Results from './pages/Results';


export default function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/page1' exact component={Page1}/>
                <Route path='/page2' exact component={Page2}/>
                <Route path='/page3' exact component={Page3}/>
                <Route path='/points' exact component={Points}/>
                <Route path='/results' exact component={Results}/>
            </Switch>
        </HashRouter>
    )
};
