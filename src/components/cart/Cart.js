import { Button, Container, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clear, deleteFromCart } from "../cart/rtk/slices/cart-slice";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


function Cart() {
    var t = 0;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const totalPrice = cart.reduce((acc, product) => {
        acc += product.product.price * product.quantity;
        return acc;
    }, 0);

    const navigate = useNavigate();

    const handlePay = () => {
        Swal.fire({
            title: 'Order Confirmation',
            text: 'Are you sure you want to Confirm the order?',
            icon: 'question',
            showCancelButton: true,
             cancelButtonColor: '#d33',
             confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
               
                navigate("/checkout", { state: { cart } });
            }
            else
            {
                navigate("/home");
            }

            //refresh the page of cart
            window.location.reload();

        });
      };

    return (
        <Container>
            <h1 className="py-5" style={{ textAlign: 'left', color: '#333', fontSize: '2em', fontFamily: 'Arial, sans-serif', marginTop: '10px' }}>
                Shopping Cart
            </h1>
            <Button variant="primary" className="mb-3 " onClick={() => dispatch(clear())}>Clear your Cart</Button>
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((p) => (
                        <tr key={p.product.id}>
                            <td>{p.product.id}</td>
                            <td><Image src={p.product.image} alt={p.product.title} style={{ width: "100px", height: "100px" }} /> </td>
                            <td>{p.product.price}$</td>
                            <td>{p.quantity}</td>
                            <td>
                                <Button variant="danger" onClick={() => dispatch(deleteFromCart(p))}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h5>TotalPrice: {totalPrice.toFixed(2)}</h5>
            <Button variant="success" onClick={handlePay}>Confirm Order</Button>
        </Container>
    )
}

export default Cart;
