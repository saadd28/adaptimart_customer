import { useNavigate } from "react-router-dom";
import {
  LandingPageCategory1,
  LandingPageCategory2,
  LandingPageCategory3,
} from "../../../Assets";
import "./Categories.css";

import React from "react";

export default function Categories() {
  const navigate = useNavigate();
  return (
    <>
      <div className="categories_box">
        <div className="categories_heading">Categories</div>

        <div className="categories_container">
          <div className="categories_left_column">
            <div className="categories_left_column_infocard">
              <img
                src={LandingPageCategory1}
                alt=""
                className="categories_left_column_infocard_img"
              />

              <div className="categories_left_column_infocard_title">
                King Mattress
              </div>
            </div>
            <div className="categories_left_column_infocard">
              <img
                src={LandingPageCategory2}
                alt=""
                className="categories_left_column_infocard_img"
              />

              <div className="categories_left_column_infocard_title">
                Queen Mattress
              </div>
            </div>
          </div>

          <div className="categories_right_column_infocard">
            <img
              src={LandingPageCategory3}
              alt=""
              className="categories_right_column_infocard_img"
            />

            <div className="categories_right_column_infocard_content_container">
              <div className="categories_right_column_infocard_title">
                King Mattress
              </div>

              <button
                className="categories_right_column_infocard_button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/categories");
                }}
              >
                All Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
