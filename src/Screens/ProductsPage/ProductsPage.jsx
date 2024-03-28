import { useNavigate } from "react-router-dom";
import { AdaptiMartLogoCart } from "../../Assets";
import Slideshow from "../Slideshow/Slideshow";
import "./ProductsPage.css";

import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function ProductsPage() {
  let products = [
    {
      id: 1,
      name: "Classic Mattress",
      image: "image_1711587039390_Classic Mattress.png",
      description: "Classic Mattress",
      overall_discount: 0,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T00:50:39.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 2,
      name: "Euro Top Mattress",
      image: "image_1711587107411_Euro Top Mattress.png",
      description: "Euro Top Mattress",
      overall_discount: 0,
      item_discount: 0,
      price: 500,
      unit_price: 500,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T00:51:47.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Jack",
    },
    {
      id: 3,
      name: "Classic Mattress",
      image: "image_1711600734677_Classic Mattress.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:38:54.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 4,
      name: "Classic Mattress",
      image: "image_1711600739287_Classic Mattress.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:38:59.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 5,
      name: "Classic Mattress",
      image: "image_1711600758549_Classic Mattress.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:39:18.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 6,
      name: "Firm Mattress",
      image: "image_1711600794981_Firm Mattress.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:39:55.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 7,
      name: "Plush Mattress",
      image: "image_1711600824746_Plush Mattress.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:40:24.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 8,
      name: "Medium Hybrid Mattress",
      image: "image_1711600861274_Medium Hybrid Mattress.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:41:01.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 9,
      name: "King Size Mattress",
      image: "image_1711600881460_matress_1.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:41:21.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
    {
      id: 10,
      name: "Queen Size Mattress",
      image: "image_1711600896343_matress_3.png",
      description: "Top Quality",
      overall_discount: null,
      item_discount: 0,
      price: 100,
      unit_price: 100,
      category_id: 1,
      damage_status: 0,
      action_type: 1,
      created_on: "2024-03-28T04:41:36.000Z",
      edited_on: null,
      category_name: "Mattresses",
      supplier_name: "Adam",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of categories per page
  const [
    filteredProducts,
    // setfilteredProducts
  ] = useState(products);
  const navigate = useNavigate();

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
        <div
          className="categories_page_header"
          data-aos="fade-down"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="categories_page_header_title">Products</div>

          <input
            type="text"
            placeholder="Search..."
            className="categories_page_header_input"
          />
        </div>

        <div className="top_products_container">
          {currentProducts.map((product) => (
            <div
              className="top_products_infocard"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <img
                // src={product.image}
                src={
                  product.image
                    ? "http://localhost:4000/" + product.image
                    : AdaptiMartLogoCart
                }
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
              <button
                className="product_page_infocard_btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/product-details", {
                    state: {
                      product: product,
                    },
                  });
                }}
              >
                View Product
              </button>
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
