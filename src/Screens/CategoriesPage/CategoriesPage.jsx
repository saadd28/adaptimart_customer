import {
  LandingPageTopProduct1,
  LandingPageTopProduct2,
  LandingPageTopProduct3,
  LandingPageTopProduct4,
  LandingPageTopProduct5,
  LandingPageTopProduct6,
} from "../../Assets";
import Slideshow from "../Slideshow/Slideshow";
import "./CategoriesPage.css";

import React, { useState } from "react";

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      image: LandingPageTopProduct1,
      name: "Category 1",
    },
    {
      id: 2,
      image: LandingPageTopProduct2,
      name: "Category 2",
    },
    {
      id: 3,
      image: LandingPageTopProduct3,
      name: "Category 3",
    },
    {
      id: 4,
      image: LandingPageTopProduct4,
      name: "Category 4",
    },
    {
      id: 5,
      image: LandingPageTopProduct5,
      name: "Category 5",
    },
    {
      id: 6,
      image: LandingPageTopProduct6,
      name: "Category 6",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of categories per page
  const [
    filteredCategories,
    // setfilteredCategories
  ] = useState(categories);

  const handleClickNext = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredCategories.length / pageSize))
    );
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the products array to get categories for the current page
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  return (
    <>
      <Slideshow />
      <div className="categories_page_top_products_box">
        <div className="categories_page_header">
          <div className="categories_page_header_title">Categories</div>

          <input
            type="text"
            placeholder="Search..."
            className="categories_page_header_input"
          />
        </div>

        <div className="top_products_container">
          {currentCategories.map((category) => (
            <div key={category.id} className="top_products_infocard">
              <img
                src={category.image}
                alt=""
                className="top_products_infocard_img"
              />

              <div className="top_products_infocard_content_container">
                <div className="top_products_infocard_title">
                  {category.name}
                </div>
                {/* <div className="top_products_infocard_price">
                  $ {category.price}
                </div> */}
              </div>
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
            disabled={endIndex >= filteredCategories.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
