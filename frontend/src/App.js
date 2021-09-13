
import './App.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import SideNav from "./components/SideNav";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="d-flex flex-column vh-100">
                <NavBar />
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/account" component={SideNav} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
