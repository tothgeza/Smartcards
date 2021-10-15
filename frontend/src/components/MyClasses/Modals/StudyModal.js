import React, {useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";
import './studymodal.css';
import Card from "./Card"
import {SwitchTransition, CSSTransition} from "react-transition-group";

const StudyModal = ({cards, show, close, deck, index, setIndex}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [charSize, setCharSize] = useState(22)

  const showNextCard = () => {
    if (index === cards.length - 1)
      setIndex(0);
    else
      setIndex(index => index + 1)
    setShowAnswer(false);
  }
  let contentStyle = {
    fontWeight: "500",
    fontSize: charSize + "px"
  }

  const increaseCharSize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (charSize >= 12 && charSize <= 128)
      setCharSize(charSize + 2)
    console.log(charSize)
  }

  const decreaseCharSize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (charSize >= 12 && charSize <= 128)
      setCharSize(charSize - 2)
    console.log(charSize)
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
               style={{overflowX: "hidden"}}
          >
            <div className={"h-100 d-flex flex-column align-item-center"}
                 style={{backgroundColor: "#F5F5F5"}}
            >
              <div className="container-xxl">
                <div className="row mt-4 align-items-center">
                  <div className="col">
                    <Link to={"/#0"} className={"link-icon"} onClick={(event) => close(event)}>
                      <IoIosArrowBack size={"4vh"}/>
                    </Link>
                  </div>
                  <div className="col mt-4 d-flex justify-content-center"
                       style={{color: "#BFBFBF", fontWeight: "500"}}>
                    <p className={"ms-4 me-2 d-inline-block my-auto"}
                    >Deck:
                    </p>
                    <span className={"text-secondary"}>{deck.title} </span>
                    <p className={"ms-4 me-2 d-inline-block my-auto"}
                    >Card:
                    </p>
                    <span className={"text-secondary"}>
                    {index + 1}/{(cards && cards.length > 0) ? cards.length : "0"}
                  </span>
                    {/*<Link to={"/#"}>deck preview</Link>*/}
                  </div>
                  <div className="col mt-4">

                  </div>
                </div>
              </div>
              <div className="container-xxl row flex-grow-1 mx-auto">
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
                              contentStyle={contentStyle}
                              increaseCharSize={increaseCharSize}
                              decreaseCharSize={decreaseCharSize}

                        />
                      </div>
                    </div>
                  </CSSTransition>
                </SwitchTransition>
                {/*  <Card content={(cards && cards.length > 0) && cards[0].question}/>*/}
              </div>
              <div className="container-xxl row my-4 mx-auto">
                <Button onClick={!showAnswer ? (() => setShowAnswer(showAnswer => !showAnswer)) :
                  (() => showNextCard())}
                        className={`d-flex shadow justify-content-center align-items-center ${showAnswer ? "show-button" : "next-button"} `}
                        style={{height: "10vh", borderRadius: "8px"}}>
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
