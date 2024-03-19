import {
  LandingPageTopProduct1,
  LandingPageTopProduct2,
  LandingPageTopProduct3,
  LandingPageTopProduct4,
  LandingPageTopProduct5,
  LandingPageTopProduct6,
} from "../../../Assets";
import "./TopProducts.css";

import React from "react";

export default function TopProducts() {
  let products = [
    {
      image: LandingPageTopProduct1,
      name: "Product 1",
      price: 100,
    },
    {
      image: LandingPageTopProduct2,
      name: "Product 2",
      price: 100,
    },
    {
      image: LandingPageTopProduct3,
      name: "Product 3",
      price: 100,
    },
    {
      image: LandingPageTopProduct4,
      name: "Product 4",
      price: 100,
    },
    {
      image: LandingPageTopProduct5,
      name: "Product 5",
      price: 100,
    },
    {
      image: LandingPageTopProduct6,
      name: "Product 6",
      price: 100,
    },
  ];

  return (
    <>
      <div className="top_products_box">
        <div className="top_products_header_container">
          <div className="top_products_heading">Top Products</div>

          <button className="top_products_heading_btn">Shop Now</button>
        </div>

        <div className="top_products_container">
          {products.map((product) => (
            <div className="top_products_infocard">
              <img
                src={product.image}
                alt=""
                className="top_products_infocard_img"
              />

              <div className="top_products_infocard_content_container">
                <div className="top_products_infocard_title">
                  {product.name}
                </div>
                <div className="top_products_infocard_price">
                  $ {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="top_products_shop_now_btn">Shop Now</button>
      </div>
    </>
  );
}
