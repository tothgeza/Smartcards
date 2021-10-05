import {IoFolderOpen, IoPencil, IoTrashOutline} from "react-icons/io5";
import {Button, Dropdown, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";
import MyClassService from "../../services/myClass.service";
import Modals from "./Modals/modals";

const ContentHeader = ({activeMyClass, setActiveMyClass, currentUser, setIsActiveMyClass}) => {

  const [isEditMyClassTitleActive, setIsEditMyClassTitleActive] = useState(false);
  const [showDeleteMyClassModal, setShowDeleteMyClassModal] = useState(false);

  const openDeleteMyClassModal = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowDeleteMyClassModal(true);
  }

  const closeDeleteMyClassModal = () => {
    setShowDeleteMyClassModal(false);
  }

  const handleSubmitDeleteMyClass = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await MyClassService.deleteMyClass(activeMyClass.id);
    closeDeleteMyClassModal()
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
    <div className="d-flex align-items-center">
      <div className="p-2 m-2 flex-shrink-1">
        <IoFolderOpen size={"6em"}/>
      </div>
      <div className="p-2 d-flex flex-column flex-fill">
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
                fontSize: "2em", color: "#4b4b4b", fontWeight: "500"
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
          {/* <a href="#0" className="me-3">
                    <BsGearFill className="text-muted my-2" size="1.5em" />
                  </a> */}
          <Dropdown style={{backgroundColor: "none"}}>
            <Dropdown.Toggle id="dropdown-basic" size="sm">
              Edit
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#0"
                             onClick={(event) => showEditMyClassTitleForm(event)}>
                <IoPencil style={{position: "relative", top: "-2px"}}/> Edit Class Name
              </Dropdown.Item>
              <Dropdown.Item href="#0"
                             onClick={(event) => openDeleteMyClassModal(event, activeMyClass)}>
                <IoTrashOutline style={{position: "relative", top: "-2px"}}/>
                Delete this Class
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
        close={closeDeleteMyClassModal}
        submit={handleSubmitDeleteMyClass}
        type={"Class"}
      />
    </div>
  )
}
export default ContentHeader