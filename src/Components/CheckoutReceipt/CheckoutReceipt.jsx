import "./CheckoutReceipt.css";
import React, { useState } from "react";
import Fade from "react-reveal";
import { AdaptiMartLogoCart } from "../../Assets";
import { getcouponbycode } from "../../api/api";

export default function CheckoutReceipt({
  products_list,
  setSubtotalValue,
  first,
}) {
  const getSubTotalAmount = () => {
    let totalAmount = 0;
    products_list.forEach((product) => {
      totalAmount += product.price * product.quantity;
    });
    return totalAmount;
  };

  const SubTotal = getSubTotalAmount();
  setSubtotalValue(SubTotal);
  let ShippingFee = 0;
  if (first === false) {
    ShippingFee = 50;
  }

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeCheck, setPromoCodeCheck] = useState(0);
  let [discountPercent, setDiscountPercent] = useState(0);
  const applyPromo = (promoCode) => {
    getcouponbycode(promoCode)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length === 0) {
          setPromoCodeCheck(2);
          console.log("Invalid Promo Code.");
        } else {
          setPromoCodeCheck(1);
          console.log("Promo Code Applied!", res.data);
          setDiscountPercent(
            (discountPercent = res.data[0].discount_percentage)
          );
          console.log("discountPercent", discountPercent);
        }
        // user_data.id = res.data.insertId;
      })
      .catch((err) => {
        console.log("Error fetching Adding Order:", err);
      });
  };

  return (
    <>
      <Fade right>
        <div className="checkout_receipt">
          {products_list.map((product, index) => (
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
                <div className="cart_popup_product_title">{product.name}</div>

                <div className="checkout_receipt_product_price">
                  ${product.price * product.quantity}
                </div>
                <div className="checkout_receipt_product_price">
                  Quantity: {product.quantity}
                </div>
              </div>
            </div>
          ))}

          {first === false ? (
            <>
              <div className="checkout_receipt_promo_container">
                <input
                  type="text"
                  className="checkout_receipt_promo_input"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoCodeCheck(0);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    applyPromo(promoCode);
                    console.log("promoCode", promoCode);
                  }}
                  className="checkout_receipt_promo_btn"
                >
                  Apply
                </button>
              </div>
              <div
                style={{
                  fontSize: "1.2rem",
                  color:
                    promoCodeCheck === 1
                      ? "green"
                      : promoCodeCheck === 2
                      ? "red"
                      : "",
                }}
              >
                {promoCodeCheck === 1
                  ? "Promo has been Applied!"
                  : promoCodeCheck === 2
                  ? "Promo Code Invalid"
                  : ""}
              </div>

              <hr
                style={{
                  margin: "4em 0",
                }}
              />
            </>
          ) : (
            ""
          )}

          <div className="checkout_receipt_subtotal_box">
            <div className="checkout_receipt_subtotal_text">Subtotal</div>
            <div className="checkout_receipt_subtotal_amount">${SubTotal}</div>
          </div>
          <div className="checkout_receipt_subtotal_box">
            <div className="checkout_receipt_subtotal_text">Shipping</div>
            <div className="checkout_receipt_subtotal_amount">
              {ShippingFee !== 0
                ? "$" + ShippingFee
                : "Calculated at next step"}
            </div>
          </div>
          <hr
            style={{
              margin: "4em 0",
            }}
          />
          <div className="checkout_receipt_subtotal_box">
            <div className="checkout_receipt_total_text">Total</div>
            <div className="checkout_receipt_total_amount">
              ${SubTotal * (1 - discountPercent / 100) + ShippingFee}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}
