import React, {useState, useRef} from 'react'
import AuthService from "../../../services/auth.service";

import './loginmodal.css';
import {Modal} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const SignUpModal = ({props, show, setShow}) => {

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      // .matches(/.*[A-Z].*[A-Z].*[0-9].*[0-9]/, 'Password must contains at least 2*[A-Z], 2*[0-9]')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    AuthService.register(data.username, data.email, data.password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      })
    // console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className={"p-0 m-0"}
      dialogClassName="modal-60w"
    > <ModalHeader className="d-flex flex-column px-4 pb-0"
                   style={{borderBottom: "0 none", backgroundColor: "#ECF6FF"}}>
      <button type="button" className="btn-close"
              onClick={() => setShow(false)}/>
    </ModalHeader>
      <div className="modal-body px-4}"
           style={{backgroundColor: "#ECF6FF"}}>
        {/*<div className="col-md-12">*/}
        <div className=" mx-auto p-4 pt-0 login" style={{width: "350px"}}>
            {/*<img*/}
            {/*  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"*/}
            {/*  alt="profile-img"*/}
            {/*  className="profile-img-card mb-3"*/}
            {/*/>*/}
          <h3 className="mb-4 mt-2 text-center" style={{fontWeight: "700"}}>Sign up</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="form-sign mx-3 mt-5">
            {!successful && (
              <div>
                <div className="mb-3">
                  <label className="form-label text-secondary mb-0">Username</label>
                  <input
                    name="username"
                    type="text"
                    {...register('username')}
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  />
                  {!errors.username &&
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  }
                  <div className="invalid-feedback">{errors.username?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary mb-0">Email</label>
                  <input
                    name="email"
                    type="text"
                    {...register('email')}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}

                  />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary mb-0">Password</label>
                  <input
                    name="password"
                    type="password"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary mb-0">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>

                <div className="mt-4 mb-3 form-check">
                  <input
                    name="acceptTerms"
                    type="checkbox"
                    {...register('acceptTerms')}
                    className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''
                    }`}
                  />
                  <label htmlFor="acceptTerms" className="form-check-label text-muted" style={{fontSize: "14px"}}>
                    I have read and agree to the Terms
                  </label>
                  <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                </div>

                <div className="mt-5 mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Sign up
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="mb-3">
                <div className={`text-center ${successful ? "alert alert-success" : "alert alert-danger"}`}
                     role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </Modal>

  )
}

export default SignUpModal;
