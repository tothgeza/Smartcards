import React from 'react';
import {Form, FormControl, Modal} from "react-bootstrap";
import './addcardmodal.css';
import CardService from "../../../services/card.service";

const AddCardModal = ({deck, show, handleClose, setActiveCard}) => {

  const handleSubmitEditCard = (event) => {
    event.preventDefault()
    const newQuestion = event.target.newQuestion.value
    const newAnswer = event.target.newAnswer.value
    CardService.createCard(deck.id, newQuestion, newAnswer)
      .then((result) => setActiveCard(result.data))
    handleClose(false);
  }

  return (
    <Modal
      id={"card-content"}
      show={show}
      onHide={() => handleClose(false)}
      scrollable={true}
      style={{position: "absolute", zIndex: "1500"}}
      backdropClassName={"modal-backdrop-card"}
      dialogClassName="modal-70w"
    >
      <div className="modal-header d-flex flex-column px-5 pt-4 pb-0"
           style={{borderBottom: "0 none", backgroundColor: "#ECF6FF"}}>
        <button type="button" className="btn-close"
                onClick={() => handleClose(false)}/>
        <h4 className="modal-title text-center mb-4" id="addClassModalLabel" style={{display: "block"}}>
          Add New Card
        </h4>
      </div>
      <div className="modal-body edit-card" style={{backgroundColor: "#ECF6FF"}}>
        <div className="container-fluid h-100">
          <Form className="row h-100"
                onSubmit={(event) => handleSubmitEditCard(event)}>
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
                               style={{width: "100%", fontSize: "16px"}}/>
                </div>
                <div className="row mt-4 mb-2">
                  <div style={{height: "50px"}} className={"text-end pt-2"}>
                    <a href="#0"
                       className=""
                       onClick={() => handleClose(false)}>Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="h-100 d-flex flex-column">
                <div className="row">
                  <div className="ms-2 text-secondary"
                       style={{height: "15px", letterSpacing: "1px"}}>Answer</div>
                </div>
                <div className="row flex-grow-1 p-3 pe-4 justify-content-center">
                  <FormControl as={"textarea"} className="mb-3 mx-auto h-100 pt-3 px-3" name="newAnswer"
                               style={{width: "100%", fontSize: "16px"}}/>
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
  )
};


export default AddCardModal;
