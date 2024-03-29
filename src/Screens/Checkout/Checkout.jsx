import { useLocation, useNavigate } from "react-router-dom";
import { CheckoutPathArrow } from "../../Assets";
import CheckoutReceipt from "../../Components/CheckoutReceipt/CheckoutReceipt";
import PrivacyPolicy from "../../Components/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "../../Components/RefundPolicy/RefundPolicy";
import ShippingPolicy from "../../Components/ShippingPolicy/ShippingPolicy";
import TermsOfService from "../../Components/TermsOfService/TermsOfService";
import "./Checkout.css";
import React, { useState } from "react";
import { Fade } from "react-reveal";

export default function Checkout() {
  const [refundpolicy, setrefundpolicy] = useState(false);
  const [shippingpolicy, setshippingpolicy] = useState(false);
  const [privacypolicy, setprivacypolicy] = useState(false);
  const [termsofservice, settermsofservice] = useState(false);
  // eslint-disable-next-line
  const [subTotal, setSubTotal] = useState(0);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

  const setSubtotalValue = (subtotalValue) => {
    setSubTotal(subtotalValue);
  };

  // console.log("Subtotal in prev Checkout:", subTotal);

  const navigate = useNavigate();
  const location = useLocation();

  const products_list = location.state ? location.state.products_list : null;
  // console.log("products_list received in checkout", products_list);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to backend)
    // console.log("Email:", email);
    // console.log("firstName:", firstName);
    // console.log("lastName:", lastName);
    // console.log("phone:", phone);
    // console.log("country:", country);
    // console.log("city:", city);
    // console.log("postalCode:", postalCode);
    // console.log("address:", address);
    // console.log("state:", state);

    let user_data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      country: country,
      state: state,
      city: city,
      postalCode: postalCode,
      address: address,
    };

    navigate("/checkout-payment", {
      state: {
        products_list: products_list,
        user_data: user_data,
      },
    });
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
              <div className="checkout_path_label">Payment</div>
            </div>

            <form className="checkout_form" onSubmit={handleSubmit}>
              <div className="checkout_information_label_container">
                <div className="checkout_label">Contact Information</div>
                <div className="checkout_label">
                  Already have an account?{" "}
                  <span
                    className="checkout_login_link"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Log in
                  </span>
                </div>
              </div>

              <input
                type="email"
                className="checkout_input"
                placeholder="borkat2042@gmail.com"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                required
              />
              <div className="checkout_label">Shipping Address</div>
              <input
                type="text"
                className="checkout_input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="State"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="checkout_input"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                required
              />
              {/* <input
              type="text"
              className="checkout_input"
              placeholder="Last Name"
            /> */}

              <button
                className="checkout_continue_shipping_btn"
                type="submit"

                // onClick={(e) => {
                //   e.preventDefault();
                //   navigate("/checkout-payment");
                // }}
              >
                Continue to Shipping
              </button>
            </form>

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
          first={true}
        />
        {/* </Fade> */}
      </div>
    </>
  );
}
