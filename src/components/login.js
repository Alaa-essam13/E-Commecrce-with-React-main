import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaFacebook, FaTwitter, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';

import sideImage from '../images/login.jpeg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate('/home');
    }, [user, loading, navigate]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row h-100">

                <div className="col-md-6 h-100">
                    <img src={sideImage} alt="Side Image" className="img-fluid h-100" />
                </div>

                <div className="col-md-6 ">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In Page</h5>
                            <br/>
                            
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
                                {/* email */}
                                <div className="form-group">
                                    <label>User name or Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <br/>
                                {/* Password */}
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                onClick={togglePasswordVisibility}
                                            >
                                                {isPasswordVisible ? <FaEyeSlash color="#007bff" /> : <FaEye color="#007bff" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                {/* Forget */}
                                <div className="form-group text-lg-end">
                                    <Link to="/reset">Forgot Password?</Link>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block "
                                    onClick={() => logInWithEmailAndPassword(email, password)}
                                >
                                    Sign in
                                </button>
                                <br/>
                            </form>
                            <div className="mt-2">
                                Don't have an account? <Link to="/register">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
