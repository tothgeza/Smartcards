import React, {useState} from "react";
import './home.css';
import About from './sections/About';
import Smartest from './sections/Smartest';
import {IoPlay, IoPause} from "react-icons/io5";

import {Button, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import LoginModal from "./MyClasses/Modals/LoginModal";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function openLoginModal() {
    setShowLoginModal(true);
  }

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{overflowX: "hidden", backgroundColor: "white"}}>
      <section className={"home_sect"}>
        <div className='container-fluid p-0'>
          <Carousel
            autoPlay={true}
            activeIndex={index}
            onSelect={handleSelect}
            interval={pause ? null : 4000}
            controls={false}
            pause={false}
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=First slide&bg=373940"
                alt="First slide"
              />
              <div className={"img_overlay"}/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=Second slide&bg=282c34"
                alt="Third slide"
              />
              <div className={"img_overlay"}/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=Third slide&bg=20232a"
                alt="Third slide"
              />
              <div className={"img_overlay"}/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=Fourth slide&bg=20248a"
                alt="Third slide"
              />
              <div className={"img_overlay"}/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=Third slide&bg=205327"
                alt="Third slide"
              />
              <div className={"img_overlay"}/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className={"play-pause"}>
            <Link to={"#0"} onClick={() => setPause(!pause)}>
              {pause ? (
                <IoPlay size={"1.5em"} style={{color: "white"}}/>
              ) : (
                <IoPause size={"1.5em"} style={{color: "white"}}/>
              )}
            </Link>
          </div>
          <div className={"over_content"}>
            <h1>Rise to<br/>your challenge.</h1>
            <p className={"d-inline-block"}>
              Flashcards for <b>serious learners.</b>
            </p>
            <Button className={"ms-4"} onClick={() => openLoginModal()}>Get Started</Button>
          </div>
        </div>
      </section>
      <About/>
      <Smartest/>
      <LoginModal
        show={showLoginModal}
        setShow={setShowLoginModal}/>
    </div>
  )
    ;
};

export default Home;