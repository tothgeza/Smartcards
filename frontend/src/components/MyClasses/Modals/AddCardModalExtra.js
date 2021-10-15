import React, {useState} from 'react';
import {Accordion, Button, Form, FormControl, Modal, useAccordionButton, Card} from "react-bootstrap";
import './addcardmodal.css';
import ModalHeader from "react-bootstrap/ModalHeader";
import {Link} from "react-router-dom";
import {GoPencil} from "react-icons/go";
import CardHeader from "react-bootstrap/CardHeader";
import CardService from "../../../services/card.service";

const AddCardModal = ({show, handleClose, activeCards, activeCard, setActiveCard}) => {

  const [isEditCardActive, setIsEditCardActive] = useState(false);

  function CustomToggle({eventKey, card}) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        if (activeCard.id === card.id)
          setActiveCard({})
        else
          setActiveCard(card)
        console.log('totally custom! ' + card)
      }
    );

    return (
      <Link to="#0"
            onClick={decoratedOnClick}
      >
        <div><GoPencil size="1.2em !important" className={"link-icon"}/></div>
      </Link>
    );
  }
  const handleSubmitEditCard = (event, index, card) => {
    event.preventDefault()

    // const newQuestion = event.target.newQuestion.value
    // const newAnswer = event.target.newAnswer.value
    // CardService.updateCard(card.id, newQuestion, newAnswer)
    //   .then((result) => setActiveCard(result.data))
    // setActiveCard({});
  }
  return (
    <Modal show={show}
           size={"lg"}
           onHide={() => handleClose()}
           dialogClassName="modal-80w">
      <Modal.Header>
        <button type="button" className="btn-close"
                onClick={() => handleClose()}/>
        {/*<Modal.Title>Modal heading</Modal.Title>*/}
      </Modal.Header>
      <Modal.Body>
        Woohoo, you're reading this text in a modal!
        <Accordion defaultActiveKey="0" flush>
          {activeCards.map((card, index) => (
            <Card className="edit-card shadow-sm border-0 rounded-3 mt-4 py-2" key={card.id}>
              <Form className="row h-100"
                    // onSubmit={(event) => handleSubmitEditCard(event, activeCard)}
                    onSubmit={(event) => handleSubmitEditCard(event, index, activeCard)}
              >
              <div className="row g mx-1" key={card.id}>
                <div className="col my-auto" style={{maxWidth: "40px"}}>
                  <p className="my-auto" style={{color: "#a7b2bd"}}>{index + 1}</p>
                </div>
                {activeCard.id === card.id ? (
                  <div className="col p-0">
                    <FormControl as={"textarea"} className="rounded-0 mb-3 mx-auto h-100 pt-2 px-2" name="newQuestion"
                                 style={{width: "100%", fontSize: "14px", overflowY:"scroll"}}
                                 defaultValue={activeCard.question}/>
                  </div>
                ) : (
                  <div className="col p-2 card-left-border d-flex align-items-center">
                    <p className="my-auto" style={{fontSize: "14px"}}>{card.question}</p>
                  </div>
                )}
                {activeCard.id === card.id ? (
                  <div className="col p-0">
                    <FormControl as={"textarea"} className="rounded-0 mb-3 mx-auto h-100 pt-2 px-2" name="newQuestion"
                                 style={{width: "100%", fontSize: "14px", overflowY:"scroll"}}
                                 defaultValue={activeCard.answer}/>
                  </div>
                ) : (
                  <div className="col p-2 card-left-border d-flex align-items-center">
                    <p className="my-auto" style={{fontSize: "14px"}}>{card.answer}</p>
                  </div>
                )}
                <div className="col mt-2 mx-auto" style={{maxWidth: "40px"}}>
                  <CustomToggle eventKey={index} card={card}/>
                </div>
              </div>
              <Accordion.Collapse eventKey={index}>
                <Card.Body style={{padding: "10px 0 0 0"}}>
                  <div className="row mx-1" key={card.id}>
                    <div className="col-6 d-flex justify-content-end">
                      <Button className={"py-1"}>Reset</Button>
                    </div>
                    <div className="col-6 d-flex justify-content-start my-auto" style={{maxWidth: "40px"}}>
                      <Button type="submit" className={"next-button py-1"}>Save</Button>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
              </Form>
            </Card>
          ))}
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};


export default AddCardModal;
