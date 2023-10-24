import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/AuthStyles.css";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BiSolidShow, BiSolidHide } from "react-icons/bi";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const [show,setShow] = useState(false);

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,{theme:"dark"});
        navigate("/login");
      } else {
        toast.error(res.data.message,{theme:"dark"});
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { theme: "dark" });
    }
  };

  return (
    <Layout title="Regiser - Ecommerce app">
      <div className="form-container">
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Name..."
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Email..."
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative d-flex align-items-center">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password..."
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

          {/* Phone */}
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Phone No..."
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Address..."
              required
            />
          </div>

          {/* forgot password anser */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is your favourite sport?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
