import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {Form, FormControl, Modal, ModalBody} from "react-bootstrap";
import {GoPencil} from "react-icons/go";
import ModalHeader from "react-bootstrap/ModalHeader";
import EditCardModal from "./EditCardModal";


const CardsPreviewModal = ({deck, cards, activeCard, setActiveCard, show, setShow}) => {

  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [hitCards, setHitCards] = useState([]);


  const openEditCardModal = (event, card) => {
    event.preventDefault();
    setActiveCard(card);
    setShowEditCardModal(true);
  }

  const searching = (word) => {
    let newCards = [];
    return cards.map(card => {
      if (card.question.toLowerCase().includes(word.toLowerCase()) ||
        card.answer.toLowerCase().includes(word.toLowerCase())) {
        newCards.push(card);
        console.log("hitCards: " + newCards[0].question);
      }
      setHitCards(newCards);
    })
  }

  const handleCardSearch = (event) => {
    // event.preventDefault();
    setKeyword(event.target.value);
    console.log("keyword: " + keyword)
    searching(event.target.value)
  }

  useEffect(() => {
    if(keyword === ''){
      setHitCards(cards)
    } else {
      searching(keyword)
    }
  },[cards])

  return (
    <div>

      <Modal
        id="deck-content"
        show={show}
        scrollable={true}
        onHide={() => setShow(false)}
        dialogClassName="modal-80w"
        // style={{backgroundColor: "#f6f3f0" }}
      >
        <ModalHeader className="d-flex flex-column px-5 pt-4"
                     style={{borderBottom: "0 none", backgroundColor: "#f6f3f0"}}>
          <button type="button" className="btn-close"
                  onClick={() => setShow(false)}/>
          <h4 className="modal-title text-center mb-3" id="addClassModalLabel"
              style={{display: "block"}}>
            {deck.title} Flashcards Preview
          </h4>
          <div>
            <FormControl type={"text"} className="mt-3 mb-2 mx-auto px-2"
                         style={{width: "30vw", fontSize: "14px", color:"#757575"}}
                         placeholder={"Search the card.."}
                         defaultValue={keyword}
                         onChange={(event) => handleCardSearch(event)}/>
          </div>
        </ModalHeader>
        <ModalBody className="px-5 pb-5 pt-0"
                   style={{backgroundColor: "#f6f3f0"}}>
          {hitCards.map((card, index) => (
            <div className="card shadow-sm border-0 rounded-3 mt-4 py-2" key={card.id}>
              <div className="row g mx-1" key={card.id}>
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
                    <div><GoPencil size="1.2em !important" className={"link-icon"}/></div>
                  </Link>
                  {/*<div><GoTrashcan/></div>*/}
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
    </div>
  )
}

export default CardsPreviewModal;