import {
  LandingPageTopProduct1,
  LandingPageTopProduct2,
  LandingPageTopProduct3,
  LandingPageTopProduct4,
  LandingPageTopProduct5,
  LandingPageTopProduct6,
} from "../../Assets";
import Slideshow from "../Slideshow/Slideshow";
import "./ProductsPage.css";

import React, { useState } from "react";

export default function ProductsPage() {
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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of categories per page
  const [filteredProducts, setfilteredProducts] = useState(products);

  const handleClickNext = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredProducts.length / pageSize))
    );
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the products array to get categories for the current page
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <Slideshow />

      <div className="categories_page_top_products_box">
        <div className="categories_page_header">
          <div className="categories_page_header_title">Products</div>

          <input
            type="text"
            placeholder="Search..."
            className="categories_page_header_input"
          />
        </div>

        <div className="top_products_container">
          {currentProducts.map((product) => (
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
              <button className="product_page_infocard_btn">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="categories_page_pagination_buttons">
          <button
            className="categories_page_pagination_btn"
            onClick={handleClickPrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="categories_page_pagination_btn"
            onClick={handleClickNext}
            disabled={endIndex >= filteredProducts.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
