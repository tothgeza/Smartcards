import React, {useState, useEffect} from 'react';
import AuthService from "../../services/auth.service";
import SideNav from "./SideNav";
import Content from "./Content";
import ContentHeader from "./ContentHeader";
import MyClassService from "../../services/myClass.service";
import './myclasses.css';

const MyClasses = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeMyClass, setActiveMyClass] = useState({
    decks: []
  });

  const [myClasses, setMyClasses] = useState([]);
  const [isActiveMyClass, setIsActiveMyClass] = useState(false);

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
          <SideNav
            activeMyClass={activeMyClass}
            setActiveMyClass={setActiveMyClass}
            setIsActiveMyClass={setIsActiveMyClass}
            fetchMyClass={fetchMyClass}
            myClasses={myClasses}
          />
          {/* Vertical Divider */}
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
