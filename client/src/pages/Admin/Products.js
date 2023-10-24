import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import {toast} from "react-toastify";
import { Link } from 'react-router-dom';

const Products = () => {

    const [products,setProducts] = useState([]);

    const [isLoading,setIsLoading] = useState(false);

    // get all products
    const getAllProducts = async()=>{
        try {
          setIsLoading(true);
          const { data } = await axios.get(
            `/api/v1/product/get-products`
          );
          setIsLoading(false);

          setProducts(data.products);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          toast.error("Something went wrong!",{theme:"dark"})
        }
    };

    useEffect(() => {
      getAllProducts();
    }, []);
    
    return (
      <Layout title={"Dashboard - Products"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>All Products List</h1>

              {!isLoading ? (
                <div className="d-flex flex-wrap">
                  {products?.map((p) => (
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      key={p._id}
                      className="product-link"
                    >
                      <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">
                            {p.description.substring(0, 30)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Products