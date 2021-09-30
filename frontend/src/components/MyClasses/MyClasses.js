import React, { useState, useEffect, useRef } from 'react';
import UserService from "../../services/user.service";
import SideNav from "./SideNav";
import Content from "./Content";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoAlbumsSharp, IoAddOutline, IoSearchOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { Modal } from 'react-bootstrap';


const MyClass = () => {
    const [myClasses, setMyClasses] = useState([]);
    const [activeClass, setActiveClass] = useState({
        decks: []
    });
    const [isClassActive, setIsClassActive] = useState(false);
    const itemsRef = useRef([]);
    const [showCreateClassModal, setShowCreateClassModal] = useState(false);
    const [showDeleteClassCaution, setShowDeleteClassCaution] = useState(false);
    const [displayDeleteButton, setDisplayDeleteButton] = useState("notdisplayed");
    const [beDeleted, setBeDeleted] = useState("");

    const handleCreateClassModal = (event) => {
        event.preventDefault();
        setShowCreateClassModal(true);
    }

    const closeCreateClassModal = () => {
        setShowCreateClassModal(false);
    }

    const handleDeleteClassCaution = (event, myclass_id) => {
        event.preventDefault();
        event.stopPropagation();
        setBeDeleted(myclass_id);
        setShowDeleteClassCaution(true);
    }

    const closeDeleteClassCaution = () => {
        setBeDeleted("");
        setShowDeleteClassCaution(false);
    }

    const showDeleteButton = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // event.target.addClass("displayed");
        // console.log(event.target.children.item(2).className);
        // event.target.children.item(2).className.replace("notdisplayed", "displayed");
        if (event.target.children.item(2)) {
            event.target.children.item(2).style.display = "flex";
        }
        // console.log(event.target.className);
        // setDisplayDeleteButton("displayed");
    }

    const hideDeleteButton = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.children.item(2)) {
            event.target.children.item(2).style.display = "none";
        }
        // setDisplayDeleteButton("notdisplayed");
    }

    useEffect(() => {
        fetchClass();
    }, []);

    const fetchClass = async () => {
        const result = await UserService.getMyClasses();
        console.log('Start setting..')
        setMyClasses(result.data);
    };

    const classHandling = (e, myclass_id) => {
        e.preventDefault();
        const mc = myClasses.filter((myClass) => {
            return myClass.id === myclass_id;
        })[0]
        setActiveClass(mc)
        setIsClassActive(true);
    }
    const deleteHandling = (e) => {
        e.stopPropagation();
        console.log('Start deleting...')
        UserService.deleteMyClass(beDeleted);
        setBeDeleted("");
        console.log('Start fetching...')
        fetchClass();

    }
    const handleSubmit = (event) => {
        closeCreateClassModal(event);
        const title = event.target.newClassName.value;
        console.log('Start creating...')
        UserService.createMyClass(title);
        console.log('Start fetching...')
        fetchClass();

    }

    return (
        <main>
            <div className="flex-shrink-0 p-3 side-nav" >
                <div className="d-flex align-items-center pb-3 mb-3 border-bottom justify-content-between">
                    <span className="fs-6">MY CLASSES ({myClasses.length}) </span>
                    <div className="row">
                        <div className="col px-2">
                            <a href=""
                                className="class-link"
                                style={{ textDecoration: 'none' }}
                                onClick={(event) => handleCreateClassModal(event)}>
                                <div className="col "><IoAddOutline size={"2em"} /></div>
                            </a>
                        </div>
                        <div className="col px-2">
                            <a href="" className="class-link " style={{ textDecoration: 'none' }}>
                                <div className="col "><IoSearchOutline size={"2em"} /></div>
                            </a>
                        </div>
                    </div>
                </div>

                <section className="px-4 mb-5">
                    <ul className="list-unstyled user-packs">
                        {myClasses.map((myclass, index) => (
                            <li className="user-pack row"
                                // onMouseEnter={(event) => showDeleteButton(event)}
                                // onMouseLeave={(event) => hideDeleteButton(event)}
                                key={myclass.id}>
                                <a href="" className="row col align-items-center link-pack pe-0"
                                    id={index}
                                    style={{ textDecoration: 'none' }}

                                    onClick={(e) => classHandling(e, myclass.id)} >
                                    <div className="pack-icon col-1"><IoAlbumsSharp size={"2em"} /></div>
                                    <div className="col pack-title ms-3 pe-0" style={{ fontSize: "14px", fontWeight: "500" }}>{myclass.title}</div>
                                </a>
                                <div className="displayed col-1 ps-0 ">
                                    <a href=""
                                        onClick={(e) => handleDeleteClassCaution(e, myclass.id)}>
                                        <IoCloseCircleOutline size={"1.5em"} />
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <a href=""
                            className="row align-items-center ms-2 mb-3 class-link"
                            style={{ textDecoration: 'none' }}
                            onClick={(event) => handleCreateClassModal(event)}>
                            <div className="col-1"><IoAddOutline size={"1.5em"} /></div>
                            <div className="col ms-3" style={{ fontSize: "12px", fontWeight: "500" }}>Create New Class</div>
                        </a>
                        <a href="" className="row align-items-center ms-2 mb-3 class-link" style={{ textDecoration: 'none' }}>
                            <div className="col-1"><IoSearchOutline size={"1.5em"} /></div>
                            <div className="col ms-3" style={{ fontSize: "12px", fontWeight: "500" }}>Find Flashcards</div>
                        </a>
                    </div>
                </section>

            </div>
            {/* <div className="b-example-divider"></div> */}
            {/* {
                isClassActive && */}
            <div>
                {/* <div className="container justify-content-md-center">
                    <div className="row">
                        <div classname="col-sm">
                            <div>
                                <IoAlbumsSharp size={"8em"} />
                                <p></p>
                            </div>
                        </div>
                        <div className="col-sm">
                            <h2>
                                {activeClass.title}
                            </h2>
                        </div>
                    </div>
                </div> */}
                <div className="container">
                    <div className="row" stayle={{ height: "300px !important" }}>
                        <div className="col">
                            <IoAlbumsSharp size={"8em"} />
                        </div>
                        <div className="col-6">
                            <h2>
                                {activeClass.title}
                            </h2>
                        </div>
                        <div className="col">
                            3 of 3
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            1 of 3
                        </div>
                        <div className="col-5">
                            2 of 3 (wider)
                        </div>
                        <div className="col">
                            3 of 3
                        </div>
                    </div>
                </div>

                {/* <div className="">
                    <div>
                        {activeClass.decks.map((deck) => (
                            <div key={deck.id}>
                                {deck.title}
                            </div>

                        ))
                        }
                        {activeClass.decks.map((deck) => (
                            deck.cards.map((card) => (
                                <div key={card.id}>
                                    <p>{card.question}</p>
                                    <p>{card.answer}</p>
                                </div>
                            ))
                        ))
                        }

                    </div>
                </div> */}
            </div>
            {/* } */}
            {/* Create new myclass modal */}
            <Modal show={showCreateClassModal}>
                <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
                    <button type="button" className="btn-close" onClick={(event) => closeCreateClassModal(event)}></button>
                    <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Create New Class</h3>
                </div>
                <div className="modal-body">
                    <p className="text-center text-muted">A Class is a set of Flashcards, grouped into Decks</p>
                    <form className="text-center" onSubmit={handleSubmit}>
                        <input className="mb-3" type="text" name="newClassName" style={{ width: "80%", height: "40px", fontSize: "18px" }} />
                        <label htmlFor=""
                            style={{ fontSize: "12px" }}>Enter the title of your new class above</label>
                        <button type="submit" className="btn btn-primary mx-auto mt-3 mb-2" style={{ display: "block" }}>Continue</button>
                    </form>
                </div>
            </Modal>

            {/* Delete class modal */}
            <Modal show={showDeleteClassCaution}>
                <div className="modal-header d-flex flex-column pb-0" style={{ borderBottom: "0 none" }}>
                    <button type="button" className="btn-close" onClick={(event) => closeDeleteClassCaution(event)}></button>
                    <h3 className="modal-title text-center" id="addClassModalLabel" style={{ display: "block" }}>Caution</h3>
                </div>
                <div className="modal-body">
                    <p className="text-center text-muted">You are about to remove the React class from your library. Are you sure that you wish to proceed?</p>
                    <div className="row text-center justify-content-md-center mt-4 mb-3">
                        <button type="button"
                            className="btn btn-primary my-auto col-4"
                            style={{ display: "block" }}
                            onClick={(event) => closeDeleteClassCaution(event)}
                        >Cancel</button>

                        <a href=""
                            className="col-4 my-auto"
                            style={{}}
                            onClick={(event) => deleteHandling(event)}>Yes, remove class</a>
                    </div>
                </div>
            </Modal>

        </main >
    );
};

export default MyClass;
