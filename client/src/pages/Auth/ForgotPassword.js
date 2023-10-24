import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import "../../styles/AuthStyles.css";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,{theme : "dark"});

        navigate("/login");
      } else {
        toast.error(res.data.message, { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { theme: "dark" });
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container ">
        <h1 className="title">Reset Password</h1>
        <form onSubmit={handleSubmit}>

            {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email..."
              required
            />
          </div>

            {/* Secret Question */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer1"
              placeholder="Enter Your favorite Sport..."
              required
            />
          </div>

            {/* New Password */}
          <div className="mb-3 position-relative d-flex align-items-center">
            <input
              type={show ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
            />
            {show ? (
              <BiSolidHide
                className="position-absolute end-0 me-1"
                onClick={() => setShow(false)}
              />
            ) : (
              <BiSolidShow
                className="position-absolute end-0 me-1"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
