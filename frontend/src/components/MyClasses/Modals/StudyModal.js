import React, {useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";
import './studymodal.css';
import Card from "./Card"
import {SwitchTransition, CSSTransition} from "react-transition-group";
import ReactCardFlip from 'react-card-flip';
import EditCardModal from "./EditCardModal";

const StudyModal = ({cards, activeCard, setActiveCard, show, close, deck, index, setIndex,
                      isAnswer, setIsAnswer, nextCard, setNextCard, isFlipped, setIsFlipped}) => {
  // const [isAnswer, setIsAnswer] = useState(false);
  // const [nextCard, setNextCard] = useState(false);
  const [charSize, setCharSize] = useState(22)
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  // const [isFlipped, setIsFlipped] = useState(false);

  const openEditCardModal = (event, card) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveCard(card);
    setShowEditCardModal(true);
  }
  const handleFlip = (e) => {
    e.preventDefault();
    setIsAnswer(!isAnswer)
    // setNextCard(false);
    setIsFlipped(!isFlipped)
  }

  const showNextCard = () => {
    if (index === cards.length - 1)
      setIndex(0);
    else
      setIndex(index => index + 1)
    setIsAnswer(false);
    setIsFlipped(false);
    setNextCard(!nextCard);
  }
  let contentStyle = {
    fontWeight: "500",
    fontSize: charSize + "px",
    whiteSpace:"pre-line"
  }

  const increaseCharSize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (charSize <= 128)
      setCharSize(charSize + 2)
    console.log(charSize)
  }

  const decreaseCharSize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (charSize >= 12)
      setCharSize(charSize - 2)
    console.log(charSize)
  }

  return (
    <div style={{overflow:"hidden"}}>
      <Modal show={show}
             onHide={close}
             fullscreen={true}
             style={{transitionDuration: "0.3s"}}
      >
        <Modal.Body className={"p-0"}>
          <div className="container-fluid h-100 p-0"
               style={{overflow: "hidden"}}
          >
            <div className={"h-100 d-flex flex-column align-item-center"}
                 style={{backgroundColor: "#F5F5F5"}}
            >
              <div className="container-xxl ">
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
                    key={nextCard}
                    addEndListener={(node, done) => {
                      node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade">
                    <div className="flex-grow-1 pb-2"
                         style={{overflow: "hidden"}}
                    >
                      <div className={"my-card h-100"} onClick={(event) => handleFlip(event) }>
                        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical"
                                       flipSpeedFrontToBack={1}
                                       flipSpeedBackToFront={1}>
                        <Card content={(cards && cards.length > 0) && cards[index].question}
                              showAnswer={isAnswer}
                              contentStyle={contentStyle}
                              increaseCharSize={increaseCharSize}
                              decreaseCharSize={decreaseCharSize}
                              openEditCardModal={openEditCardModal}
                              card={cards[index]}
                              color={"#4CAF50"}
                              type={"Question"}
                        />
                          <Card content={(cards && cards.length > 0) && cards[index].answer}
                                showAnswer={isAnswer}
                                contentStyle={contentStyle}
                                increaseCharSize={increaseCharSize}
                                decreaseCharSize={decreaseCharSize}
                                openEditCardModal={openEditCardModal}
                                card={cards[index]}
                                color={"#FF5722"}
                                type={"Answer"}
                          />
                        </ReactCardFlip>
                      </div>
                    </div>
                  </CSSTransition>
                </SwitchTransition>
                {/*  <Card content={(cards && cards.length > 0) && cards[0].question}/>*/}
              </div>
              <div className="container-xxl row my-4 mx-auto">
                <Button onClick={!isAnswer ? ((event) => handleFlip(event)) :
                  (() => showNextCard())}
                        className={`d-flex shadow justify-content-center align-items-center ${isAnswer ? "show-button" : "next-button"} `}
                        style={{height: "10vh", borderRadius: "8px"}}>
                  {!isAnswer ? "Show Answer" : "Next Question"}
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditCardModal
        show={showEditCardModal}
        setShow={setShowEditCardModal}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
    </div>
  );
};

export default StudyModal;
