import { Link } from 'react-router-dom';
import { setStr } from '../components/cart/rtk/slices/searchSlice';
import { useDispatch } from "react-redux";
import sideImage from '../images/Logo.png';
import { auth, db, logout } from "../firebase/firebase";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function Nav() {


    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {

        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        fetchUserName();
        setIsLoggedIn(true);
    }, [user, loading, navigate]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };


    const handleLogoutConfirmation = () => {
        Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">
                    <img src={sideImage} style={{ width: "70px" }}></img>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home2">
                                Home2
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact-us
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/order-history">
                                Orders History
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/user-profile">
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { dispatch(setStr(e.target.value)) }} />
                    </form>

                    
                    {isLoggedIn ? (
                        <button className="btn btn-outline-danger" onClick={handleLogoutConfirmation}>
                            Logout
                        </button>
                    ) : (
                        <Link className="btn btn-outline-success" to="/">
                            Login
                        </Link>
                    )}

                    

                </div>
            </div>
        </nav>
    );
}

export default Nav;
