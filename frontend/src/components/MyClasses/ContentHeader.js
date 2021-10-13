import {IoPencilSharp} from "react-icons/io5";
import {GoTrashcan} from "react-icons/go";
import {BsGearFill} from "react-icons/bs";
import {FcOpenedFolder} from "react-icons/fc";
import {Button, Dropdown, Form, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import MyClassService from "../../services/myClass.service";
import Modals from "./Modals/modals";
import "./contentheader.css"

const ContentHeader = ({activeMyClass, setActiveMyClass, currentUser, setIsActiveMyClass, fetchMyClass}) => {

  const [isEditMyClassTitleActive, setIsEditMyClassTitleActive] = useState(false);
  const [showDeleteMyClassModal, setShowDeleteMyClassModal] = useState(false);

  const openDeleteMyClassModal = (event) => {
    event.preventDefault();
    setShowDeleteMyClassModal(true);
  }

  const handleSubmitDeleteMyClass = async (event) => {
    event.preventDefault();
    await MyClassService.deleteMyClass(activeMyClass.id);
    fetchMyClass()
    setShowDeleteMyClassModal(false);
    setIsActiveMyClass(false);
    setActiveMyClass("");
  }

  const showEditMyClassTitleForm = (event) => {
    event.preventDefault();
    setIsEditMyClassTitleActive(true);
  }

  const handleSubmitEditMyClassTitle = async (event) => {
    event.preventDefault();
    const newMyClassTitle = event.target.newMyClassTitle.value;
    MyClassService.updateMyClassTitle(activeMyClass.id, newMyClassTitle)
      .then(result => setActiveMyClass(result.data));
    setIsEditMyClassTitleActive(false);
  }

  return (
    <div className={"card border-0 rounded-0 mt-0 mb-5 shadow-sm"}>
      <div className="d-flex">
        <div className="flex-shrink-1 m-3 p-4 ">
          <FcOpenedFolder
            size={"6em"}/>
        </div>
        <div className="d-flex flex-column flex-fill mt-3">
          <div className="align-middle">
            {isEditMyClassTitleActive ? (
              <div>
                {/* Edit Class Title Form */}
                <Form onSubmit={(event) => handleSubmitEditMyClassTitle(event)}>
                  <InputGroup className="">
                    <FormControl
                      className="p-0"
                      name="newMyClassTitle"
                      defaultValue={activeMyClass.title}
                      aria-describedby="basic-addon2"
                      style={{
                        fontSize: "2em",
                        color: "#4b4b4b",
                        fontWeight: "500",
                        maxWidth: "450px"
                      }}
                    />
                    <Button variant="outline-secondary" type="submit">
                      Save
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            ) : (
              <div className="">
                <p className="my-0" style={{
                  paddingTop: "1px",
                  paddingBottom: "1px", paddingLeft: "1px",
                  fontSize: "2em", fontWeight: "500"
                }}
                >{activeMyClass.title}</p>
              </div>
            )}
          </div>
          <div>
            <div className="row">
              <div className="col col-sm-auto mb-1">
              <span className="col-6 text-muted" style={{fontSize: "14px"}}>
                created by: {currentUser.username}
              </span>
              </div>
              <div className="col col-sm-auto">
              <span className=" col-6 text-muted" style={{fontSize: "14px"}}>
                created at: <span style={{fontSize: "13px"}}>2021-11-19</span>
              </span>
              </div>
              <div className="col">
              </div>
            </div>
            <Dropdown className="m-0 mt-1 p-0" style={{maxHeight: "30px"}}>
              <Dropdown.Toggle id="dropdown-basic" size="sm" className="border-0 p-0">
                <BsGearFill className="link-icon" size={"1.5em"}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#0"
                               onClick={(event) => showEditMyClassTitleForm(event)}>
                  <div className="d-flex flex-row p-0 m-0"
                       style={{color: "#757575"}}>
                    <IoPencilSharp style={{position: "relative", top: "2px"}}/>
                    <p className="ms-2 mb-0" style={{fontSize: "14px"}}> Edit Class Name</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item href="#0"
                               onClick={(event) => openDeleteMyClassModal(event, activeMyClass)}>
                  <div className="d-flex flex-row p-0 m-0"
                       style={{color: "#757575"}}>
                    <GoTrashcan style={{position: "relative", top: "1px"}}/>
                    <p className="ms-2 mb-0" style={{fontSize: "14px"}}> Delete this Class</p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </div>
        <div className="p-2 flex-shrink-1">
          {/* 3 of 3 */}
        </div>

        {/* Delete MyClass modal */}
        <Modals.deleteModal
          active={activeMyClass}
          show={showDeleteMyClassModal}
          setShow={setShowDeleteMyClassModal}
          submit={handleSubmitDeleteMyClass}
          type={"Class"}
        />
      </div>
    </div>
  )
}
export default ContentHeader