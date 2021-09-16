import React, {useState, useRef} from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import './Sign.css';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

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
                    props.history.push("/");
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
        <div className="col-md-12">
            <div className="card mx-auto mt-5 p-4" style={{width: "350px"}}>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card mb-3"
                />
                <h1 className="h3 mb-4 fw-normal text-center">Please sign in</h1>
                <Form onSubmit={handleLogin} ref={form} className="form-sign mx-3">

                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control mb-2"
                            name="username"
                            // placeholder="name@example.com"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control mb-2"
                            name="password"
                            // placeholder="Password"
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
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    )
}

export default Login;
