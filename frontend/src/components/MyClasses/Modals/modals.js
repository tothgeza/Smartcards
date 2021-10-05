import {Modal, Form, FormControl} from "react-bootstrap";
import React from "react";


const deleteModal = ({active, show, close, submit, type}) => {
  const text = (type) => {
    switch (type) {
      case 'Class':
        return (
          <p className="text-center text-muted">
            You are about to remove the <b>{active.title}</b> from your library.
            Are you sure that you wish to proceed
          </p>
        );
      case 'Deck':
        return (
          <p className="text-center text-muted">
            You are about to remove the <b>{active.title}</b>.
            Are you sure that you wish to proceed
          </p>
        );
      default:
        return '';
    }
  }
  return (
    <Modal show={show}>
      <div className="modal-header d-flex flex-column pb-0" style={{borderBottom: "0 none"}}>
        <button type="button" className="btn-close"
                onClick={(event) => close(event)}/>
        <h3 className="modal-title text-center" id="addClassModalLabel"
            style={{display: "block"}}>Caution</h3>
      </div>
      <div className="modal-body">
        {text(type)}
        <div className="row text-center justify-content-md-center mt-4 mb-3">
          <button type="button"
                  className="btn btn-primary my-auto col-4"
                  style={{display: "block"}}
                  onClick={(event) => close(event)}
          >Cancel
          </button>
          <a href="#0"
             className="col-4 my-auto"
             onClick={(event) => submit(event)}>Yes, remove {type}</a>
        </div>
      </div>
    </Modal>
  )
}

const createModal = ({show, close, submit, type}) => {
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
    <Modal show={show}>
      <div className="modal-header d-flex flex-column pb-0" style={{borderBottom: "0 none"}}>
        <button type="button" className="btn-close"
                onClick={(event) => close(event)}/>
        <h3 className="modal-title text-center" id="addClassModalLabel" style={{display: "block"}}>
          Create New {type}
        </h3>
      </div>
      <div className="modal-body">
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
  createModal
}