import { useNavigate } from "react-router-dom";
import "./Login.css";
import Fade from "react-reveal";
import React, { useEffect, useState } from "react";
import { login } from "../../api/api";

export default function Login() {
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  let [loginError, setLoginError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log("Email:", Email);
    console.log("Password:", Password);

    login(Email, Password)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length === 0) {
          setLoginError(true);
          console.log("Login failed. Empty response received.");
        } else {
          console.log("User Logged in Successfully", res.data);
          localStorage.setItem("userId", res.data[0].user_id);
          alert("Login Successfully!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error Logging In:", err);
      });

    // navigate("/checkout-payment", {
    //   state: {
    //     products_list: products_list,
    //     user_data: user_data,
    //   },
    // });
  };

  useEffect(() => {
    localStorage.clear();
  });

  const navigate = useNavigate();
  return (
    <>
      <Fade top>
        <div className="edit_profile_box">
          <div className="edit_profile_heading">Login</div>

          <form onSubmit={handleSubmit} className="edit_profile_container">
            <div className="edit_profile_input_container">
              <div className="edit_profile_input_label">Email</div>

              <input
                type="email"
                value={Email}
                className="edit_profile_input"
                placeholder="Email"
                onChange={(event) => {
                  setEmail((Email = event.target.value));
                  setLoginError(false);
                }}
                required
              />
            </div>
            <div className="edit_profile_input_container">
              <div className="edit_profile_input_label">Password</div>

              <input
                type="password"
                value={Password}
                className="edit_profile_input"
                placeholder="Password"
                onChange={(event) => {
                  setPassword((Password = event.target.value));
                  setLoginError(false);
                }}
                required
              />
              {loginError ? (
                <div className="error">Incorrect Email or Password</div>
              ) : (
                ""
              )}
            </div>

            <div className="edit_profile_btn_container">
              <button
                className="edit_profile_btn edit_profile_cancel_btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go To Home
              </button>
              <button
                type="submit"
                className="edit_profile_btn edit_profile_update_btn"
              >
                Login
              </button>
            </div>

            <div className="login_signup_text">
              Dont have an existing account?{" "}
              <span
                className="login_signup_text_link"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign up!
              </span>
            </div>
          </form>
        </div>
      </Fade>
    </>
  );
}
