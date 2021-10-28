import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FormControl, Modal, ModalBody} from "react-bootstrap";
import {GoPencil, GoTrashcan} from "react-icons/go";
import ModalHeader from "react-bootstrap/ModalHeader";
import EditCardModal from "./EditCardModal";
import Modals from "./modals";
import './cardspreviewmodal.css'
import CardService from "../../../services/card.service";



const CardsPreviewModal = ({deck, cards, activeCard, setActiveCard, show, closeModal, keyword, setKeyword}) => {

  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);

  const openEditCardModal = (event, card) => {
    event.preventDefault();
    setActiveCard(card);
    setShowEditCardModal(true);
  }

  const openDeleteCardModal = (event, card) => {
    event.preventDefault();
    setActiveCard(card);
    setShowDeleteCardModal(true);
  }

  const handleSubmitDeleteCard = (event) => {
    event.preventDefault()
    CardService.deleteCard(activeCard.id)
      .then((result) => setActiveCard({}))
    setShowDeleteCardModal(false);
  }

  return (
    <div>
      <Modal
        id="deck-content"
        show={show}
        scrollable={true}
        onHide={() => closeModal()}
        dialogClassName="modal-80w"
        // style={{backgroundColor: "#f6f3f0" }}
      >
        <ModalHeader className="d-flex flex-column px-5 pt-4 card-preview"
                     style={{borderBottom: "0 none", backgroundColor: "#F3F3F3"}}>
          <button type="button" className="btn-close"
                  onClick={() => closeModal()}/>
          <h4 className="modal-title text-center mb-3" id="addClassModalLabel"
              style={{display: "block"}}>
            {deck.title} Flashcards Preview
          </h4>
          <div>
            <FormControl type={"text"} className="mt-3 mb-2 mx-auto px-2"
                         style={{width: "30vw", fontSize: "14px", color: "#757575"}}
                         placeholder={"Search the card.."}
                         defaultValue={keyword}
                         onChange={(event) => setKeyword(event.target.value)}/>
          </div>
        </ModalHeader>
        <ModalBody className="px-5 pb-5 pt-0"
                   style={{backgroundColor: "#F3F3F3"}}>
          {cards.filter(card => {
            return card.question.toLowerCase().includes(keyword.toLowerCase()) ||
              card.answer.toLowerCase().includes(keyword.toLowerCase())
          }).map((card, index) => (
            <div className="card shadow-sm border-0 rounded-3 mt-4 py-2" key={card.id}>
              <div className="row g mx-1" key={card.id}>
                <div className="col my-auto" style={{maxWidth: "40px"}}>
                  <p className="my-auto" style={{color: "#a7b2bd"}}>{index + 1}</p>
                </div>
                <div className="col px-4 py-4 card-left-border d-flex align-items-center">
                  <p className="my-auto" style={{fontSize: "14px", whiteSpace:"pre-line"}}>{card.question}</p>
                </div>
                <div className="col px-4 py-4 card-right-border d-flex align-items-center">
                  <p className="my-auto" style={{fontSize: "14px", whiteSpace:"pre-line"}}>{card.answer}</p>
                </div>
                <div className="col mx-auto" style={{maxWidth: "40px"}}>
                  <div>
                    <Link to="#0" onClick={(event) => openEditCardModal(event, card)}>
                      <GoPencil size="1.2em !important" className={"link-icon"}/>
                    </Link>
                  </div>
                  <div className={"mt-3"}>
                    <Link to="#0" onClick={(event) => openDeleteCardModal(event, card)}>
                      <GoTrashcan size="1.2em !important" className={"link-icon"}/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ModalBody>
      </Modal>
      <EditCardModal
        show={showEditCardModal}
        setShow={setShowEditCardModal}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Modals.deleteModal
        active={activeCard}
        show={showDeleteCardModal}
        setShow={setShowDeleteCardModal}
        submit={handleSubmitDeleteCard}
        type={"Card"}
      />
    </div>
  )
}

export default CardsPreviewModal;