import React, {useEffect, useRef, useState} from 'react';
import {IoAddOutline, IoSearchOutline, IoFolderOpen} from 'react-icons/io5';
import MyClassService from "../../services/myClass.service";
import Modals from "./Modals/modals";
import {Link} from "react-router-dom";

const SideNav = ({activeMyClass, setActiveMyClass, setIsActiveMyClass}) => {

  const refMyClassLink  = useRef([]);
  const [myClasses, setMyClasses] = useState([]);
  const [showCreateMyClassModal, setShowCreateMyClassModal] = useState(false);

  const openCreateMyClassModal = (event) => {
    event.preventDefault();
    setShowCreateMyClassModal(true);
  }

  const handleClickMyClass = (event, myClass, index) => {
    event.preventDefault();
    const currentMyClass = refMyClassLink.current[index];
    currentMyClass.classList.remove("link-class")
    currentMyClass.classList.add("link-class-active")
    console.log(currentMyClass);
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
      <div className="d-flex align-items-center pb-3 mb-3 border-bottom justify-content-between">
        <div className="flex-grow-1 align-items-center">
          <p className={"ms-3 mb-0 fs-6 "}>MY CLASSES ({myClasses.length})</p>
        </div>
        <div className="px-2">
          {/*Create New MyClass Link*/}
          <Link to="#0"
                className="link-class"
                style={{textDecoration: 'none'}}
                onClick={(event) => openCreateMyClassModal(event)}>
            <IoAddOutline size={"2em"}/>
          </Link>
        </div>
        <div className="px-2">
          {/*Search Decks Link*/}
          <Link to="#0" className="class-link " style={{textDecoration: 'none'}}>
            <IoSearchOutline size={"2em"}/>
          </Link>
        </div>
      </div>

      <div className="container-fluid">
        {/* List MyClasses*/}
        {myClasses.map((myClass, index) => (
          <Link to={"#0"} className="row px-0 py-2 mt-3 link-class"
                style={{textDecoration: 'none'}}
                ref={(element) => refMyClassLink.current.push(element)}
                id={myClass.id}
                key={myClass.id}
                onClick={(event) => handleClickMyClass(event, myClass, index)}>
              <div className="col-1 ms-3"><IoFolderOpen size={"2em"}/></div>
              <div className="col ms-3 my-auto">
                <p className={"mb-0"} style={{fontSize: "14px", fontWeight: "500"}}>
                  {myClass.title}
                </p>
              </div>
          </Link>
        ))}
        <div className={"mt-4"}>
          {/*Create New MyClass Link*/}
          <a href=""
             className="row align-items-center ms-2 mb-3 link-sidenav"
             style={{textDecoration: 'none'}}
             onClick={(event) => openCreateMyClassModal(event)}>
            <div className="col-1"><IoAddOutline size={"1.5em"}/></div>
            <div className="col ms-3" style={{fontSize: "12px", fontWeight: "500"}}>Create New Class
            </div>
          </a>
          {/*Search Decks Link*/}
          <a href="" className="row align-items-center ms-2 mb-3 link-sidenav"
             style={{textDecoration: 'none'}}>
            <div className="col-1"><IoSearchOutline size={"1.5em"}/></div>
            <div className="col ms-3" style={{fontSize: "12px", fontWeight: "500"}}>Find Flashcards
            </div>
          </a>
        </div>
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
