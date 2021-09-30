import React from 'react';
import { Link } from "react-router-dom";
import { IoAlbumsSharp, IoAddOutline, IoSearchOutline } from 'react-icons/io5';

const SideNav = ({ classes }) => {


    return (
        <div className="flex-shrink-0 p-3 side-nav">
            <div className="d-flex align-items-center pb-3 mb-3 border-bottom justify-content-between">
                <span className="fs-6">MY CLASSES ({classes.length}) </span>
                <div className="row">
                    <div className="col px-2">
                        <a href="" className="class-link " style={{ textDecoration: 'none' }}>
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
                    {classes.map((clas) => (
                        <li className="user-pack">
                            {/* <a href="" className="row align-items-center link-pack" style={{ textDecoration: 'none' }}>
                                <div className="pack-icon col-1"><IoAlbumsSharp size={"2em"} /></div>
                                <div className="col pack-title ms-3" style={{ fontSize: "14px", fontWeight: "500" }}>{clas.title}</div>
                            </a> */}
                            <li className="row align-items-center link-pack" style={{ textDecoration: 'none' }}>
                                <Link to={"/content"}>
                                    <div className="pack-icon col-1"><IoAlbumsSharp size={"2em"} /></div>
                                    <div className="col pack-title ms-3" style={{ fontSize: "14px", fontWeight: "500" }}>{clas.title}</div>
                                </Link>
                            </li>
                        </li>
                    ))}
                    {/* <li className="user-pack">
                        <a href="" className="row align-items-center link-pack" style={{ textDecoration: 'none' }}>
                            <div className="pack-icon col-1"><IoAlbumsSharp size={"2em"} /></div>
                            <div className="col pack-title ms-3" style={{ fontSize: "14px", fontWeight: "500" }}>Hello</div>
                        </a>
                    </li>
                    <li className="user-pack">
                        <a href="" className="row align-items-center link-pack" style={{ textDecoration: 'none' }}>
                            <div className="pack-icon col-1" ><IoAlbumsSharp size={"2em"} /></div>
                            <div className="col pack-title ms-3" style={{ fontSize: "14px", fontWeight: "500" }}>React</div>
                        </a>
                    </li>
                    <li className="user-pack">
                        <a href="" className="row align-items-center link-pack" style={{ textDecoration: 'none' }}>
                            <div className="pack-icon col-1"><IoAlbumsSharp size={"2em"} /></div>
                            <div className="col pack-title ms-3" style={{ fontSize: "14px", fontWeight: "500" }}>Java</div>
                        </a>
                    </li> */}
                </ul>
                <div>
                    <a href="" className="row align-items-center ms-2 mb-3 class-link" style={{ textDecoration: 'none' }}>
                        <div className="col-1"><IoAddOutline size={"1.5em"} /></div>
                        <div className="col ms-3" style={{ fontSize: "12px", fontWeight: "500" }}>Create New Class</div>
                    </a>
                    <a href="" className="row align-items-center ms-2 mb-3 class-link" style={{ textDecoration: 'none' }}>
                        <div className="col-1"><IoSearchOutline size={"1.5em"} /></div>
                        <div className="col ms-3" style={{ fontSize: "12px", fontWeight: "500" }}>Find Flashcards</div>
                    </a>
                </div>
            </section>
            <section>
                <div className="border-top my-3"></div>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn align-items-center rounded">
                            Home
                        </button>
                    </li>
                    <li className="mb-1">
                        <a href="" className="row align-items-start border-0">

                            <div className="pack-icon col-1"><IoAlbumsSharp /></div>
                            <p className="my-0 col">Hello</p>
                        </a>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Dashboard
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="">Overview</a></li>
                                <li><a href="#" className="link-dark rounded">Weekly</a></li>
                                <li><a href="#" className="link-dark rounded">Monthly</a></li>
                                <li><a href="#" className="link-dark rounded">Annually</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            Orders
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="link-dark rounded">New</a></li>
                                <li><a href="#" className="link-dark rounded">Processed</a></li>
                                <li><a href="#" className="link-dark rounded">Shipped</a></li>
                                <li><a href="#" className="link-dark rounded">Returned</a></li>
                            </ul>
                        </div>
                    </li>

                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                            Account
                        </button>
                        <div className="collapse" id="account-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="link-dark rounded">New...</a></li>
                                <li><a href="#" className="link-dark rounded">Profile</a></li>
                                <li><a href="#" className="link-dark rounded">Settings</a></li>
                                <li><a href="#" className="link-dark rounded">Sign out</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
        </div>

    )
}

export default SideNav
