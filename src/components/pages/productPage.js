import "./style/product-style1.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "https://fakestoreapi.com/products";

const ProductPage = () => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    if (!productList) {
      axios.get(api).then((response) => {
        console.log(response.data);
        setProductList(response.data);
      });
    }
  });

  return (
    <div>
      <h1>Product Page</h1>
      <div clasName="container">
        {productList && productList.length > 0 && (
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Categeory</th>
              <th>Rating</th>
              <th>Price</th>
            </tr>
            {productList.map((product) => (
              <tr>
                {/* <td><a href={product.image}>Image</a></td> */}
                <td>
                  <img
                    src={product.image}
                    alt="Girl in a jacket"
                    width="50"
                    height="60"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.rating.rate}</td>
                <td>₹ {product.price}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};
export default ProductPage;
