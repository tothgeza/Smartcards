import React, {useState, useEffect} from 'react';
import AuthService from "../../services/auth.service";
import SideNav from "./SideNav";
import Content from "./Content";
import ContentHeader from "./ContentHeader";
import MyClassService from "../../services/myClass.service";
import './myclasses.css';
import {Offcanvas} from "react-bootstrap";
import {AiOutlineMenuUnfold} from "react-icons/ai";
import {Link} from "react-router-dom";
import {FcFolder} from "react-icons/fc";

const MyClasses = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeMyClass, setActiveMyClass] = useState({
    decks: []
  });

  const [myClasses, setMyClasses] = useState([]);
  const [isActiveMyClass, setIsActiveMyClass] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  }

  const fetchMyClass = () => {
    MyClassService.getMyClasses()
      .then(function (result) {
        if (result.status === 200) {
          setMyClasses(result.data)
        } else {
          setMyClasses([])
        }
      })
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsUserLoggedIn(true);
    }
  }, [])

  return (
    <div>
      {isUserLoggedIn ? (
        <main>
          <div className={"side-nav-link"}>
            <Link to={"/#0"}
                  onClick={(event) => handleShow(event)}>
              <FcFolder size={"2em"} />
            </Link>
          </div>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton
                              style={{backgroundColor:" #ECF6FF"}}
            >
            </Offcanvas.Header>
            <Offcanvas.Body className={"p-0"} style={{width:"auto"}} scroll={false}>
              <SideNav
                activeMyClass={activeMyClass}
                setActiveMyClass={setActiveMyClass}
                setIsActiveMyClass={setIsActiveMyClass}
                fetchMyClass={fetchMyClass}
                myClasses={myClasses}
              />
            </Offcanvas.Body>
          </Offcanvas>
          <div className={"flex-shrink-0 h-100 side-nav-wrapper"}>
            <SideNav
              activeMyClass={activeMyClass}
              setActiveMyClass={setActiveMyClass}
              setIsActiveMyClass={setIsActiveMyClass}
              fetchMyClass={fetchMyClass}
              myClasses={myClasses}
            />
          </div>
           {/*Vertical Divider */}
          {/*<div className="b-example-divider"/>*/}
          {
            isActiveMyClass &&
            <div className="w-100 p-5 my-class">
              <ContentHeader
                activeMyClass={activeMyClass}
                setActiveMyClass={setActiveMyClass}
                currentUser={currentUser}
                setIsActiveMyClass={setIsActiveMyClass}
                fetchMyClass={fetchMyClass}
              />
              <Content
                activeMyClass={activeMyClass}
              />
            </div>
          }
        </main>
      ) : (
        <div className="container text-center">
          <h2 className="mt-5">Permission denied!</h2>
        </div>
      )
      }
    </div>
  );
};

export default MyClasses;
