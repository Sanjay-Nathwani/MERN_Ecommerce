import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          
          <p className="text-justify">
            At <b>ELITECART</b>, we're more than just an online shopping
            destination; we're your trusted partner in finding the perfect
            products to enhance your life. Our commitment to quality,
            innovation, and exceptional customer service sets us apart.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
