import React from 'react';
import {Link} from "react-router-dom";
import {GoPencil} from "react-icons/go";
import {VscZoomIn, VscZoomOut} from "react-icons/vsc";

const Card = ({content, showAnswer, setShowAnswer, contentStyle, increaseCharSize, decreaseCharSize}) => {

  return (


    <div className={"m-1 h-100"}
         onClick={() => setShowAnswer(showAnswer => !showAnswer)}
         style={{
           backgroundColor: "white",
           borderBottom: `6px solid ${!showAnswer ? "#4CAF50" : "#FF5722"}`,
           borderRadius: "8px",
           textDecoration: "none",
           boxShadow: "rgba(100, 100, 100, 0.25) 0px 2px 4px 1px"
         }}>
      {/* Card header and links*/}
      <div className="row mx-1">
        <div className="col">
          <p className={"mt-3 ms-3"} style={{size: "18px", fontWeight: "500", color: "#BFBFBF"}}>
            {showAnswer ? 'Answer' : 'Question'}
          </p>
        </div>
        <div className="col d-flex justify-content-center my-auto">
          <ul className={"list-group list-group-horizontal m-0 "}>
            <li className="list-group-item border-0">
              <Link to={"/#0"} className={"link-icon"} onClick={(event) => increaseCharSize(event)}>
                <VscZoomIn size={"1.5rem"}/>
              </Link>
            </li>
            <li className="list-group-item border-0">
              <Link to={"/#0"} className={"link-icon"} onClick={(event) => decreaseCharSize(event)}>
                <VscZoomOut size={"1.5em"}/>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col d-flex justify-content-end my-auto">
          <ul className={"list-group list-group-horizontal m-0 "}>
            <li className="list-group-item border-0">
              <Link to={"/#0"}>
                <GoPencil className={"link-icon"} size={"1.5em"}/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Card content*/}
      <div className="row p-4 h-100 align-items-center"
           style={{
             maxHeight: "calc(75vh - 60px)",
             overflowY: "auto"
           }}>
        <div className="col">
          <div className={"mt-0"} style={contentStyle}>{content}</div>
        </div>
      </div>
    </div>
  )
    ;
};

export default Card;
