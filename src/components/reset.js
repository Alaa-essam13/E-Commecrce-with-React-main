import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase/firebase";

import sideImage from '../images/forget.png';
function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleResetPassword = () => {
        sendPasswordReset(email);
        if (email!="")
        {
            navigate('/'); 
        }
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div className="container-fluid mt-5">
            <div className="row ">
                <div className="col-md-4">
                    <img src={sideImage} alt="Side Image" className="img-fluid" />
                </div>

                <div className="col-md-7 ">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title ">Reset Your Password</h5>
                            <p>Enter your email and we'll send you a link to reset your password .</p>
                            <br />

                            <form>
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
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block "
                                    onClick={handleResetPassword}
                                >             Send password reset email

                                </button>
                                <br />
                            </form>
                            <div className="mt-2">
                                Don't have an account? <Link to="/register">Register</Link> now.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Reset;