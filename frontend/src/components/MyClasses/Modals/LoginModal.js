import React, {useState, useRef} from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../../services/auth.service";

import './loginmodal.css';
import {FormControl, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import ModalHeader from "react-bootstrap/ModalHeader";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const LoginModal = ({props, show, setShow}) => {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          // props.history.push("/myclass");
          history.push("/myclass");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className={"p-0 m-0"}
      dialogClassName="modal-60w"
    > <ModalHeader className="d-flex flex-column px-4 pb-0"
                   style={{borderBottom: "0 none", backgroundColor: "#E0E7FF"}}>
      <button type="button" className="btn-close"
              onClick={() => setShow(false)}/>
    </ModalHeader>
      <div className="modal-body px-4}"
           style={{ backgroundColor: "#E0E7FF"}}>
        {/*<div className="col-md-12">*/}
          <div className=" mx-auto mx-0 p-4 pt-0 login" style={{width: "350px"}}>
            {/*<img*/}
            {/*  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"*/}
            {/*  alt="profile-img"*/}
            {/*  className="profile-img-card mb-3"*/}
            {/*/>*/}
            <h3 className="mb-4 mt-2 text-center" style={{fontWeight: "700"}}>Login</h3>
            <Form onSubmit={handleLogin} ref={form} className="form-sign mx-3 mt-5">

              <div className="mb-3">
                <label className="form-label text-secondary" htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control mb-2"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary" htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control mb-2"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="mt-5 mb-3">
                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"/>
                  )}
                  <span>Log in</span>
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
          </div>
        {/*</div>*/}

      </div>
    </Modal>

  )
}

export default LoginModal;
