import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import JoinSession from './component/join-session.component';
import Session from './component/session.component';
import Preparation from './component/preparation.component';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={JoinSession}></Route>
                <Route path="/preparation/:sessionPin" component={Preparation}></Route>
                <Route 
                    path="/session/:sessionPin/:currentTrial/:wordList"
                    component={Session}
                ></Route>
            </Switch>
        </Router>
    );
}
export default App;
