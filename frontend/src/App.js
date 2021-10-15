import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MyClasses from "./components/MyClasses/MyClasses";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import LoginModal from "./components/MyClasses/Modals/LoginModal";
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

function App() {

  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/myclass" render={() => <MyClasses />}/>
        <Route path="/user" component={BoardUser}/>
        <Route path="/mod" component={BoardModerator}/>
        <Route path="/admin" component={BoardAdmin}/>
      </Switch>
      {/*<Footer />*/}
    </div>
  );
}

export default App;
