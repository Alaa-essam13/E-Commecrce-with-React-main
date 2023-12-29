import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from '../firebase/firebase';

import sideImage from '../images/profile.jpg';
const UserProfile = () => {
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdateEmail = async () => {
        try {
            console.log('Updating email:', newEmail);
            await auth.currentUser.updateEmail(newEmail);
            alert('Email updated successfully');
        } catch (error) {
            console.error('Error updating email:', error.message);
            alert('Error updating email. Please try again.');
        }
    };
    

    const handleUpdateName = async () => {
        try {
            await auth.currentUser.updateProfile({
                displayName: newName,
            });
            alert('Name updated successfully');
        } catch (error) {
            console.error('Error updating name:', error.message);
            alert('Error updating name. Please try again.');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await auth.currentUser.updatePassword(newPassword);
            alert('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error.message);
            alert('Error updating password. Please try again.');
        }
    };

    return (
        <div className="container-fluid mt-5">
    <div className="row h-100">

        <div className="col-md-6 h-100">
            <img src={sideImage} alt="Side Image" className="img-fluid h-50" />
        </div>

        <div className="col-md-6 ">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title text-center">User Profile</h5>
                    <br />
                    <div className="mt-3 text-center">
                        <hr className="bg-secondary" />
                    </div>

                    <Form>
                        <Form.Group controlId="newEmail">
                            <Form.Label>New Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter new email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <br/>
                            <Button className="float-end" variant="primary" onClick={handleUpdateEmail}>
                                Update Email
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="newName">
                        <br/>
                            <Form.Label>New Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <br/>
                            <Button className="float-end" variant="primary" onClick={handleUpdateName}>
                                Update Name
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="newPassword">
                        <br/>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <br/>
                            <Button className="float-end" variant="primary" onClick={handleUpdatePassword}>
                                Update Password
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default UserProfile;






