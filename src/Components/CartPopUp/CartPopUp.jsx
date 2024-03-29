import "./CartPopUp.css";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { gettopproducts } from "../../api/api";
import { ShopContext } from "../../context/ShopContext";
import { AdaptiMartLogoCart } from "../../Assets";
import Fade from "react-reveal";

const disableScrollOnOpen = () => {
  document.body.style.overflow = "hidden";
};
const disableScrollOnClose = () => {
  document.body.style.overflow = "auto";
};

export default function CartPopUp({ cartpopup, setcartpopup }) {
  const navigate = useNavigate();

  let [products, setProducts] = useState([]);

  const getProducts = () => {
    gettopproducts()
      .then((res) => {
        console.log("Products list retrieved in MOdal", res.data);
        setProducts((products = res.data));
      })
      .catch((err) => {
        console.log("Error fetching products list:", err);
      });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const handleCheckout = () => {
    // Filter products with non-zero quantities
    const productsInCart = Object.keys(cartItems)
      .filter((itemId) => cartItems[itemId] > 0)
      .map((itemId) => {
        const product = products.find((prod) => prod.id === Number(itemId));
        return {
          ...product,
          quantity: cartItems[itemId],
        };
      });

    // console.log("checkout_products", productsInCart);

    navigate("/checkout", {
      state: {
        products_list: productsInCart,
      },
    });
  };
  const {
    cartItems,
    getTotalCartAmount,
    checkout,
    addToCart,
    removeFromCart,
    updateCartItemCount,
  } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const freeShippingThreshold = 199;
  const RemainingAmount = freeShippingThreshold - totalAmount;
  console.log("CartItems in MOdal", cartItems);
  // const progress = 50;
  const progress = (totalAmount / freeShippingThreshold) * 100;
  return (
    <>
      <Modal
        className={"cart_popup_container"}
        overlayClassName="modal_Overlay"
        onAfterOpen={disableScrollOnOpen}
        onAfterClose={disableScrollOnClose}
        isOpen={cartpopup}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          setcartpopup(false);
          console.log("cartpopup", cartpopup);
        }}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <div className="cart_popup_box">
          <div className="cart_popup_upper_box">
            <Fade top>
              <div className="cart_popup_header">
                <div className="cart_popup_title">Cart</div>

                <button
                  className="cart_popup_close_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setcartpopup(false);
                  }}
                >
                  X
                </button>
              </div>

              <div className="cart_popup_progress_container">
                {RemainingAmount >= 0 ? (
                  <div className="cart_popup_progress_text">
                    You're ${RemainingAmount} away from free shipping
                  </div>
                ) : (
                  <div className="cart_popup_progress_text">Free Shipping!</div>
                )}

                <div className="progress_bar_container">
                  <div
                    className="progress_bar"
                    style={{ width: `${progress}%` }}
                    // style={{ width: 50 }}
                  ></div>
                </div>
              </div>
            </Fade>

            <div className="cart_popup_products_container">
              {/* eslint-disable-next-line */}
              {products.map((product, index) => {
                if (cartItems[product.id] !== 0) {
                  console.log("product", product);
                  return (
                    <Fade left>
                      <div className="cart_popup_product" key={index}>
                        <img
                          src={
                            product.image
                              ? "http://localhost:4000/" + product.image
                              : AdaptiMartLogoCart
                          }
                          alt=""
                          className="cart_popup_product_img"
                        />
                        <div className="cart_popup_product_content">
                          <div className="cart_popup_product_title">
                            {product.name}
                          </div>
                          <div className="cart_popup_count_handler">
                            <button
                              className="product_details_count_handler_btn"
                              onClick={() => removeFromCart(product.id)}
                            >
                              {" "}
                              -{" "}
                            </button>
                            <input
                              value={cartItems[product.id]}
                              className="cart_popup_count_handler_input"
                              // value={cartItems[id]}
                              onChange={(e) =>
                                updateCartItemCount(
                                  Number(e.target.value),
                                  product.id
                                )
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
                          <div className="cart_popup_product_price">
                            ${product.price * cartItems[product.id]}
                          </div>
                        </div>
                      </div>
                    </Fade>
                  );
                } else {
                  <></>; // Return null if cart item count is 0
                }
              })}
            </div>
          </div>
          <Fade bottom>
            {totalAmount > 0 ? (
              <div className="cart_popup_footer">
                <div className="cart_popup_subtotal_box">
                  <div className="cart_popup_subtotal_heading">Subtotal</div>

                  <div className="cart_popup_subtotal_amount">
                    ${totalAmount}
                  </div>
                </div>
                <button
                  className="cart_popup_checkout_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setcartpopup(false);
                    checkout(cartItems);
                    handleCheckout();
                  }}
                >
                  Continue to Checkout
                </button>
              </div>
            ) : (
              <div className="cart_popup_empty_cart_text">
                Your Cart is Empty!
              </div>
            )}
          </Fade>
        </div>
      </Modal>
      {/* Apply blur effect to the rest of the page when modal is open */}
      {cartpopup && <div className="blurEffect"></div>}
    </>
  );
}
