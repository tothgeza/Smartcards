import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Dropdown, Form, Button, InputGroup, FormControl} from "react-bootstrap";

import DeckService from "../../services/deck.service";
import CardService from "../../services/card.service";

import Modals from "./Modals/modals";
import CardsPreviewModal from "./Modals/CardsPreviewModal";
import StudyModal from "./Modals/StudyModal";

import {IoAlbumsSharp, IoPencilSharp, IoEye} from "react-icons/io5";
import {GoPlus, GoPlay, GoTrashcan} from "react-icons/go";
import {BsGearFill} from "react-icons/bs";
import "./content.css"

const Content = ({activeMyClass}) => {

  const [decks, setDecks] = useState([]);
  const [activeDeck, setActiveDeck] = useState({});

  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(false);
  const [isEditDeckTitleActive, setIsEditDeckTitleActive] = useState(false);

  const [activeCards, setActiveCards] = useState([]);
  const [activeCard, setActiveCard] = useState({});

  const [showPreviewCardsModal, setShowPreviewCardsModal] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [showStudyModal, setShowStudyModal] = useState(false);
  const [index, setIndex] = useState(0);

  // Create Deck functions
  const openCreateDeckModal = (event) => {
    event.preventDefault();
    setShowCreateDeckModal(true);
  }

  const handleSubmitCreateDeck = async (event) => {
    event.preventDefault();
    setShowCreateDeckModal(false);
    const title = event.target.newTitle.value;
    DeckService.createDeck(activeMyClass.id, title)
      .then(result => setActiveDeck(result.data))
  }

  // Delete Deck functions
  const openDeleteDeckModal = (event, deck) => {
    event.preventDefault();
    setActiveDeck(deck);
    setShowDeleteDeckModal(true);
  }

  const handleSubmitDeleteDeck = (event) => {
    event.preventDefault();
    DeckService.deleteDeck(activeDeck.id)
      .then(result => setActiveDeck(""))
      .then(result => setShowDeleteDeckModal(false));
  }

  // Edit Deck Title functions
  const showEditDeckTitleForm = (event, deck) => {
    event.preventDefault();
    setActiveDeck(deck);
    setIsEditDeckTitleActive(true);
  }
  const handleSubmitEditDeck = async (event) => {
    event.preventDefault();
    const newDeckTitle = event.target.newDeckTitle.value;
    DeckService.updateDeck(activeDeck.id, newDeckTitle)
      .then(result => setActiveDeck(result.data))
      .then(result => setIsEditDeckTitleActive(false))
  }

  // Show Cards Modal
  const openPreviewCardsModal = (event, deck) => {
    event.preventDefault();
    setActiveDeck(deck)
    fetchCards(deck)
    setShowPreviewCardsModal(true)
  }

  const closePreviewCardsModal = () => {
    // event.preventDefault();
    setShowPreviewCardsModal(false)
    setKeyword('')
  }
  // Show Study Modal
  const openStudyCardsModal = async (event, deck) => {
    event.preventDefault();
    await setActiveDeck(deck)
    console.log("Start fetch..")
    await fetchCards(deck)
    setShowStudyModal(true)
    console.log("Show study modal..")
  }

  const closeStudyModal = (event) => {
    event.preventDefault();
    setIndex(0);
    setShowStudyModal(false);
    setActiveDeck('')
  }

  useEffect(() => {
    fetchDecks(activeMyClass.id);
  }, [activeMyClass, activeDeck])

  useEffect(() => {
    if (activeDeck !== "") {
      fetchCards(activeDeck);
    }
  }, [activeCard])

  const fetchDecks = (myClassId) => {
    DeckService.getDecks(myClassId)
      .then(function (result) {
        if (result.status === 200) {
          setDecks(result.data);
        } else {
          setDecks([]);
        }
      })
  }

  const fetchCards = (deck) => {
    CardService.getCards(deck.id)
      .then(function (result) {
        if (result.status === 200) {
          console.log(result.data)
          setActiveCards(result.data);
        } else {
          setActiveCards([]);
        }
      })
  }

  return (
    <>
      {decks.map((deck) => (
        <div key={deck.id} className="card border-0 shadow-sm mt-3">
          <div className="card-body mx-0 px-1">
            <div className="row align-items-center" style={{paddingTop: "3px"}}>
              <div className="col" style={{maxWidth: "40px"}}>
                {/*<div className="form-check ">*/}
                {/*  <input className="form-check-input" type="radio" name="exampleRadios"*/}
                {/*         id="exampleRadios1" value="option1"/>*/}
                {/*</div>*/}
              </div>
              <div className="col" style={{maxWidth: "72px"}}>
                <div className={"p-2"}>
                  <IoAlbumsSharp color={"#ffc748"} size="2em"/>
                </div>
              </div>
              <div className="col">
                {isEditDeckTitleActive && activeDeck.id === deck.id ? (
                  <Form onSubmit={(event) => handleSubmitEditDeck(event)}>
                    <InputGroup className="">
                      <FormControl
                        className="p-0"
                        name="newDeckTitle"
                        defaultValue={activeDeck.title}
                        aria-describedby="basic-addon2"
                        size="sm"
                        style={{
                          fontSize: "14px",
                          color: "#4b4b4b",
                          fontWeight: "500",
                          maxWidth: "450px",
                          // height: "32px"
                        }}
                      />
                      <Button className="align-middle" variant="outline-secondary" type="submit" size="sm">
                        Save
                      </Button>
                    </InputGroup>
                  </Form>
                ) : (
                  <p className="my-0" style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingLeft: "1px",
                    paddingTop: "1px",
                    paddingBottom: "1px"
                  }}>
                    {deck.title}
                  </p>
                )}
              </div>
              <div className="col"
                   style={{maxWidth: "155px"}}
              >
              <ul className={"list-group list-group-horizontal m-0 "}>
                <li className="list-group-item border-0 p-2">
                  <Link to="#0" className="class-link" onClick={(event) => openStudyCardsModal(event, deck)}>
                    <GoPlay className={"link-icon"} size={"1.3em"}/>
                  </Link>
                </li>
                <li className="list-group-item border-0 p-2">
                  <Link to="#0" className="class-link" onClick={(event) => openPreviewCardsModal(event, deck)}>
                    <IoEye className={"link-icon"} size={"1.5em"}/>
                  </Link>
                </li>
                {/* Edit Deck Dropdown */}
                <li className="list-group-item border-0 p-2">
                  <Dropdown style={{backgroundColor: "none"}}>
                    <Dropdown.Toggle id="dropdown-basic" size="sm"
                                     className="border-0 p-0">
                      <BsGearFill className="link-icon" size={"1.4em"}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="">
                      <Dropdown.Item href="#0"
                                     onClick={(event) => showEditDeckTitleForm(event, deck)}>
                        <div className="d-flex flex-row p-0 m-0" style={{color: "#757575"}}>
                          <IoPencilSharp style={{
                            position: "relative",
                            top: "2px"
                          }}/>
                          <p className="ms-2 mb-0" style={{fontSize: "14px"}}> Edit Deck Name</p>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item href="#0"
                                     onClick={(event) => openDeleteDeckModal(event, deck)}>
                        <div className="d-flex flex-row p-0 m-0" style={{color: "#757575"}}>
                          <GoTrashcan style={{position: "relative", top: "1px"}}/>
                          <p className="ms-2 mb-0" style={{fontSize: "14px"}}> Delete this Deck</p>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      ))
      }
      {/* Create New Deck Link*/}
      <Link to="#0" className="card border-0 shadow-sm mt-3  py-2 add-deck-link"
            style={{textDecoration: "none", color: "#0067C0"}}
            onClick={(event) => openCreateDeckModal(event)}>
          <div className="card-body">
            <div className="row align-items-center h-100 my-auto">
              <div className="col" style={{maxWidth: "40px"}}>
                <div>

                </div>
              </div>
              <div className="col" style={{maxWidth: "60px"}}>
                <div style={{width: "20px"}}>
                  <GoPlus size="2em !important"/>
                </div>
              </div>
              <div className="col">
                <p className="my-auto"
                   style={{fontSize: "14px", fontWeight: "500"}}>
                  Create New Deck</p>
              </div>
            </div>
          </div>
      </Link>
      {/*</div>*/}

      {/* Create Deck Modal */}
      <Modals.createModal
        active={activeDeck}
        show={showCreateDeckModal}
        setShow={setShowCreateDeckModal}
        submit={handleSubmitCreateDeck}
        type={"Deck"}
      />

      {/* Delete Deck modal */}
      <Modals.deleteModal
        active={activeDeck}
        show={showDeleteDeckModal}
        setShow={setShowDeleteDeckModal}
        submit={handleSubmitDeleteDeck}
        type={"Deck"}
      />

      {/*  Show Cards Modal */}
      <CardsPreviewModal
        deck={activeDeck}
        cards={activeCards}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        show={showPreviewCardsModal}
        closeModal={closePreviewCardsModal}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <StudyModal
        cards={activeCards}
        show={showStudyModal}
        close={closeStudyModal}
        deck={activeDeck}
        index={index}
        setIndex={setIndex}
      />
    </>

  )
}

export default Content
