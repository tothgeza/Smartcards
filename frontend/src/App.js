import React from 'react';
import {Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

function App() {

    return (
        <div className="d-flex flex-column vh-100">
            <NavBar/>
            <Switch>
                <Route exact path={["/", "/home"]} component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/myclass" component={SideNav}/>
                <Route path="/user" component={BoardUser}/>
                <Route path="/mod" component={BoardModerator}/>
                <Route path="/admin" component={BoardAdmin}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
