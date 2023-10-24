import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [show,setShow] = useState(false);

  // get user data
  useEffect(()=>{
    const {email,name,phone,address} = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  },[auth?.user])

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if(data?.error){
        toast.error(data?.error,{theme:"dark"});
      }
      else{
        setAuth({...auth,user: data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile updated successfully!", { theme: "dark" });
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { theme: "dark" });
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="form-container">
              <h4 className='title'>User Profile</h4>
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
                    disabled
                  />
                </div>

                Password
                <div className="mb-3 position-relative d-flex align-items-center">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password..."
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile