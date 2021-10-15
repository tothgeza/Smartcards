import React from "react";
import "./About.css";

function About() {
  return (
    <>
      <section id="about" className="about">
        <div className="container">
          <div className="row my-5 align-items-center">
            <div className="col">
              <div className="about-img" >
                <img src="assets/img/about-img.jpg" alt="" />
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <div className="about-content ">
                <h2>Attack your weaknesses</h2>
                <p>
                  Brainscape's online flashcards optimize your studying, by repeating harder
                  concepts in the perfect interval for maximum memory retention.
                </p>
                <p>
                  We give you the best solutions to build your small scale
                  business get into larger and wider. We are also provide you
                  the domains and hosting services*
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;