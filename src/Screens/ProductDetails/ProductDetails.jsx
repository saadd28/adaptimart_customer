import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import React, { useContext, useEffect, useState } from "react";
import { AdaptiMartLogoCart } from "../../Assets";
import Fade from "react-reveal";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShopContext } from "../../context/ShopContext";
import {
  addreview,
  getmbi,
  getproductbyid,
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

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [writingReview, setwritingReview] = useState(false);
  const navigate = useNavigate();

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
  let [mbi, setMBI] = useState([]);

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
  const getMBI = () => {
    let reqObj = {
      sku_id: product.id,
    };
    getmbi(reqObj)
      .then((res) => {
        console.log("MBI List retrieved", res.data);
        setMBI((mbi = res.data.top_products));
      })
      .catch((err) => {
        console.log("Error fetching tMBI list:", err);
      });
  };
  useEffect(() => {
    getReviewRatingAndTotal();
    getReviewsListByProductId();
    getMBI();
    // eslint-disable-next-line
  }, []);

  // Function to fetch product details for each ID in the MBI list
  const fetchProductDetails = async () => {
    try {
      const productDetails = await Promise.all(
        mbi.map(async (productId) => {
          const product = await getproductbyid(productId);
          return product;
        })
      );
      return productDetails;
    } catch (error) {
      console.log("Error fetching product details:", error);
      return [];
    }
  };

  let [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setProductDetails((productDetails = await fetchProductDetails()));
      // const productDetails = await fetchProductDetails();
      console.log("Product Details:", productDetails);
      // Now you have product details, you can use them in your UI
    };
    fetchData();
  }, [mbi]);

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
        <div className="mbi_heading">Frequently Bought Together</div>
        <div className="mbi_products_container">
          {productDetails.map((product) => (
            <div
              className="top_products_infocard"
              // style={{
              //   width: "30%",
              // }}
            >
              <img
                // src={product.image}
                src={
                  product.data[0].image
                    ? "http://localhost:4000/" + product.data[0].image
                    : AdaptiMartLogoCart
                }
                alt=""
                className="top_products_infocard_img"
              />

              <div className="top_products_infocard_content_container">
                <div className="top_products_infocard_title">
                  {product.data[0].name}
                </div>
                <div className="top_products_infocard_price">
                  $ {product.data[0].price}
                </div>
              </div>
              <button
                className="product_page_infocard_btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/product-details", {
                    state: {
                      product: product.data[0],
                    },
                  });
                }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
