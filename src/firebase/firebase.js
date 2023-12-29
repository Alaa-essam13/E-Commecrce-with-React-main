import 'firebase/auth'; import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, sendPasswordResetEmail, signOut,
} from "firebase/auth";
import {
    getFirestore, collection, addDoc,
} from "firebase/firestore";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { getDocs, query, where} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCmEMhkNGIeHbpmU6zpeI_dHQ18qZI4jmo",
    authDomain: "e-commerceapp-f27bf.firebaseapp.com",
    databaseURL: "https://e-commerceapp-f27bf-default-rtdb.firebaseio.com",
    projectId: "e-commerceapp-f27bf",
    storageBucket: "e-commerceapp-f27bf.appspot.com",
    messagingSenderId: "650469200942",
    appId: "1:650469200942:web:cba7f932429eca45323bbf",
    measurementId: "G-S1WR2Q1FB9"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        if (email == "" || password == "") {
            Swal.fire({
                text: 'There is a field is empty , Please fill it :)',
                icon: 'warning',
                confirmButtonText: 'Got it!',
            }); 
        }
        else {

            await signInWithEmailAndPassword(auth, email, password);
        }
    } catch (err) {
        console.error(err);
        // alert(err.message);
        Swal.fire({
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Got it!',
          });

    }
};
const registerWithEmailAndPassword = async (name, email, password, confirmPassword) => {


    try {
        if (email == "" || name == "") {
            Swal.fire({
                text: 'There is a field is empty , Please fill it :)',
                icon: 'warning',
                confirmButtonText: 'Got it!',
            });

        }
        else {
            if (password == confirmPassword) {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                // const user = res.user;
                // await addDoc(collection(db, "users"), {
                //     uid: user.uid,
                //     name,
                //     authProvider: "local",
                //     email,
                // });
            }
            else {
                Swal.fire({
                    text: "Passwords don't match , Check Again :(",
                    icon: 'warning',
                    confirmButtonText: 'Got it!',
                });
            }
        }

    } catch (err) {
        console.error(err);
        Swal.fire({
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Got it!',
          });
    }
};
const sendPasswordReset = async (email) => {
    try {
        if (email=="")
        {
            Swal.fire({
                text: 'The field of Email is empty , Please fill it :)',
                icon: 'warning',
                confirmButtonText: 'Got it!',
            });
        }
        else
        {
            await sendPasswordResetEmail(auth, email);
            Swal.fire({
                text: "Password reset link sent!",
                icon: 'success',
                confirmButtonText: 'Got it!',
              });
        }
        
    } catch (err) {
        console.error(err);
        Swal.fire({
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Got it!',
          });
    }
};
const logout = () => {
    signOut(auth);
};


const placeOrder = async (orderData) => {
    try {
        const orderRef = await addDoc(collection(db, 'orders'), orderData);
        console.log('Order placed successfully with ID:', orderRef.id);
        return orderRef.id;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

const getOrdersByUser = async (userEmail) => {
    try {
      const ordersCollection = collection(db, 'orders');
  
      const userOrdersQuery = query(
        ordersCollection,
        where('user_email', '==', userEmail)
      );
  
      const snapshot = await getDocs(userOrdersQuery);
  
      const orders = [];
  
      snapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          orderId: doc.id,
          date: data.date,
          totalPrice: data.totalPrice,
        });
      });
  
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    placeOrder,
    getOrdersByUser
};