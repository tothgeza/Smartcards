import React, {useEffect, useState} from 'react';
import {IoAddOutline, IoSearchOutline} from 'react-icons/io5';
import MyClassService from "../../services/myClass.service";
import PublicDeckService from "../../services/publicdeck.service";
import Modals from "./Modals/modals";
import PublicDecksModal from "./Modals/PublicDecksModal";
import './sidenav.css';
import {FcFolder, FcOpenedFolder} from 'react-icons/fc';
import {Link} from "react-router-dom";

const SideNav = ({activeMyClass, setActiveMyClass, setIsActiveMyClass, fetchMyClass, myClasses}) => {

  const [showCreateMyClassModal, setShowCreateMyClassModal] = useState(false);
  const [showFindFlashcardsModal, setShowFindFlashcardsModal] = useState(false);
  const [publicDecks, setPublicDecks] = useState([]);
  const [keyword, setKeyword] = useState('');

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
    fetchMyClass()
  }

  // Find flashcards
  const openFindFlashcardsModal = (event) => {
    // event.preventDefault();
    fetchDecks()
    setShowFindFlashcardsModal(true);
  }
  const closeFindFlashcardsModal = () => {
    // event.preventDefault();
    setShowFindFlashcardsModal(false)
    setKeyword('')
  }
  // const handleDownloadDeck = (event) => {
  //   event.preventDefault();
  //   DeckService.deleteDeck(activeDeck.id)
  //     .then(() => setActiveDeck(""))
  //     .then(() => setShowDeleteDeckModal(false));
  // }

  const fetchDecks = () => {
    PublicDeckService.getDecks()
      .then(function (result) {
        if (result.status === 200) {
          setPublicDecks(result.data);
        } else {
          setPublicDecks([]);
        }
      })
  }

  useEffect(() => {
    fetchMyClass()
  }, [activeMyClass])

  return (
    // <main className="flex-shrink-0">
    <div className="h-100 side-nav">
      <div className="d-flex align-items-center pt-3 mb-2 pb-3">
        <div className="flex-grow-1 align-items-center">
          <p className={"ms-3 my-auto fs-6"}
             style={{
               letterSpacing: "1px",
               fontFamily: "Montserrat, sans-serif",
               color: "#002749"
             }}>
            MY CLASSES ({myClasses.length})
          </p>
        </div>
        <div className="px-2">
          {/*Create New MyClass Link*/}
          <Link to="#0"
                className="link-icon"
                onClick={(event) => openCreateMyClassModal(event)}>
            <IoAddOutline size={"2em"}/>
          </Link>
        </div>
        <div className="px-2">
          {/*Search Decks Link*/}
          <Link to="#0" className="link-icon me-2" style={{textDecoration: 'none'}}>
            <IoSearchOutline size={"1.5em"}/>
          </Link>
        </div>
      </div>

      <div className="container-fluid">
        {/* List MyClasses*/}
        {myClasses.map((myClass) => (
          <Link to={"#0"}
                className={`row ps-3 pe-0" ${activeMyClass.id === myClass.id ? 'link-myClass-active' : 'link-myClass'}`}
                style={{textDecoration: 'none'}}
            // id={myClass.id}
                key={myClass.id}
                onClick={(event) => handleClickMyClass(event, myClass)}>
            <div className="col-1 ms-3 class-icon">
              {activeMyClass.id === myClass.id ? (
                <FcOpenedFolder size={"2em"}/>
              ) : (
                <FcFolder size={"2em"}/>
              )}
            </div>
            <div className="col ms-3 my-auto">
              <p className={"mb-0"} style={{
                fontSize: "14px",
              }}>
                {myClass.title}
              </p>
            </div>
          </Link>
        ))}
        {/*Create New MyClass Link*/}
        <Link to={"#0"} className={"row ps-3 pe-0 mt-4 link-icon"}
              onClick={(event) => openCreateMyClassModal(event)}>
          <div className="col-1 ms-3">
            <IoAddOutline size={"1.5em"}
                          style={{position: "relative", top: "-4px", left: "3px"}}/>
          </div>
          <p className="col ms-3" style={{
            fontSize: "12px",
            fontFamily: "Montserrat, sans-serif"
          }}>
            Create New Class
          </p>
        </Link>
        {/*Search Decks Link*/}
        <Link to={"#0"} className={"row ps-3 pe-0 mt-3 link-icon"}
        onClick={() => openFindFlashcardsModal()}>
          <div className="col-1 ms-3">
            <IoSearchOutline size={"1.3em"} style={{position: "relative", top: "-4px", left: "5px"}}/>
          </div>
          <p className="col ms-3" style={{fontSize: "12px",
            fontFamily: "Montserrat, sans-serif"}}>
            Find Flashcards
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
    <PublicDecksModal
      show={showFindFlashcardsModal}
      closeModal={closeFindFlashcardsModal}
      publicDecks={publicDecks}
      keyword={keyword}
      setKeyword={setKeyword}
      myClasses={myClasses}
      activeMyClass={activeMyClass}
      setActiveMyClass={setActiveMyClass}
      setIsActiveMyClass={setIsActiveMyClass}
    />
    </div>
    // </main>
  )
}

export default SideNav;
