import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import SideNav from "./SideNav";
import Content from "./Content";

import { IoAlbumsSharp, IoAddOutline, IoSearchOutline, IoCloseCircleOutline, IoFolderOpen, IoPencil, IoTrashOutline } from 'react-icons/io5';
import { BsGearFill, BsThreeDots } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { Modal, Dropdown, Card } from 'react-bootstrap';


const MyClass = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  const [myClasses, setMyClasses] = useState([]);
  const [activeClass, setActiveClass] = useState({
    decks: []
  });
  const [activeClassTitle, setActiveClassTitle] = useState('');
  const [isClassActive, setIsClassActive] = useState(false);
  const [isEditClassNameActive, setIsEditClassNameActive] = useState(false);

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [showEditDeckModal, setShowEditDeckModal] = useState(false);
  const [showDeleteClassCaution, setShowDeleteClassCaution] = useState(false);
  const [showDeleteDeckCaution, setShowDeleteDeckCaution] = useState(false);
  const [beDeleted, setBeDeleted] = useState("");
  const [beDeletedDeck, setBeDeletedDeck] = useState("");

  const handleCreateClassModal = (event) => {
    event.preventDefault();
    setShowCreateClassModal(true);
  }

  const closeCreateClassModal = () => {
    setShowCreateClassModal(false);
  }

  const handleCreateDeckModal = (event) => {
    event.preventDefault();
    setShowCreateDeckModal(true);
  }

  const closeCreateDeckModal = () => {
    setShowCreateDeckModal(false);
  }

  const handleEditDeckModal = (event) => {
    event.preventDefault();
    setShowEditDeckModal(true);
  }

  const closeEditDeckModal = () => {
    setShowEditDeckModal(false);
  }

  const handleDeleteClassCaution = (event, myclass_id) => {
    event.preventDefault();
    event.stopPropagation();
    setBeDeleted(myclass_id);
    setShowDeleteClassCaution(true);
  }

  const handleEditClassName = (event, activeClass) => {
    event.preventDefault();
    setIsEditClassNameActive(true);

  }

  const closeDeleteClassCaution = () => {
    setBeDeleted("");
    setShowDeleteClassCaution(false);
  }

  const closeDeleteDeckCaution = () => {
    setBeDeletedDeck("");
    setShowDeleteDeckCaution(false);
  }


  const handleDeleteDeckCaution = (event, deckId) => {
    event.preventDefault();
    event.stopPropagation();
    setBeDeletedDeck(deckId);
    setShowDeleteDeckCaution(true);
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    fetchClass();
  }, [activeClassTitle]);

  const fetchClass = async () => {
    const result = await UserService.getMyClasses();
    setMyClasses(result.data);
  };


  const classHandling = (e, myclass_id) => {
    e.preventDefault();
    const mc = myClasses.filter((myClass) => {
      return myClass.id === myclass_id;
    })[0]
    setActiveClass(mc)
    setActiveClassTitle(mc.title);
    setIsClassActive(true);
  }
  const deleteHandling = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await UserService.deleteMyClass(beDeleted);
    closeDeleteClassCaution()
    // setBeDeleted("");
    setIsClassActive(false);
    fetchClass();
  }

  const handleSubmit = async (event) => {
    closeCreateClassModal(event);
    const title = event.target.newClassName.value;
    await UserService.createMyClass(title);
    await fetchClass();

  }
  const handleEditClassNameSubmit = async (event) => {
    event.preventDefault();
    const newTitle = event.target.newTitle.value;
    console.log(newTitle);
    console.log("call axios..")
    UserService.updateMyClassTitle(activeClass.id, newTitle)
      .then(res => console.log(res));
    setIsEditClassNameActive(false);
    // fetchClassAndSetActiveClass(activeClass_id);
    await fetchClass();
    // const mc = myClasses.filter((myClass) => {
    //   return myClass.id === activeClass_id;
    // })[0]
    setActiveClassTitle(newTitle);
    // setIsClassActive(true);
  }

  const handleCreateDeckSubmit = async (event) => {
    event.preventDefault();
    closeCreateDeckModal(event);
    const class_id = activeClass.id;
    const title = event.target.newDeckName.value;
    await UserService.createDeck(class_id, title);
    await fetchClass();

  }
  const handleEditDeckSubmit = async (event) => {
    event.preventDefault();
    // const
  }

  const handleDeleteDeck = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await UserService.deleteDeck(activeClass.id, beDeletedDeck);
    closeDeleteDeckCaution();
    fetchClass();
  }


  return (
    <main>
      <div className="flex-shrink-0 p-3 side-nav" >
        <div className="d-flex align-items-center pb-3 mb-3 border-bottom justify-content-between">
          <span className="fs-6">MY CLASSES ({myClasses.length}) </span>
          <div className="row">
            <div className="col px-2">
              <a href="#0"
                className="class-link"
                style={{ textDecoration: 'none' }}
                onClick={(event) => handleCreateClassModal(event)}>
                <div className="col "><IoAddOutline size={"2em"} /></div>
              </a>
            </div>
            <div className="col px-2">
              <a href="#0" className="class-link " style={{ textDecoration: 'none' }}>
                <div className="col "><IoSearchOutline size={"2em"} /></div>
              </a>
            </div>
          </div>
        </div>

        <section className="px-4 mb-5">
          <ul className="list-unstyled user-packs">
            {myClasses.map((myclass, index) => (
              <li className="user-pack row"
                key={myclass.id}>
                <a href="#0" className="row col align-items-center link-pack pe-0"
                  id={index}
                  style={{ textDecoration: 'none' }}

                  onClick={(e) => classHandling(e, myclass.id)} >
                  <div className="pack-icon col-1"><IoFolderOpen size={"2em"} /></div>
                  <div className="col pack-title ms-3 pe-0" style={{ fontSize: "14px", fontWeight: "500" }}>{myclass.title}</div>
                </a>
              </li>
            ))}
          </ul>
          <div>
            <a href=""
              className="row align-items-center ms-2 mb-3 class-link"
              style={{ textDecoration: 'none' }}
              onClick={(event) => handleCreateClassModal(event)}>
              <div className="col-1"><IoAddOutline size={"1.5em"} /></div>
              <div className="col ms-3" style={{ fontSize: "12px", fontWeight: "500" }}>Create New Class</div>
            </a>
            <a href="" className="row align-items-center ms-2 mb-3 class-link" style={{ textDecoration: 'none' }}>
              <div className="col-1"><IoSearchOutline size={"1.5em"} /></div>
              <div className="col ms-3" style={{ fontSize: "12px", fontWeight: "500" }}>Find Flashcards</div>
            </a>
          </div>
        </section>
      </div>
      <div className="b-example-divider"></div>
      {
        isClassActive &&
        <div className="w-100 p-2">

          <div className="">
            <div className="d-flex align-items-center">
              <div className="p-2 m-2 flex-shrink-1">
                <IoFolderOpen size={"6em"} />
              </div>
              <div className="p-2 d-flex flex-column flex-fill">
                <div>
                  {isEditClassNameActive ? (
                    <form className="align-middle" onSubmit={(e) => handleEditClassNameSubmit(e, activeClass.id)}>
                      <input type="text" defaultValue={activeClassTitle}
                        name="newTitle"
                        className="mt-3"
                        style={{ fontSize: "32px", fontWeight: "500", color: "#4b4b4b", height: "38px" }} />
                      <button
                        className="btn btn-primary my-auto ms-2"
                        style={{ height: "38px", position: "relative", top: "-7px" }}
                        type="submit">save</button>
                    </form>
                  ) : (
                    <h2 className="mb-0">{activeClassTitle}</h2>
                  )
                  }
                </div>
                <div>
                  <div className="row">
                    <div className="col col-sm-auto mb-1">
                      <span className="col-6 text-muted" style={{ fontSize: "14px" }}> created by: {currentUser.username} </span>
                    </div>
                    <div className="col col-sm-auto">
                      <span className=" col-6 text-muted" style={{ fontSize: "14px" }}>
                        created at: <span style={{ fontSize: "13px" }}>2021-11-19</span>
                      </span>
                    </div>
                    <div className="col">
                    </div>
                  </div>
                  {/* <a href="#0" className="me-3">
                    <BsGearFill className="text-muted my-2" size="1.5em" />
                  </a> */}
                  <Dropdown style={{ backgroundColor: "none" }}>
                    <Dropdown.Toggle id="dropdown-basic" size="sm" >
                      Edit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#0" onClick={(e) => handleEditClassName(e, activeClass)}>
                        <IoPencil style={{ position: "relative", top: "-2px" }} /> Edit Class Name
                      </Dropdown.Item>
                      <Dropdown.Item href="#0" onClick={(e) => handleDeleteClassCaution(e, activeClass.id)}>
                        <IoTrashOutline style={{ position: "relative", top: "-2px" }} /> Delete this Class
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </div>
              </div>
              <div className="p-2 flex-shrink-1">
                {/* 3 of 3 */}
              </div>
            </div>
            <div>
              <div className="row text-center align-items-center"
                style={{
                  backgroundColor: "#e6ecf2",
                  height: "3em",
                  fontSize: "13px"
                }}
              >
                <div className="col class-options">
                  <a href="#0" className="class-link">
                    ABOUT
                  </a>
                </div>
                <div className="col class-options">
                  <a href="#0" className="class-link">
                    DECKS
                  </a>
                </div>
                <div className="col class-options">
                  <a href="#0" className="class-link">
                    Column
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div>
              {activeClass.decks.map((deck) => (
                <div key={deck.id} className="card border-0 border-bottom">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col" style={{ maxWidth: "40px" }}>
                        <div class="form-check " >
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />

                        </div>
                      </div>
                      <div className="col" style={{ maxWidth: "60px" }}>
                        <div >
                          <IoAlbumsSharp size="2em" />
                        </div>
                      </div>
                      <div className="col">
                        <p className="my-auto" style={{ fontSize: "14px", fontWeight: "500" }}>{deck.title}</p>
                      </div>
                      <div className="col me-3" style={{ maxWidth: "60px" }}>
                        <Dropdown style={{ backgroundColor: "none" }}>
                          <Dropdown.Toggle id="dropdown-basic" size="sm" >
                            Edit
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#0" onClick={(e) => handleEditDeckModal(e, activeClass)}>
                              <IoPencil style={{ position: "relative", top: "-2px" }} /> Edit Deck Name
                            </Dropdown.Item>
                            <Dropdown.Item href="#0" onClick={(e) => handleDeleteDeckCaution(e, deck.id)}>
                              <IoTrashOutline style={{ position: "relative", top: "-2px" }} /> Delete this Deck
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>


              ))
              }
              <a href="#0" className="class-link" onClick={(event) => handleCreateDeckModal(event)}>
                <div className="card border-0">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col" style={{ maxWidth: "40px" }}>
                        <div>

                        </div>
                      </div>
                      <div className="col" style={{ maxWidth: "60px" }}>
                        <div style={{ width: "20px" }}>
                          <GoPlus size="2em" />
                        </div>
                      </div>
                      <div className="col">
                        <p className="my-auto" style={{ fontSize: "14px", fontWeight: "500" }}>Create New Deck</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* {activeClass.decks.map((deck) => (
                deck.cards.map((card) => (
                  <div key={card.id}>
                    <p>{card.question}</p>
                    <p>{card.answer}</p>
                  </div>
                ))
              ))
              } */}

            </div>
          </div>
        </div>
      }
      {/* Create new myclass modal */}
      <Modal show={showCreateClassModal}>
        <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
          <button type="button" className="btn-close" onClick={(event) => closeCreateClassModal(event)}></button>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Create New Class</h3>
        </div>
        <div className="modal-body">
          <p className="text-center text-muted">A Class is a set of Flashcards, grouped into Decks</p>
          <form className="text-center" onSubmit={handleSubmit}>
            <input className="mb-3" type="text" name="newClassName" style={{ width: "80%", height: "40px", fontSize: "18px" }} />
            <label htmlFor=""
              style={{ fontSize: "12px" }}>Enter the title of your new class above</label>
            <button type="submit" className="btn btn-primary mx-auto mt-3 mb-2" style={{ display: "block" }}>Continue</button>
          </form>
        </div>
      </Modal>

      {/* Delete class modal */}
      <Modal show={showDeleteClassCaution}>
        <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
          <button type="button" className="btn-close" onClick={(event) => closeDeleteClassCaution(event)}></button>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Caution</h3>
        </div>
        <div className="modal-body">
          <p className="text-center text-muted">You are about to remove the React class from your library. Are you sure that you wish to proceed?</p>
          <div className="row text-center justify-content-md-center mt-4 mb-3">
            <button type="button"
              className="btn btn-primary my-auto col-4"
              style={{ display: "block" }}
              onClick={(event) => closeDeleteClassCaution(event)}
            >Cancel</button>

            <a href="#0"
              className="col-4 my-auto"
              style={{}}
              onClick={(event) => deleteHandling(event)}>Yes, remove class</a>
          </div>
        </div>
      </Modal>

      {/* Create new Deck modal */}
      <Modal show={showCreateDeckModal}>
        <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
          <button type="button" className="btn-close" onClick={(event) => closeCreateDeckModal(event)}></button>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Create New Deck</h3>
        </div>
        <div className="modal-body">
          <p className="text-center text-muted">A Deck is a subset of Flashcards in a Class, similar to chapters in a book</p>
          <form className="text-center" onSubmit={handleCreateDeckSubmit}>
            <input className="mb-3" type="text" name="newDeckName" style={{ width: "80%", height: "40px", fontSize: "18px" }} />
            <label htmlFor=""
              style={{ fontSize: "12px" }}>Enter the title of your new deck above</label>
            <button type="submit" className="btn btn-primary mx-auto mt-3 mb-2" style={{ display: "block" }}>Continue</button>
          </form>
        </div>
      </Modal>

      {/* Edit Deck Title */}
      <Modal show={showEditDeckModal}>
        <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
          <button type="button" className="btn-close" onClick={(event) => closeEditDeckModal(event)}></button>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Edit Deck</h3>
        </div>
        <div className="modal-body">
          <form className="text-center" onSubmit={handleEditDeckSubmit}>
            <label htmlFor=""
              style={{ fontSize: "12px" }}>Name</label>
            <input className="mb-3" type="text" name="newDeckName" style={{ width: "80%", height: "40px", fontSize: "18px" }} />
            <button type="submit" className="btn btn-primary mx-auto mt-3 mb-2" style={{ display: "block" }}>Save</button>
          </form>
        </div>
      </Modal>

      {/* Delete class modal */}
      <Modal show={showDeleteDeckCaution}>
        <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
          <button type="button" className="btn-close" onClick={(event) => closeDeleteDeckCaution(event)}></button>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Caution</h3>
        </div>
        <div className="modal-body">
          <p className="text-center text-muted">You are about to remove the React class from your library. Are you sure that you wish to proceed?</p>
          <div className="row text-center justify-content-md-center mt-4 mb-3">
            <button type="button"
              className="btn btn-primary my-auto col-4"
              style={{ display: "block" }}
              onClick={(event) => closeDeleteDeckCaution(event)}
            >Cancel</button>

            <a href="#0"
              className="col-4 my-auto"
              style={{}}
              onClick={(event) => handleDeleteDeck(event)}>Yes, remove class</a>
          </div>
        </div>
      </Modal>

    </main >
  );
};

export default MyClass;
