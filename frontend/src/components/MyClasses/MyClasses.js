import React, {useState, useEffect} from 'react';
import AuthService from "../../services/auth.service";
import SideNav from "./SideNav";
import Content from "./Content";
import ContentHeader from "./ContentHeader";

const MyClasses = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeMyClass, setActiveMyClass] = useState({
    decks: []
  });

  const [isActiveMyClass, setIsActiveMyClass] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsUserLoggedIn(true);
    }
  }, [])

  return (
    <div style={{
      height: "100vh",
      overflowY: "hidden"
    }}>
      {isUserLoggedIn ? (
        <main>
          <SideNav
            activeMyClass={activeMyClass}
            setActiveMyClass={setActiveMyClass}
            setIsActiveMyClass={setIsActiveMyClass}
          />
          {/* Vertical Divider */}
          <div className="b-example-divider"/>
          {
            isActiveMyClass &&
            <div className="w-100 p-2">
              <ContentHeader
                activeMyClass={activeMyClass}
                setActiveMyClass={setActiveMyClass}
                currentUser={currentUser}
                setIsActiveMyClass={setIsActiveMyClass}
              />
              <Content
                activeMyClass={activeMyClass}
              />
            </div>
          }
        </main>
      ) : (
        <div className="container">
          <h2>You don't have permission!</h2>
        </div>
      )
      }
    </div>
  );
};

export default MyClasses;
