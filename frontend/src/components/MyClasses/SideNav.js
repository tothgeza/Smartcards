import React, {useEffect, useState} from 'react';
import {IoAddOutline, IoSearchOutline, IoFolderOpen} from 'react-icons/io5';
import MyClassService from "../../services/myClass.service";
import Modals from "./Modals/modals";

const SideNav = ({activeMyClass, setActiveMyClass, setIsActiveMyClass}) => {

  const [myClasses, setMyClasses] = useState([]);
  const [showCreateMyClassModal, setShowCreateMyClassModal] = useState(false);

  const openCreateMyClassModal = (event) => {
    event.preventDefault();
    setShowCreateMyClassModal(true);
  }

  const handleClickMyClass = (event, myClass) => {
    event.preventDefault();
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
    <div className="flex-shrink-0 p-3 side-nav">
      <div className="d-flex align-items-center pb-3 mb-3 border-bottom justify-content-between">
        <span className="fs-6">MY CLASSES ({myClasses.length}) </span>
        <div className="row">
          <div className="col px-2">
            {/*Create New MyClass Link*/}
            <a href="#0"
               className="class-link"
               style={{textDecoration: 'none'}}
               onClick={(event) => openCreateMyClassModal(event)}>
              <div className="col "><IoAddOutline size={"2em"}/></div>
            </a>
          </div>
          <div className="col px-2">
            {/*Search Decks Link*/}
            <a href="#0" className="class-link " style={{textDecoration: 'none'}}>
              <div className="col "><IoSearchOutline size={"2em"}/></div>
            </a>
          </div>
        </div>
      </div>

      <section className="px-4 mb-5">
        <ul className="list-unstyled user-packs">
          {/* List MyClasses*/}
          {myClasses.map((myClass, index) => (
            <li className="user-pack row"
                key={myClass.id}>
              <a href="#0" className="row col align-items-center link-pack pe-0"
                 id={index}
                 style={{textDecoration: 'none'}}
                 onClick={(event) => handleClickMyClass(event, myClass)}>
                <div className="pack-icon col-1"><IoFolderOpen size={"2em"}/></div>
                <div className="col pack-title ms-3 pe-0"
                     style={{fontSize: "14px", fontWeight: "500"}}>{myClass.title}</div>
              </a>
            </li>
          ))}
        </ul>
        <div>
          {/*Create New MyClass Link*/}
          <a href=""
             className="row align-items-center ms-2 mb-3 class-link"
             style={{textDecoration: 'none'}}
             onClick={(event) => openCreateMyClassModal(event)}>
            <div className="col-1"><IoAddOutline size={"1.5em"}/></div>
            <div className="col ms-3" style={{fontSize: "12px", fontWeight: "500"}}>Create New Class
            </div>
          </a>
          {/*Search Decks Link*/}
          <a href="" className="row align-items-center ms-2 mb-3 class-link"
             style={{textDecoration: 'none'}}>
            <div className="col-1"><IoSearchOutline size={"1.5em"}/></div>
            <div className="col ms-3" style={{fontSize: "12px", fontWeight: "500"}}>Find Flashcards
            </div>
          </a>
        </div>
      </section>

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
