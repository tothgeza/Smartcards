import React from 'react';
import {Link} from "react-router-dom";
import {GoPencil} from "react-icons/go";

const Card = ({content, showAnswer, setShowAnswer}) => {
  return (
    <div className={"shadow-sm m-1 h-100"}
      onClick={() => setShowAnswer(showAnswer => !showAnswer)}
         style={{
           backgroundColor: "white",
           borderBottom: "6px solid #0067C0", borderRadius: "10px",
           textDecoration: "none"
         }}>
      <div className="row">
        <div className="col">
          <p className={"mt-3 ms-3"} style={{ size:"18px", border: "1px solid red"}}>
            {showAnswer ? 'Answer' : 'Question'}
          </p>
        </div>
        <div className="col text-end">
          <div className={"mt-3 me-3"} style={{border: "1px solid red"}}>
            <Link to={"/#0"}>
              <GoPencil size={"1.5em"}/>
            </Link>
          </div>
        </div>
      </div>
      <div className="row p-4 h-100 align-items-center">
        {/*{content.answer}*/}
        <h2>{content}</h2>
      </div>
    </div>
  )
    ;
};

export default Card;
