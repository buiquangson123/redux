/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";
import api from "../api/api";
const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    // const response = await axios
    //   .get(`https://fakestoreapi.com/products/${id}`)
    //   .catch((err) => {
    //     console.log("Err: ", err);
    //   });

    const response = await api.get(`/${id}`).catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="container-detail">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="row">
          <div className="column-image">
            <img src={image} />
          </div>
          <div className="column-des">
            <h1>{title}</h1>
            <h2>
              <p className="detail-price">${price}</p>
            </h2>
            <div className="tag">
              <i className="fa-solid fa-tag"></i>
              <h3 className="detail-cate">{category}</h3>
            </div>
            <p>{description}</p>
            <div className="btn-add">
              <span>Add to Cart</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
