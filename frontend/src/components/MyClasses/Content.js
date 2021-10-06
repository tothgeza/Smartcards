import React, {useEffect, useState} from 'react'
import {IoAlbumsSharp, IoPencilSharp, IoTrashOutline} from "react-icons/io5";
import {GoTrashcan} from "react-icons/go";
import {Dropdown, Form, Button, InputGroup, FormControl, Modal} from "react-bootstrap";
import {GoPlus} from "react-icons/go";
import {IoEye} from "react-icons/io5";
import DeckService from "../../services/deck.service";
import Modals from "./Modals/modals";
import CardsPreviewModal from "./Modals/CardsPreviewModal";
import {Link} from "react-router-dom";
import CardService from "../../services/card.service";

const Content = ({
                   activeMyClass,
                 }) => {

  const [decks, setDecks] = useState([]);
  const [activeDeck, setActiveDeck] = useState("");

  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(false);
  const [isEditDeckTitleActive, setIsEditDeckTitleActive] = useState(false);

  const [activeCards, setActiveCards] = useState([]);
  const [showCardsModal, setShowCardsModal] = useState(false);

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
  const showPreviewCardsModal = (event, deck) => {
    event.preventDefault();
    console.log("DeckId:" + deck.id)
    fetchCards(deck)
    setActiveDeck(deck)
    setShowCardsModal(true)
  }

  useEffect(() => {
    fetchDecks(activeMyClass.id);
  }, [activeMyClass, activeDeck])

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

  const fetchCards = async (deck) => {
    CardService.getCards(deck.id)
      .then(function (result) {
        if (result.status === 200) {
          setActiveCards(result.data);
          console.log(result.data);
        } else {
          setActiveCards([]);
        }
      })
  }

  return (
    <div >
      <div className="mx-1">
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

      {decks.map((deck) => (
        <div key={deck.id} className="card border-0 border-bottom">
          <div className="card-body">
            <div className="row align-items-center" style={{paddingTop: "3px"}}>
              <div className="col" style={{maxWidth: "40px"}}>
                <div className="form-check ">
                  <input className="form-check-input" type="radio" name="exampleRadios"
                         id="exampleRadios1" value="option1"/>
                </div>
              </div>
              <div className="col" style={{maxWidth: "60px"}}>
                <IoAlbumsSharp size="2em"/>
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
              {/* Edit Deck Dropdown */}
              <div className="col" style={{maxWidth: "60px"}}>
                <Link to="#0" className="class-link" onClick={(event) => showPreviewCardsModal(event, deck)}>
                  <IoEye/>
                </Link>
              </div>
              <div className="col me-3" style={{maxWidth: "60px"}}>
                <Dropdown style={{backgroundColor: "none"}}>
                  <Dropdown.Toggle id="dropdown-basic" size="sm">
                    Edit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#0"
                                   onClick={(event) => showEditDeckTitleForm(event, deck)}>
                      <div className="d-flex flex-row p-0 m-0">
                        <IoPencilSharp style={{position: "relative", top: "2px"}}/>
                        <p className="ms-2 mb-0" style={{fontSize: "14px"}}> Edit Deck Name</p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="#0"
                                   onClick={(event) => openDeleteDeckModal(event, deck)}>
                      <div className="d-flex flex-row p-0 m-0">
                        <GoTrashcan style={{position: "relative", top: "2px"}}/>
                        <p className="ms-2 mb-0" style={{fontSize: "14px"}}> Delete this Deck</p>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      ))
      }
      {/* Create New Deck Link*/}
      <a href="#0" className="class-link" onClick={(event) => openCreateDeckModal(event)}>
        <div className="card border-0">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col" style={{maxWidth: "40px"}}>
                <div>

                </div>
              </div>
              <div className="col" style={{maxWidth: "60px"}}>
                <div style={{width: "20px"}}>
                  <GoPlus size="2em"/>
                </div>
              </div>
              <div className="col">
                <p className="my-auto"
                   style={{fontSize: "14px", fontWeight: "500"}}>Create New Deck</p>
              </div>
            </div>
          </div>
        </div>
      </a>
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
        show={showCardsModal}
        setShow={setShowCardsModal}
      />
    </div>
  )
}

export default Content
