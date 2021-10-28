import {Form, FormControl, Modal} from "react-bootstrap";
import React from "react";
import CardService from "../../../services/card.service";
import './editcardmodal.css'


const EditCardModal = ({show, setShow, activeCard, setActiveCard}) => {

  const handleSubmitEditCard = (event, card) => {
    event.preventDefault()
    const newQuestion = event.target.newQuestion.value
    const newAnswer = event.target.newAnswer.value
    CardService.updateCard(card.id, newQuestion, newAnswer)
      .then((result) => setActiveCard(result.data))
    setShow(false);
  }

  return (
    <Modal
      id={"card-content"}
      show={show}
      onHide={() => setShow(false)}
      scrollable={true}
      style={{position: "absolute", zIndex: "1500"}}
      backdropClassName={"modal-backdrop-card"}
      dialogClassName="modal-70w"
    >
      <div className="modal-header d-flex flex-column px-5 pt-4 pb-0"
           style={{borderBottom: "0 none", backgroundColor: "#F3F3F3"}}>
        <button type="button" className="btn-close"
                onClick={() => setShow(false)}/>
        <h4 className="modal-title text-center mb-3" id="addClassModalLabel" style={{display: "block"}}>
          Edit Card
        </h4>
      </div>
      <div className="modal-body edit-card" style={{backgroundColor: "#F3F3F3"}}>
        <div className="container-fluid h-100">
          <Form className="row h-100"
                onSubmit={(event) => handleSubmitEditCard(event, activeCard)}>
            <div className="col-6">
              <div className="h-100 d-flex flex-column">
                <div className="row mb-0">
                  <div className="ms-2  text-secondary"
                       style={{height: "15px", letterSpacing: "1px"}}>
                    Question
                  </div>
                </div>
                <div className="row flex-grow-1 p-3 ps-4 justify-content-center">
                  <FormControl as={"textarea"} className="mb-3 mx-auto h-100 pt-3 px-3" name="newQuestion"
                               style={{width: "100%", fontSize: "16px"}}
                               defaultValue={activeCard.question}/>
                </div>
                <div className="row mt-3 mb-1">
                  <div style={{height: "40px"}} className={"text-end pt-2"}>
                    <a href="#0"
                       className=""
                       onClick={() => setShow(false)}>Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="h-100 d-flex flex-column">
                <div className="row">
                  <div className="ms-2 text-secondary"
                       style={{height: "15px", letterSpacing: "1px"}}>
                    Answer
                  </div>
                </div>
                <div className="row flex-grow-1 p-3 pe-4 justify-content-center">
                  <FormControl as={"textarea"} className="mb-3 mx-auto h-100 pt-3 px-3" name="newAnswer"
                               style={{width: "100%", fontSize: "16px"}}
                               defaultValue={activeCard.answer}/>
                </div>
                <div className="row mt-3 mb-1">
                  <div style={{height: "40px"}}>
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
  )
}

export default EditCardModal;