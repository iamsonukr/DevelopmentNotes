import { useEffect, useState } from "react";
import { addItem, removeItem } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

const Product = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const products = useSelector((state) => state.products.items)
    console.log(products)

    //   const product = {
    //     id: 1,
    //     name: "Wireless Headphones",
    //     price: 2999,
    //     image: "https://images.pexels.com/photos/33915459/pexels-photo-33915459.jpeg",
    //   };

    if (!products) {
        return <>Loading</>
    }
    return (
        <div className="product-page">
            {
                products?.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.thumbnail} alt={product.name} />

                        <h2>{product.brand}</h2>
                        <p className="price">₹{product.price}</p>

                        <button onClick={() => dispatch(addItem(product))}>
                            Add to Cart
                        </button>
                        <button onClick={() => dispatch(removeItem(product.id))}>
                            Remove
                        </button>
                    </div>
                ))

            }

        </div>
    );
};

export default Product;
