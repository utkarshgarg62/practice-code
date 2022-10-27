import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "https://fakestoreapi.com/products";

const ProductLists = () => {
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
      <h2>Latest Product</h2>
      <section class="products" id="products">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1 class="heading">
          {" "}
          latest <span>products</span>{" "}
        </h1>

        {productList && productList.length > 0 && (
          <div class="box-container">
            {productList.map((product) => (
              <div class="box">
                <span class="discount">{product.rating.rate}</span>
                <div class="image">
                  <img src={product.image} alt="img" />
                  <div class="icons">
                    {/* <a href="/" class="fas fa-heart">
                      Heart
                    </a> */}
                    <a href="/" class="cart-btn">
                      Buy Now
                    </a>
                    {/* <a href="/" class="fas fa-share">
                      Share
                    </a> */}
                  </div>
                </div>
                <div class="content">
                  <h3>{product.name}</h3>
                  <div class="price">
                    ₹ {product.price}
                    {/* <span>$15.99</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductLists;
