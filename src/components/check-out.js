import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaPaypal, FaCcVisa, FaCcPaypal } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Image, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addPay } from './cart/rtk/slices/paymnet';
import { placeOrder } from '../firebase/firebase';
import { auth } from '../firebase/firebase';



const CheckoutForm = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];

    const dispatch = useDispatch();


    const totalPrice = cart.reduce((acc, product) => {
        acc += product.product.price * product.quantity;
        return acc;
    }, 0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        companyName: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        paymentMethod: 'cash',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        const selectedPaymentMethod = e.target.value;
        setFormData({
            ...formData,
            paymentMethod: selectedPaymentMethod,
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: '',
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {


        const currentDate = new Date();
        const formattedDate = currentDate.toDateString();
        dispatch(addPay({ totalPrice: totalPrice, date: formattedDate }))



        e.preventDefault();
        const requiredFields = ['firstName', 'lastName', 'country', 'streetAddress', 'city', 'state', 'postalCode', 'phone'];

        if (formData.paymentMethod === 'creditCard') {
            requiredFields.push('cardNumber', 'cardName', 'expiryDate', 'cvv');
        }

        const isValid = requiredFields.every((field) => formData[field].trim() !== '');

        if (!isValid) {
            Swal.fire({
                text: 'There is a field is empty , Please fill it :)',
                icon: 'warning',
                confirmButtonText: 'Got it!',
            });
            return;
        }

        console.log('Form submitted:', formData);

        Swal.fire({
            text: 'Are you sure to confirm the order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, Cancel it',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Confirmed!', 'Your order has been confirmed.', 'success');

                const user = auth.currentUser;
                const user_email = user ? user.email : 'unknown';

                const orderData = {
                    date: formattedDate,
                    totalPrice: totalPrice.toFixed(2),
                    products: cart.map((p) => ({
                        productId: p.product.id,
                    })),
                    user_email,
                };


                placeOrder(orderData);


            }
            else {
                Swal.fire('Cancelled!', 'Your order has been cancelled.', 'info');
            }
            navigate('/home');
        });

    };

    return (


        <div className="container-fluid mt-5">
            <div className="row ">
                <div className="col-md-6 ">
                    {/* <img src={sideImage} alt="Side Image" className="img-fluid h-100" /> */}
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((p) => (
                                <tr key={p.product.id}>
                                    <td><Image src={p.product.image} alt={p.product.title} style={{ width: "100px", height: "100px" }} /> </td>
                                    <td>{p.product.price}$</td>
                                    <td>{p.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5>TotalPrice: {totalPrice.toFixed(2)} $</h5>
                </div>

                <div className="col-md-6 ">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">Check Out </h5>
                            <br />
                            <Form >
                                <Row>
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>First Name*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter first name"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter last name"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group controlId="country">
                                            <Form.Label>Country / Region*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="country"
                                                placeholder="Enter country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="companyName">
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="companyName"
                                                placeholder="Enter company name"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group controlId="streetAddress">
                                    <Form.Label>Street Address*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="streetAddress"
                                        placeholder="House number and street name"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group controlId="city">
                                            <Form.Label>City*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                placeholder="Town / City"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="state">
                                            <Form.Label>State*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                placeholder="Enter state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="postalCode">
                                            <Form.Label>Postal Code*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="postalCode"
                                                placeholder="Enter postal code"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group controlId="phone">
                                    <Form.Label>Phone*</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <br />
                                <Form.Group controlId="paymentMethod">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handlePaymentMethodChange}
                                    >
                                        <option value="cash">Cash on delivery</option>
                                        <option value="creditCard">Credit Card</option>
                                        <option value="paypal">PayPal</option>
                                    </Form.Control>
                                </Form.Group>
                                <br />

                                {formData.paymentMethod === 'creditCard' && (
                                    <>
                                        <p className="card-title" style={{ fontSize: "13px", opacity: "80%" }}>
                                            We accept all major credit cards
                                            <FaPaypal color="#1da1f2" style={{ marginRight: "5px", marginLeft: "10px" }} size={25} />
                                            <FaCcVisa color="#1da1f2" style={{ marginRight: "5px" }} size={25} />
                                            <FaCcPaypal color="#1da1f2" style={{ marginRight: "5px" }} size={25} />
                                        </p>

                                        <Row>
                                            <Col>
                                                <Form.Group controlId="cardNumber">
                                                    <Form.Label>Card Number*</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="cardNumber"
                                                        placeholder="Enter card number"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="cardName">
                                                    <Form.Label>Name of card*</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="cardName"
                                                        placeholder="Enter card name"
                                                        value={formData.cardName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="expiryDate">
                                                    <Form.Label>Expiry Date*</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="expiryDate"
                                                        placeholder="MM/YY"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="cvv">
                                                    <Form.Label>CVV*</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="cvv"
                                                        placeholder="Enter CVV"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <br />
                                    </>
                                )}
                                <center>
                                    <Button type="submit" className="btn-primary btn-block" onClick={handleSubmit}>
                                        Confirm Order
                                    </Button>
                                </center>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CheckoutForm;