import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Graph from './pages/Graph';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Page1}/>
                <Route path='/page2' exact component={Page2}/>
                <Route path='/page3' exact component={Page3}/>
                <Route path='/graph' exact component={Graph}/>
            </Switch>
        </BrowserRouter>
    )
};
