import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../../components/rating/Rating";
import "./single-product.css";
import ProductDescription from "./ProductDescription";
import { products } from "../../data/products";
import Category from "../../components/category/Category";
import HeadingTitle from "../../components/heading-title/HeadingTitle";
import { addToCart } from "../../components/cart/rtk/slices/cart-slice";
import { useDispatch } from "react-redux";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const product = products.find((p) => p.id === +id);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value >= 1 && value <= 10 ? value : 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addToCart({ product, quantity }));
      navigate("/home");
    }
  };

  return (
    <div className="single-product">
      <div className="product-wrapper">
        <div className="product-image-wrapper">
          <img src={product?.image} alt="" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product?.title}</h1>
          <Rating rating={product?.rating} reviews={product?.reviews} />
          <div className="product-price">${product?.price}</div>
          <div className="product-add-to-cart">
            <div> Quantity </div>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ border: '1px solid #ccc', padding: '5px', marginRight: '10px' }}
            />
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ProductDescription />
      <HeadingTitle title="   Suggestions " />
      <Category />
    </div>
  );
};

export default SingleProduct;
