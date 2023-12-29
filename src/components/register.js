import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import sideImage from '../images/signup.png';
import { FaFacebook, FaTwitter, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import {
    auth,
    registerWithEmailAndPassword,
} from "../firebase/firebase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const toggleCPasswordVisibility = () => {
        setIsCPasswordVisible(!isCPasswordVisible);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/home');
    }, [user, loading]);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-5">
                    <img src={sideImage} alt="Side Image" className="img-fluid h-100" />
                </div>

                <div className="col-md-7">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign up</h5>
                            <br />
                            <div className="icons">
                                <center >
                                    <a href="https://www.Google.com/" target="_blank" rel="noopener noreferrer">
                                        <button type="button" className="btn btn-outline-primary w-100 mb-2">
                                            <FaGoogle color="#dc4e41" />  Continue With Google
                                        </button>
                                    </a>
                                </center>

                                <center>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                        <button type="button" className="btn btn-outline-primary w-100">
                                            <FaTwitter color="#1da1f2" /> Continue With Twitter
                                        </button>
                                    </a>
                                </center>

                            </div>

                            <div className="mt-3 text-center">
                                <hr className="bg-secondary" />
                            </div>

                            <form>
                                <div className="form-group">
                                    <label>Full name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <br />
                                {/* email */}
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <br />
                                {/* Password */}
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                onClick={togglePasswordVisibility}
                                                required
                                            >
                                                {isPasswordVisible ? <FaEyeSlash color="#007bff" /> : <FaEye color="#007bff" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <div className="input-group">
                                        <input
                                            type={isCPasswordVisible ? 'text' : 'password'}
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                onClick={toggleCPasswordVisibility}
                                            >
                                                {isCPasswordVisible ? <FaEyeSlash color="#007bff" /> : <FaEye color="#007bff" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="agreementCheckbox"
                                    />
                                    <label className="form-check-label" htmlFor="agreementCheckbox">
                                        Agree to our <a target='_blank' href='https://signup.com/Terms'>terms of use</a> and <a target='_blank' href='https://www.signupgenius.com/about/privacy.cfm'>privacy policy</a>
                                    </label>
                                </div>
                                <br />
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block "
                                    onClick={() => registerWithEmailAndPassword(name, email, password, confirmPassword)}
                                >
                                    Sign Up
                                </button>
                                <br />
                            </form>
                            <div className="mt-2">
                                Already have an account? <Link to="/">Login</Link> now.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Register;









