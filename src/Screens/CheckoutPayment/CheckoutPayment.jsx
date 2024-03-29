import "./CheckoutPayment.css";
import {
  AdaptiMartLogoCart,
  CheckoutPathArrow,
  CheckoutPaymentCreditCards,
} from "../../Assets";
import CheckoutReceipt from "../../Components/CheckoutReceipt/CheckoutReceipt";
import PrivacyPolicy from "../../Components/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "../../Components/RefundPolicy/RefundPolicy";
import ShippingPolicy from "../../Components/ShippingPolicy/ShippingPolicy";
import TermsOfService from "../../Components/TermsOfService/TermsOfService";
import React, { useState } from "react";
import Fade from "react-reveal";
import { useLocation, useNavigate } from "react-router-dom";
import { addorder, adduser } from "../../api/api";

export default function CheckoutPayment() {
  const [refundpolicy, setrefundpolicy] = useState(false);
  const [shippingpolicy, setshippingpolicy] = useState(false);
  const [privacypolicy, setprivacypolicy] = useState(false);
  const [termsofservice, settermsofservice] = useState(false);
  // eslint-disable-next-line
  const [subTotal, setSubTotal] = useState(0);
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setSubtotalValue = (subtotalValue) => {
    setSubTotal(subtotalValue);
  };
  // console.log("Subtotal in prev Checkou-paymentt:", subTotal);

  const [togglepayment, settogglepayment] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const products_list = location.state ? location.state.products_list : null;
  const user_data = location.state ? location.state.user_data : null;
  // console.log("products_list received in checkout-payment", products_list);
  // console.log("user_data received in checkout-payment", user_data);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoggedIn === false) {
      let formData = new FormData();

      // Append other form data
      formData.append("email", user_data.email);
      formData.append("firstName", user_data.firstName);
      formData.append("lastName", user_data.lastName);
      formData.append("phone", user_data.phone);
      formData.append("country", user_data.country);
      formData.append("state", user_data.state);
      formData.append("city", user_data.city);
      formData.append("postalCode", user_data.postalCode);
      formData.append("address", user_data.address);

      // Append the dummy image file
      let dummyImageFile = new File([""], AdaptiMartLogoCart, {
        type: "image/png",
      });
      formData.append("profile_pic", dummyImageFile);
      console.log([...formData]);
      adduser(formData)
        .then((res) => {
          console.log("User Added", res.data);
          user_data.id = res.data.insertId;

          let reqObj = {
            user_id: user_data.id,
            status: 5,
            payment_status: togglepayment === 0 ? 0 : 1,
            products_list: products_list,
          };
          addorder(reqObj)
            .then((res) => {
              console.log("Order Added", res.data);
              alert("Order Placed Successfully!");
              navigate("/");
              // user_data.id = res.data.insertId;
            })
            .catch((err) => {
              console.log("Error fetching Adding Order:", err);
            });
        })
        .catch((err) => {
          console.log("Error fetching Adding user:", err);
        });
    }

    // navigate("/checkout-payment", {
    //   state: {
    //     products_list: products_list,
    //     user_data: user_data,
    //   },
    // });
  };

  return (
    <>
      <RefundPolicy
        refundpolicy={refundpolicy}
        setrefundpolicy={setrefundpolicy}
      />
      <ShippingPolicy
        shippingpolicy={shippingpolicy}
        setshippingpolicy={setshippingpolicy}
      />
      <PrivacyPolicy
        privacypolicy={privacypolicy}
        setprivacypolicy={setprivacypolicy}
      />
      <TermsOfService
        termsofservice={termsofservice}
        settermsofservice={settermsofservice}
      />

      <div className="checkout_main_box">
        <Fade left>
          <div className="checkout_box">
            <div className="checkout_heading">Checkout</div>
            <div className="checkout_path_container">
              <div
                className="checkout_path_label"
                style={{
                  color: "var(--color-main)",
                }}
              >
                Information
              </div>

              <img
                src={CheckoutPathArrow}
                alt="Path Arrow"
                className="checkout_path_arrow_img"
              />
              <div
                className="checkout_path_label"
                style={{
                  color: "var(--color-main)",
                }}
              >
                Payment
              </div>
            </div>

            <hr />
            {/* STARTING PAYMENT PAGE */}

            <div className="checkout_payment_contact_container">
              <div className="checkout_payment_contact_title">Contact</div>
              <div className="checkout_payment_contact_email">
                {user_data.email}
              </div>
            </div>
            <hr />
            {/* STARTING PAYMENT PAGE */}

            <div className="checkout_payment_contact_container">
              <div className="checkout_payment_contact_title">Shipping to</div>
              <div className="checkout_payment_contact_email">
                {user_data.address + ", " + user_data.city}
              </div>
            </div>
            <hr />

            <div className="checkout_payment_payment_container">
              <div className="checkout_payment_payment_heading">Payment</div>
              <div className="checkout_payment_payment_subtitle">
                All transactions are secured and encrypted.
              </div>

              <div className="checkout_payment_credit_cards_container">
                <div
                  className={
                    togglepayment === 1
                      ? "checkout_payment_credit_cards_header_active"
                      : "checkout_payment_credit_cards_header"
                  }
                  onClick={() => {
                    settogglepayment(1);
                  }}
                >
                  <div className="checkout_payment_credit_cards_title">
                    Credit Card
                  </div>
                  <img
                    src={CheckoutPaymentCreditCards}
                    alt="Credit Cards"
                    className="checkout_payment_credit_cards_img"
                  />
                </div>
                {togglepayment === 1 ? (
                  <Fade top>
                    <div className="checkout_payment_credit_cards_form">
                      <label
                        htmlFor="cardNumber"
                        className="checkout_payment_credit_cards_form_input_label"
                      >
                        Card Number:
                      </label>
                      <input
                        className="checkout_payment_credit_cards_form_input"
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Enter card number"
                        maxLength="16"
                        required
                      />

                      <label
                        htmlFor="expiryDate"
                        className="checkout_payment_credit_cards_form_input_label"
                      >
                        Expiration Date:
                      </label>
                      <input
                        className="checkout_payment_credit_cards_form_input"
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YYYY"
                        pattern="(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})"
                        required
                      />

                      <label
                        htmlFor="cvv"
                        className="checkout_payment_credit_cards_form_input_label"
                      >
                        CVV:
                      </label>
                      <input
                        className="checkout_payment_credit_cards_form_input"
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="Enter CVV"
                        maxLength="3"
                        required
                      />
                    </div>
                  </Fade>
                ) : (
                  ""
                )}

                <div
                  className={
                    togglepayment === 0
                      ? "checkout_payment_credit_cards_header_active"
                      : "checkout_payment_credit_cards_header"
                  }
                  onClick={() => {
                    settogglepayment(0);
                  }}
                >
                  <div className="checkout_payment_credit_cards_title">
                    Cash on Delivery
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout_payment_footer">
              <div
                className="checkout_payment_footer_goback_link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                {"< "}Return to information
              </div>

              <button
                className="checkout_payment_footer_payment_btn"
                onClick={(e) => {
                  handleSubmit(e);
                  // e.preventDefault();
                  // if(isLoggedIn === false)
                  // {

                  // }
                  // alert("Order has been placed Successfully!");
                  // navigate("/");
                }}
              >
                Place Order
              </button>
            </div>

            <div className="checkout_policy_links_container">
              <div
                className="checkout_policy_link"
                onClick={(e) => {
                  e.preventDefault();
                  setrefundpolicy(true);
                }}
              >
                Refund Policy
              </div>
              <div
                className="checkout_policy_link"
                onClick={(e) => {
                  e.preventDefault();
                  setshippingpolicy(true);
                }}
              >
                Shipping Policy
              </div>
              <div
                className="checkout_policy_link"
                onClick={(e) => {
                  e.preventDefault();
                  setprivacypolicy(true);
                }}
              >
                Privacy Policy
              </div>
              <div
                className="checkout_policy_link"
                onClick={(e) => {
                  e.preventDefault();
                  settermsofservice(true);
                }}
              >
                Terms of Service
              </div>
            </div>
          </div>
        </Fade>

        <CheckoutReceipt
          products_list={products_list}
          setSubtotalValue={setSubtotalValue}
          first={false}
        />
      </div>
    </>
  );
}
