import React, {useState} from "react";
import CardService from "../../../services/card.service";
import {Form, FormControl, Modal, ModalBody} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {GoPencil} from "react-icons/go";
import {Link} from "react-router-dom";


const CardsPreviewModal = ({deck, cards, activeCard, setActiveCard, show, setShow}) => {

  const [showEditCardModal, setShowEditCardModal] = useState(false);


  const openEditCardModal = (event, card) => {
    event.preventDefault();
    setActiveCard(card);
    setShowEditCardModal(true);
  }

  const closeEditCardModal = (event) => {
    event.preventDefault();
    setShowEditCardModal(false);
  }

  const handleSubmitEditCard = (event, card) => {
    event.preventDefault();
    const newQuestion = event.target.newQuestion.value;
    const newAnswer = event.target.newAnswer.value;
    CardService.updateCard(card.id, newQuestion, newAnswer)
      .then((result) => setActiveCard(result.data))
      .then(result => closeEditCardModal(event));
  }


  return (
    <div>

      <Modal
        id="deck-content"
        show={show}
        scrollable={true}
        onHide={() => setShow(false)}
        dialogClassName="modal-80w"
      >
        <ModalHeader className="d-flex flex-column px-5 pt-4" style={{borderBottom: "0 none"}}>
          <button type="button" className="btn-close"
                  onClick={() => setShow(false)}/>
          <h4 className="modal-title text-center" id="addClassModalLabel"
              style={{display: "block", color: "#6d7f91"}}>
            {deck.title} Flashcards Preview
          </h4>
        </ModalHeader>
        <ModalBody className="px-5 pb-5">
          {cards.map((card, index) => (
            <div className="card shadow border-0 rounded-3 mt-4 py-2" key={card.id}>
              <div className="row g mx-1">
                <div className="col my-auto" style={{maxWidth: "40px"}}>
                  <p className="my-auto" style={{color: "#a7b2bd"}}>{index + 1}</p>
                </div>
                <div className="col px-4 py-4 card-left-border d-flex align-items-center">
                  <p className="my-auto" style={{fontSize: "14px"}}>{card.question}</p>
                </div>
                <div className="col px-4 py-4 card-right-border d-flex align-items-center">
                  <p className="my-auto" style={{fontSize: "14px"}}>{card.answer}</p>
                </div>
                <div className="col mt-2 mx-auto" style={{maxWidth: "40px"}}>
                  <Link to="#0" onClick={(event) => openEditCardModal(event, card)}>
                    <div><GoPencil size="1.2em" className={"class-link"}/></div>
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
        scrollable={true}
        style={{position: "absolute", zIndex: "1500"}}
        backdropClassName={"modal-backdrop-card"}
        dialogClassName="modal-70w"
      >
        <div className="modal-header d-flex flex-column px-5 pt-4 pb-0" style={{borderBottom: "0 none"}}>
          <button type="button" className="btn-close"
                  onClick={() => setShowEditCardModal(false)}/>
          <h4 className="modal-title text-center" id="addClassModalLabel" style={{display: "block"}}>
            Edit Card
          </h4>
        </div>
        <div className="modal-body mt-3">
          <div className="container-fluid h-100">
            <Form className="row h-100"
                  onSubmit={(event) => handleSubmitEditCard(event, activeCard)}>
              <div className="col-6">
                <div className="h-100 d-flex flex-column">
                  <div className="row mb-0">
                    <div className="ms-3" style={{height: "15px"}} >Question</div>
                  </div>
                  <div className="row flex-grow-1 p-3 ps-4 justify-content-center">
                    <FormControl as={"textarea"} className="mb-3 mx-auto h-100 pt-3 px-3" name="newQuestion"
                                 style={{width: "100%", fontSize: "16px", fontWeight:"500"}}
                                 defaultValue={activeCard.question}/>
                  </div>
                  <div className="row mt-4 mb-2">
                    <div style={{height: "50px"}} className={"text-end pt-2"}>
                      <a href="#0"
                         className=""
                         onClick={(event) => closeEditCardModal(event)}>Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="h-100 d-flex flex-column">
                  <div className="row">
                    <div className="ms-2" style={{height: "15px"}}>Answer</div>
                  </div>
                  <div className="row flex-grow-1 p-3 pe-4 justify-content-center">
                      <FormControl as={"textarea"} className="mb-3 mx-auto h-100 pt-3 px-3" name="newAnswer"
                                   style={{width: "100%", fontSize: "16px", fontWeight:"500"}}
                                   defaultValue={activeCard.answer}/>
                  </div>
                  <div className="row mt-4 mb-2">
                    <div style={{height: "50px"}}>
                      <button type="submit"
                              className="btn btn-primary my-auto py-2"
                              style={{display: "block"}}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CardsPreviewModal;