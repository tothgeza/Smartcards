import {Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import PublicDeckService from "../../../services/publicdeck.service";
import './downloadmodal.css'


const DownloadModal = ({show, setShow, submit, myClasses}) => {

  const [classArrayIndex, setClassArrayIndex] = useState(1);

  return (
    <Modal
      id={"delete-content"}
      show={show}
      onHide={() => setShow(false)}
      scrollable={true}
      style={{position: "absolute", zIndex: "1500"}}
      backdropClassName={"modal-backdrop-card"}
      // dialogClassName="modal-70w"
    >
      <div className="modal-header d-flex flex-column px-5 pt-4 pb-0"
           style={{borderBottom: "0 none", backgroundColor: "#F3F3F3"}}>
        <button type="button" className="btn-close"
                onClick={() => setShow(false)}/>
        <h4 className="modal-title text-center mb-3" id="addClassModalLabel" style={{display: "block"}}>
          Download Deck
        </h4>
      </div>
      <div className="modal-body download-deck" style={{backgroundColor: "#F3F3F3"}}>
        <div className="container-fluid h-100">
          <Form className="h-100"
            onSubmit={(event) => submit(event, classArrayIndex)}
          >
            <Form.Label>Select a Class for saving </Form.Label>
            <Form.Select
              as={"select"}
              value={classArrayIndex}
              onChange={(event) => {
                setClassArrayIndex(event.target.value);
              }}
            >
              {myClasses.map((myClass, index) => (
                <option value={index} key={myClass.id}>{myClass.title}</option>
              ))}
            </Form.Select>
            <div className={"row mt-5 mb-3"}>
              <div className="col-6 my-auto d-flex justify-content-end">
                <a href="#0"
                   className="me-3"
                   onClick={() => setShow(false)}>Cancel
                </a>
              </div>
              <div className="col-6 my-auto d-flex justify-content-start ps-0">
                <button type="submit"
                        className="btn btn-primary my-auto py-2"
                        style={{display: "block"}}>
                  Save
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default DownloadModal;