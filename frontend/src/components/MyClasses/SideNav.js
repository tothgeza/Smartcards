import React, {useEffect, useRef, useState} from 'react';
import {IoAddOutline, IoSearchOutline, IoFolderOpen} from 'react-icons/io5';
import MyClassService from "../../services/myClass.service";
import Modals from "./Modals/modals";
import {FcFolder, FcOpenedFolder} from 'react-icons/fc';
import {Link} from "react-router-dom";

const SideNav = ({activeMyClass, setActiveMyClass, setIsActiveMyClass}) => {

  const refMyClassLink = useRef([]);
  const [myClasses, setMyClasses] = useState([]);
  const [showCreateMyClassModal, setShowCreateMyClassModal] = useState(false);
  const [activeMyClassIndex, setActiveMyClassIndex] = useState(-1);

  const openCreateMyClassModal = (event) => {
    event.preventDefault();
    setShowCreateMyClassModal(true);
  }

  const handleClickMyClass = (event, myClass, index) => {
    event.preventDefault();
    if (activeMyClassIndex > -1) {
      const previousMyClass = refMyClassLink.current[activeMyClassIndex];
      previousMyClass.classList.remove("link-myClass-active")
      previousMyClass.classList.add("link-myClass")
      setActiveMyClassIndex(-1);
    }
    const currentMyClass = refMyClassLink.current[index];
    currentMyClass.classList.remove("link-myClass")
    currentMyClass.classList.add("link-myClass-active")
    setActiveMyClassIndex(index);
    setActiveMyClass(myClass)
    setIsActiveMyClass(true);
  }

  const handleSubmitCreateMyClass = async (event) => {
    event.preventDefault();
    setShowCreateMyClassModal(false);
    const title = event.target.newTitle.value;
    await MyClassService.createMyClass(title)
      .then(result => setActiveMyClass(result.data))
      .then(() => setIsActiveMyClass(true));
  }

  useEffect(() => {
    fetchMyClass()
  }, [activeMyClass])

  const fetchMyClass = () => {
    MyClassService.getMyClasses()
      .then(function (result) {
        if (result.status === 200) {
          setMyClasses(result.data);
        } else {
          setMyClasses([]);
        }
      })
    ;
  };

  return (
    <div className="flex-shrink-0 side-nav">
      <div className="d-flex align-items-center mt-3 mb-2 pb-3">
        <div className="flex-grow-1 align-items-center">
          <p className={"ms-3 my-auto fs-6"} style={{color: "white"}}>MY CLASSES ({myClasses.length})</p>
        </div>
        <div className="sideNav-divider">
        </div>
        <div className="px-2">
          {/*Create New MyClass Link*/}
          <Link to="#0"
                className="link-sidenav"
                onClick={(event) => openCreateMyClassModal(event)}>
            <IoAddOutline size={"2em"}/>
          </Link>
        </div>
        <div className="px-2">
          {/*Search Decks Link*/}
          <Link to="#0" className="link-sidenav me-2" style={{textDecoration: 'none'}}>
            <IoSearchOutline size={"2em"}/>
          </Link>
        </div>
      </div>

      <div className="container-fluid">
        {/* List MyClasses*/}
        {myClasses.map((myClass, index) => (
          <Link to={"#0"} className="row ps-3 pe-0 link-myClass"
                style={{textDecoration: 'none'}}
                ref={(element) => refMyClassLink.current.push(element)}
                id={myClass.id}
                key={myClass.id}
                onClick={(event) => handleClickMyClass(event, myClass, index)}>
            <div className="col-1 ms-3 class-icon">
              {activeMyClass.id === myClass.id ? (
                <FcOpenedFolder size={"2em"}/>
              ) : (
                <FcFolder size={"2em"}/>
              )}
            </div>
            <div className="col ms-3 my-auto">
              <p className={"mb-0"} style={{fontSize: "14px", fontWeight: "500"}}>
                {myClass.title}
              </p>
            </div>
          </Link>
        ))}
        {/*Create New MyClass Link*/}
        <Link to={"#0"} className={"row ps-3 pe-0 mt-3 link-sidenav"}
              onClick={(event) => openCreateMyClassModal(event)}>
          <div className="col-1 ms-3">
            <IoAddOutline size={"1.5em"} style={{position: "relative", top: "-4px", left: "3px"}}/>
          </div>
          <p className="col ms-3" style={{fontSize: "12px", fontWeight: "500"}}>Create New Class
          </p>
        </Link>
        {/*Search Decks Link*/}
        <Link to={"#0"} className={"row ps-3 pe-0 mt-2 link-sidenav"}>
          <div className="col-1 ms-3">
            <IoSearchOutline size={"1.5em"} style={{position: "relative", top: "-4px", left: "3px"}}/>
          </div>
          <p className="col ms-3" style={{fontSize: "12px", fontWeight: "500"}}>Create New Class
          </p>
        </Link>

      </div>

      {/* Create new myclass modal */}
      <Modals.createModal
        active={activeMyClass}
        show={showCreateMyClassModal}
        setShow={setShowCreateMyClassModal}
        submit={handleSubmitCreateMyClass}
        type={"Class"}
      />
    </div>
  )
}

export default SideNav;
