import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api/api";
import { getProducts, deleteProduct } from "../redux/actions/productActions";
const ProductTable = () => {
  let products = useSelector((state) => state.allProducts.products);
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

  const deleteItem = async (id) => {
    await api.delete(`/${id}`).catch((err) => console.log(err));
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Cate</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
             
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td className="btn-action">
                    <Link to={`/edit/${item.id}`} state = {{from:item}}>
                      <button className="edit">Sửa</button>
                    </Link>
                    <button
                      className="dele"
                      onClick={() => deleteItem(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
