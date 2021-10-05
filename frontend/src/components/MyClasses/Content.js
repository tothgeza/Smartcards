import React, {useEffect, useState} from 'react'
import {IoAlbumsSharp, IoFolderOpen, IoPencil, IoTrashOutline} from "react-icons/io5";
import {Dropdown, Form, Button, InputGroup, FormControl, Modal} from "react-bootstrap";
import {GoPlus} from "react-icons/go";
import DeckService from "../../services/deck.service";
import ContentHeader from "./ContentHeader";
import Modals from "./Modals/modals";

const Content = ({
                   activeMyClass,
                   setActiveMyClass,
                   setIsActiveMyClass,
                   currentUser,
                 }) => {

  const [decks, setDecks] = useState([]);
  const [activeDeck, setActiveDeck] = useState("");

  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [isEditDeckTitleActive, setIsEditDeckTitleActive] = useState(false);
  const [showDeleteDeckCaution, setShowDeleteDeckCaution] = useState(false);

  // Create Deck functions
  const openCreateDeckModal = (event) => {
    event.preventDefault();
    setShowCreateDeckModal(true);
  }

  const closeCreateDeckModal = () => {
    setShowCreateDeckModal(false);
  }

  const handleSubmitCreateDeck = async (event) => {
    event.preventDefault();
    closeCreateDeckModal(event);
    const title = event.target.newTitle.value;
    DeckService.createDeck(activeMyClass.id, title)
      .then(result => setActiveDeck(result.data))
  }

  // Delete Deck function
  const openDeleteDeckModal = (event, deck) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDeck(deck);
    setShowDeleteDeckCaution(true);
  }

  const closeDeleteDeckModal = () => {
    setActiveDeck("");
    setShowDeleteDeckCaution(false);
  }

  const handleSubmitDeleteDeck = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await DeckService.deleteDeck(activeDeck.id);
    closeDeleteDeckModal();
    fetchDecks(activeMyClass.id);
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
    setIsEditDeckTitleActive(false);
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

  return (
    <div>
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
              <div className="col me-3" style={{maxWidth: "60px"}}>
                <Dropdown style={{backgroundColor: "none"}}>
                  <Dropdown.Toggle id="dropdown-basic" size="sm">
                    Edit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#0"
                                   onClick={(event) => showEditDeckTitleForm(event, deck)}>
                      <IoPencil style={{position: "relative", top: "-2px"}}/> Edit Deck Name
                    </Dropdown.Item>
                    <Dropdown.Item href="#0"
                                   onClick={(event) => openDeleteDeckModal(event, deck)}>
                      <IoTrashOutline
                        style={{position: "relative", top: "-2px"}}/> Delete this Deck
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
        close={closeCreateDeckModal}
        submit={handleSubmitCreateDeck}
        type={"Deck"}
      />

      {/* Delete Deck modal */}
      <Modals.deleteModal
        active={activeDeck}
        show={showDeleteDeckCaution}
        close={closeDeleteDeckModal}
        submit={handleSubmitDeleteDeck}
        type={"Deck"}
      />
    </div>
  )
}

export default Content
