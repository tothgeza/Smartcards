import {Modal, Form, FormControl, Button} from "react-bootstrap";
import React from "react";
import "./modals.css"

const deleteModal = ({active, show, setShow, submit, type}) => {
  const text = (type) => {
    switch (type) {
      case 'Class':
        return (
          <p className="text-center text-muted">
            Are you sure that you want to Remove <b>{active.title}</b> class from your library?
            This action cannot be undone.

          </p>
        );
      case 'Deck':
        return (
          <p className="text-center text-muted">
            You are about to remove <b>{active.title}</b> deck.
            Are you sure that you wish to proceed?
          </p>
        );
      case 'Card':
        return (
          <p className="text-center text-muted">
            You are about to remove this Card.
            Are you sure that you wish to proceed?
          </p>
        );
    }
  }
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      style={{position: "absolute", zIndex: "1500"}}
      dialogClassName="modal-position"
      backdropClassName={"modal-backdrop-delete"}
    >
      <div className="modal-header d-flex flex-column pb-0"
           style={{borderBottom: "0 none", backgroundColor: "#ECF6FF"}}>
        <button type="button" className="btn-close"
                onClick={() => setShow(false)}/>
        <h3 className="modal-title text-center" id="addClassModalLabel"
            style={{display: "block"}}>Caution</h3>
      </div>
      <div className="modal-body"
           style={{backgroundColor: "#ECF6FF"}}>
        {text(type)}
        <div className="row text-center justify-content-md-center mt-4 mb-3">
          <div className="col my-auto d-flex justify-content-end">
            <Button onClick={() => setShow(false)}>Cancel</Button>
          </div>
          <div className="col my-auto d-flex justify-content-start">
            <a href="#0"
               onClick={(event) => submit(event)}>Yes, remove {type}
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const createModal = ({show, setShow, submit, type}) => {
  const text = (type) => {
    switch (type) {
      case 'Class':
        return (
          <p className="text-center text-muted">
            A Class is a set of Flashcards, grouped into Decks
          </p>)
      case 'Deck':
        return (
          <p className="text-center text-muted">
            A Deck is a subset of Flashcards in a Class,
            <br/>
            similar to chapters in a book
          </p>)
      default:
        return '';
    }
  }
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-position"
    >
      <div className="modal-header d-flex flex-column pb-0"
           style={{borderBottom: "0 none", backgroundColor: "#ECF6FF"}}>
        <button type="button" className="btn-close"
                onClick={() => setShow(false)}/>
        <h3 className="modal-title text-center" id="addClassModalLabel" style={{display: "block"}}>
          Create New {type}
        </h3>
      </div>
      <div className="modal-body modal-title"
           style={{borderBottom: "0 none", backgroundColor: "#ECF6FF"}}>
        {text(type)}
        <Form className="text-center" onSubmit={(event) => submit(event)}>
          <FormControl className="mb-3 mx-auto" type="text" name="newTitle"
                       style={{width: "80%", height: "40px", fontSize: "18px"}}/>
          <label htmlFor=""
                 style={{fontSize: "12px"}}>Enter the title of your new {type} above</label>
          <button type="submit" className="btn btn-primary mx-auto mt-3 mb-2"
                  style={{display: "block"}}>Continue
          </button>
        </Form>
      </div>
    </Modal>
  )
}

export default {
  deleteModal,
  createModal,
}