import React, {useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";
import './studymodal.css';
import Card from "./Card"
import {SwitchTransition, CSSTransition} from "react-transition-group";

const StudyModal = ({cards, show, close, deck}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(0);

  const showNextCard = () => {
    if (index === cards.length - 1)
      setIndex(0);
    else
      setIndex(index => index + 1)
    setShowAnswer(false);
  }

  return (
    <div>
      <Modal show={show}
             onHide={close}
             fullscreen={true}
             style={{transitionDuration: "0.3s"}}
      >
        <Modal.Body className={"p-0"}>
          <div className="container-fluid h-100 p-0"
          style={{overflowX:"hidden"}}
          >
              <div className={"h-100 d-flex flex-column align-item-center"}
                style={{backgroundColor: "#E1ECFC"}}
              >
                <div className="row align-items-center">
                  <div className="col mt-4">
                    <p className={"ms-4 me-2 d-inline-block my-auto" }>Deck: {deck.title}</p>
                    <Link to={"/#"}>deck preview</Link>
                  </div>
                  <div className="col mt-4">
                    <div className={"text-end me-4"}>
                          <Link to={"/#0"} onClick={(event) => close(event)}>
                            <IoIosArrowBack size={"3em"}/>
                          </Link>
                    </div>
                  </div>
                </div>
                <div className="container-lg row flex-grow-1 h-100 mx-auto"
                     style={{border: "2ps solid blue"}}>
                  <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                      key={showAnswer}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade">
                      <div className="flex-grow-1 pb-2"
                           style={{overflow: "hidden"}}
                      >
                        <div className={"my-card h-100"}>
                          <Card content={!showAnswer ? ((cards && cards.length > 0) && cards[index].question) :
                            ((cards && cards.length > 0) && cards[index].answer)}
                                showAnswer={showAnswer}
                                setShowAnswer={setShowAnswer}

                          />
                        </div>
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                  {/*  <Card content={(cards && cards.length > 0) && cards[0].question}/>*/}
                </div>
                <div className="container-lg row my-4 p mx-auto">
                  <Button onClick={!showAnswer ? (() => setShowAnswer(showAnswer => !showAnswer)) :
                    (() => showNextCard())}
                          className={"d-flex shadow justify-content-center align-items-center"}
                          style={{height: "120px", backgroundColor: "#0067C0", borderRadius: "10px"}}>
                    {!showAnswer ? "Show Answer" : "Next Question"}
                  </Button>
                </div>
              </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudyModal;
