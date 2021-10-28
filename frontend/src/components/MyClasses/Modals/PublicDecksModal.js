import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FormControl, Modal, ModalBody} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import DownloadModal from "./DownloadModal";
import './cardspreviewmodal.css'
import {IoAlbumsSharp} from "react-icons/io5";
import {IoMdDownload} from "react-icons/io";
import PublicDeckService from "../../../services/publicdeck.service";


const PublicDecksModal = ({show, closeModal, publicDecks, keyword, setKeyword,
                            myClasses, setActiveMyClass, setIsActiveMyClass}) => {

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [deckId, setDeckId] = useState();

  const openDownloadModal = (event, deckId) => {
    event.preventDefault();
    setDeckId(deckId);
    setShowDownloadModal(true);
  }

  const handleDownloadDeck = (event, index) => {
    event.preventDefault()
    PublicDeckService.downloadDeck(myClasses[index].id, deckId)
      .then(() => setActiveMyClass(myClasses[index]))
      .then(() => setIsActiveMyClass(true))
    setShowDownloadModal(false);
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
            Public Decks
          </h4>
          <div>
            <FormControl type={"text"} className="mt-3 mb-2 mx-auto px-2"
                         style={{width: "30vw", fontSize: "14px", color: "#757575"}}
                         placeholder={"Search deck..."}
                         defaultValue={keyword}
                         onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
        </ModalHeader>
        <ModalBody className="px-5 pb-5 pt-0"
                   style={{backgroundColor: "#F3F3F3"}}>
          {publicDecks.filter(deck => {
            return deck.title.toLowerCase().includes(keyword.toLowerCase())
          }).map((deck, index) => (
            <div key={deck.id} className="card border-0 shadow-sm mt-3">
              <div className="card-body mx-0 px-1">
                <div className="row align-items-center" style={{paddingTop: "3px"}}>
                  <div className="col" style={{maxWidth: "40px"}}>
                  </div>
                  <div className="col" style={{maxWidth: "72px"}}>
                    <div className={"p-2"}>
                      <IoAlbumsSharp color={"#ffc748"} size="2em"/>
                    </div>
                  </div>
                  <div className="col">
                    <p className="my-0" style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      paddingLeft: "1px",
                      paddingTop: "1px",
                      paddingBottom: "1px"
                    }}>
                      {deck.title}
                    </p>
                  </div>
                  <div className="col"
                       style={{maxWidth: "75px"}}
                  >
                    <ul className={"list-group list-group-horizontal m-0 "}>
                      <li className="list-group-item border-0 p-2">
                        <Link to="#0" className="class-link" onClick={(event) => openDownloadModal(event, deck.id)}>
                          <IoMdDownload className={"link-icon"} size={"1.3em"}/>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ModalBody>
      </Modal>
      <DownloadModal
        show={showDownloadModal}
        setShow={setShowDownloadModal}
        submit={handleDownloadDeck}
        myClasses={myClasses}
      />
    </div>
  )
}

export default PublicDecksModal;