import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/AuthStyles.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useAuth } from "../../context/auth";

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [auth,setAuth] = useAuth();

    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `/api/v1/auth/login`,
          {
            email,
            password,
          }
        );
        if (res && res.data.success) {
          toast.success(res.data && res.data.message, { theme: "dark" });
          setAuth({
            ...auth,
            user : res.data.user,
            token : res.data.token,
          });
          localStorage.setItem('auth',JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message, { theme: "dark" });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { theme: "dark" });
      }
    };

    return (
      <Layout title="Login - Ecommerce app">
        <div className="form-container">
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </Layout>
    );
};

export default Login;
