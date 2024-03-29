import { useLocation } from "react-router-dom";
import "./ProductDetails.css";
import React, { useContext, useEffect, useState } from "react";
import { AdaptiMartLogoCart } from "../../Assets";
import Fade from "react-reveal";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShopContext } from "../../context/ShopContext";
import {
  addreview,
  getreviewratingandtotal,
  getreviewslistbyproductid,
} from "../../api/api";
AOS.init();

export default function ProductDetails() {
  const location = useLocation();
  let product = location.state ? location.state.product : null;
  console.log("product", product);

  // let reviewList = [
  //   {
  //     id: 2,
  //     product_id: 1,
  //     user_id: 1,
  //     review: "bad product",
  //     rating: 3,
  //     first_name: "Ateeb",
  //     last_name: "Ahmed",
  //   },
  //   {
  //     id: 3,
  //     product_id: 1,
  //     user_id: 1,
  //     review: "bad product",
  //     rating: 3,
  //     first_name: "Ateeb",
  //     last_name: "Ahmed",
  //   },
  //   {
  //     id: 4,
  //     product_id: 1,
  //     user_id: 1,
  //     review: "bad product",
  //     rating: 3,
  //     first_name: "Ateeb",
  //     last_name: "Ahmed",
  //   },
  //   {
  //     id: 5,
  //     product_id: 1,
  //     user_id: 1,
  //     review: "bad product",
  //     rating: 3,
  //     first_name: "Ateeb",
  //     last_name: "Ahmed",
  //   },
  // ];

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const cartItemCount = cartItems[product.id];
  // Calculate the number of filled stars
  const totalRating = 4.3;
  // const totalReviews = 3434;

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [writingReview, setwritingReview] = useState(false);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to backend)
    setwritingReview(false);
    let reqobj = {
      product_id: product.id,
      user_id: 1,
      review: reviewText,
      rating: rating,
    };
    addreview(reqobj)
      .then((res) => {
        console.log("Review Added", res.data);
        getReviewRatingAndTotal();
        getReviewsListByProductId();
      })
      .catch((err) => {
        console.log("Error fetching top products list:", err);
      });

    console.log("Rating:", rating);
    console.log("Review Text:", reviewText);
  };

  const calculate_stars = (rating) => {
    const stars = [];
    const filledStars = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(
          <span
            key={i}
            className="product_details_star product_details_filled"
          ></span>
        );
      } else {
        stars.push(<span key={i} className="product_details_star"></span>);
      }
    }

    return stars;
  };

  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewList, setReviewList] = useState([]);

  const getReviewRatingAndTotal = () => {
    let product_id = product.id;
    getreviewratingandtotal(product_id)
      .then((res) => {
        console.log("Average Rating and Total Reviews retrieved", res.data);
        setAverageRating(res.data[0].average_rating);
        setTotalReviews(res.data[0].total_reviews);
      })
      .catch((err) => {
        console.log("Error fetching top products list:", err);
      });
  };
  const getReviewsListByProductId = () => {
    let product_id = product.id;
    getreviewslistbyproductid(product_id)
      .then((res) => {
        console.log("Reviews List By Product Id retrieved", res.data);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log("Error fetching top products list:", err);
      });
  };
  useEffect(() => {
    getReviewRatingAndTotal();
    getReviewsListByProductId();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="product_details_box">
        <div className="product_details_info_container">
          <Fade left>
            <img
              src={
                product.image
                  ? "http://localhost:4000/" + product.image
                  : AdaptiMartLogoCart
              }
              alt=""
              className="product_details_info_img"
            />
          </Fade>
          <Fade right>
            <div className="product_details_content_container">
              <div className="product_details_name_header">
                <div className="product_details_name">{product.name}</div>
                <div className="product_details_price">${product.price}</div>
              </div>
              <div className="product_details_stars_container">
                <div className="product_details_stars">
                  {calculate_stars(averageRating)}
                </div>
                <div className="product_details_rating_info">
                  <span className="product_details_total_rating">
                    {averageRating ? averageRating : 0}
                  </span>
                  <span className="product_details_total_reviews">
                    ({totalReviews ? totalReviews : 0})
                  </span>
                </div>
              </div>
              <div className="product_details_count_handler">
                <button
                  className="product_details_count_handler_btn"
                  onClick={() => removeFromCart(product.id)}
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  className="product_details_count_handler_input"
                  value={cartItems[product.id]}
                  onChange={(e) =>
                    updateCartItemCount(Number(e.target.value), product.id)
                  }
                />
                <button
                  className="product_details_count_handler_btn"
                  onClick={() => addToCart(product.id)}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div
                className="product_details_add_to_cart_btn"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
              </div>
              <hr className="product_details_add_to_cart_btn_sep_desc" />
              <div className="product_details_product_description">
                {product.description} Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Possimus repellendus commodi vel beatae modi!
                Amet doloribus temporibus voluptate id dolore ex laborum magni
                iste modi voluptates. Error rem minus id!
              </div>
            </div>
          </Fade>
        </div>

        <div
          className="product_details_reviews_container"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="product_details_reviews_title">
            Ratings and Reviews
          </div>

          <div className="product_details_rating_container">
            <div className="product_details_rating_value">
              {" "}
              {averageRating ? averageRating : 0}
            </div>
            <div className="product_details_stars_container">
              <div className="product_details_stars">
                {calculate_stars(averageRating)}
              </div>
            </div>
            <div className="product_details_rating_total_cust">
              Based on {totalReviews ? totalReviews : 0} reviews
            </div>
          </div>
        </div>
        <hr
          style={{
            margin: "2em 0",
          }}
        />
        {writingReview === false ? (
          <button
            className="product_details_write_review_btn"
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            onClick={(e) => {
              e.preventDefault();
              setwritingReview(true);
            }}
          >
            Write a Review
          </button>
        ) : (
          <div
            data-aos="fade-down"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <div className="product_details_rating_total_cust">Your Review</div>
            <form onSubmit={handleSubmit} className="write_review_form">
              <div className="write_review_rating_stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`product_details_star ${
                      value <= rating ? "product_details_filled" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleStarClick(value)}
                  ></span>
                ))}
              </div>
              <textarea
                className="write_review_textarea"
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                required
              ></textarea>
              <div className="write_review_btn_container">
                <button
                  className="write_review_btn write_review_cancel_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setwritingReview(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="write_review_btn write_review_submit_btn"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="all_reviews_container">
          {reviewList.map((review, index) => (
            <div
              className="review_container"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              {/* <hr
                style={{
                  margin: "2em 0",
                  border: "1px solid black",
                }}
              /> */}
              <div className="review_title">
                {review.first_name + " " + review.last_name}
              </div>
              <div className="product_details_stars_container">
                <div className="product_details_stars">
                  {calculate_stars(review.rating)}
                </div>
              </div>
              <div className="review_description">{review.review}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
