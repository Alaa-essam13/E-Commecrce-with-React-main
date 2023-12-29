import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getOrdersByUser } from '../firebase/firebase'; 
import { auth } from '../firebase/firebase';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userOrders = await getOrdersByUser(user.email);
          console.log('User Orders:', userOrders); // Log userOrders to the console
          setOrders(userOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [auth]);

  return (
    <div className="container mt-5">
      <h2>Order History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Price</th>
            <th>Ids</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            console.log('Order:', order); // Log individual order to the console
            return (
              <tr key={order.orderId}>
                <td>{order.date}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.products ? (
                    order.products.map((product) => (
                      <span>{product.productId},</span>
                    ))
                  ) : (
                    <span>No products</span>
                  )}
                  {/* Here:) */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistory;
