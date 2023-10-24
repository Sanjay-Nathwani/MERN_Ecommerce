import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.svg"
            alt="privacy-policy"
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Privacy Policy</h4>
          <ul>
            <li>
              Personal information such as your name and address is collected
              during the checkout process and is used solely for order
              processing and shipping.
            </li>
            <li>
              Payment information, including credit card details, is collected
              securely and processed through trusted payment processors. We do
              not store your payment information.
            </li>
            <li>
              To fulfill your orders, we share necessary information with
              shipping providers and may use third-party services for order
              tracking and delivery.
            </li>
            <li>
              When you create an account, we collect information like your name
              and email. This information is used to personalize your experience
              and facilitate future purchases.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
