import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./../styles/ProductDetailsStyles.css";
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //inital product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-products/${params.slug}`
      );

      setProduct(data?.product);
      getSimilarProducts(data?.product?._id,data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProducts = async(pid,cid)=>{
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <h6>
            <b>Name</b> : {product?.name}
          </h6>
          <h6>
            <b>Description</b> : {product?.description}
          </h6>
          <h6>
            <b>Category</b> : {product?.category?.name}
          </h6>
          <h6>
            <b>Price</b> : $ {product?.price}
          </h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart", { theme: "dark" });
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h5>Similar Products ➡️</h5>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found!</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts &&
            relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
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
                  <p className="card-text"> $ {p.price}</p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`,window.scrollTo(0,0))}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails