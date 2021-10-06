import React, {useEffect, useState} from "react";
import CardService from "../../../services/card.service";
import {Form, FormControl, Modal, ModalBody} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {IoFolderOpen, IoPencil, IoPencilSharp, IoTrashOutline} from "react-icons/io5";
import {GoTrashcan, GoPencil} from "react-icons/go";
import {Link} from "react-router-dom";


const CardsPreviewModal = ({deck, cards, show, setShow}) => {

  const [showEditCardModal, setShowEditCardModal] = useState(false);


  const openEditCardModal = (event) => {
    event.preventDefault();
    setShowEditCardModal(true);
  }

  const closeEditCardModal = (event) => {
    event.preventDefault();
    setShowEditCardModal(false);
  }

  return (
    <div>

      <Modal
        id="deck-content"
        show={show}
        scrollable={true}
        centerd
        onHide={() => setShow(false)}
        dialogClassName="modal-80w"
      >
        <ModalHeader className="d-flex flex-column px-5 pt-5" style={{borderBottom: "0 none"}}>
          <button type="button" className="btn-close"
                  onClick={() => setShow(false)}/>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{display: "block"}}>
            {deck.title} Flashcards Preview
          </h3>
        </ModalHeader>
        <ModalBody className="px-5 pb-5">
          {cards.map((card, index) => (
            <div className="card shadow border-0 rounded-3 mt-4 py-2">
              <div className="row g mx-1">
                <div className="col my-auto" style={{maxWidth: "40px"}}>
                  <p className="my-auto" style={{color: "#a7b2bd"}}>{index + 1}</p>
                </div>
                <div className="col px-4 py-4 col-border-left d-flex align-items-center">
                  <p className="my-auto" style={{fontSize: "14px"}}>{card.question}</p>
                </div>
                <div className="col px-4 py-4 col-border-right d-flex align-items-center">
                  <p className="my-auto" style={{fontSize: "14px"}}>{card.answer}</p>
                </div>
                <div className="col mt-2 mx-auto" style={{maxWidth: "40px"}}>
                  <Link to="#0" onClick={(event) => openEditCardModal(event)}>
                    <div><GoPencil size="1.2em"/></div>
                  </Link>
                  {/*<div><GoTrashcan/></div>*/}
                </div>
              </div>
            </div>
          ))}
        </ModalBody>
      </Modal>
      <Modal
        id={"card-content"}
        show={showEditCardModal}
        onHide={() => setShowEditCardModal(false)}
        style={{ position: "absolute", zIndex:"1500"}}
        backdropClassName={"modal-backdrop-card"}
        dialogClassName="modal-70w"
      >
        <div className="modal-header d-flex flex-column pb-0" style={{borderBottom: "0 none"}}>
          <button type="button" className="btn-close"
                  onClick={() => setShowEditCardModal(false)}/>
          <h3 className="modal-title text-center" id="addClassModalLabel" style={{display: "block"}}>
            Create New
          </h3>
        </div>
        <div className="modal-body">
          <Form className="text-center">
            <FormControl className="mb-3 mx-auto" type="text" name="newTitle"
                         style={{width: "80%", height: "40px", fontSize: "18px"}}/>
            <label htmlFor=""
                   style={{fontSize: "12px"}}>Enter the title of your new above</label>
            <div className="row text-center justify-content-md-center mt-4 mb-3">
              <a href="#0"
                 className="col-4 my-auto"
                 onClick={(event) => closeEditCardModal(event)}>Cancel</a>
              <button type="button"
                      className="btn btn-primary my-auto col-4"
                      style={{display: "block"}}
                      onClick={() => setShow(false)}
              >Submit
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default CardsPreviewModal;