import React from 'react'
import './Sign.css';

const SignUp = () => {
    return (
        <div className="container pt-5">
            <div className="card mx-auto mt-5 p-4" style={{ width: "450px" }}>
                <form className="form-sign">
                    <h1 className="h3 mb-5 fw-normal text-center">Please sign in</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
