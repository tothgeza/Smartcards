
import './App.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import SideNav from "./components/SideNav";

function App() {

    return (
        <div className="d-flex flex-column vh-100">
            <NavBar />
            <SideNav />
            <Footer />
        </div>
    );
}

export default App;
