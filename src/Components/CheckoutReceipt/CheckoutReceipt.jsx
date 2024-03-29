import "./CheckoutReceipt.css";
import React from "react";
import Fade from "react-reveal";
import { AdaptiMartLogoCart } from "../../Assets";

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

          {first ? (
            <>
              <div className="checkout_receipt_promo_container">
                <input
                  type="text"
                  className="checkout_receipt_promo_input"
                  placeholder="Enter Promo Code"
                />
                <button className="checkout_receipt_promo_btn">Apply</button>
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
              ${SubTotal + ShippingFee}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}
