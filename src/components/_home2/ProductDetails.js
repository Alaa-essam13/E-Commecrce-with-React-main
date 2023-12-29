import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";

function ProductDetails() {
    const params = useParams();
    const api_url = "https://fakestoreapi.com/products";
    const [product, setProduct] = useState(null); // Set initial state to null

    useEffect(() => {
        fetch(`${api_url}/${params.productId}`)
            .then((response) => response.json())
            .then((product) => setProduct(product));
    }, [params.productId]);

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <Product product={product} showButton={false}/>
    );
}

export default ProductDetails;
