import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img src={props.product.image} class="slide-img" alt={props.product.title} />
      <div className="card-body">
        <h5 className="card-title">{props.product.title}</h5>
        <p className="card-text">Price: ${props.product.price}</p>
        {props.showButton && (
          <Link className="btn btn-primary" to={`/products/${props.product.id}`}>
            Show Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default Product;
