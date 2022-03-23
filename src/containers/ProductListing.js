import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import ProductComponent from "./ProductComponent";
import api from "../api/api";

const ProductPage = () => {
  // const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await api.get(`/`).catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(getProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <ProductComponent />
    </div>
  );
};

export default ProductPage;
