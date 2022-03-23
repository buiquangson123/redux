import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import { updateProduct } from "../redux/actions/productActions";

const EditProduct = ({ productEdit }) => {
  const { editId } = useParams();
  console.log(">>proedit", productEdit);
  const { id, title, price, category } = productEdit;
  const dispatch = useDispatch();
  const [formEdit, setFormEdit] = useState({
    id,
    title,
    price,
    category,
  });

  const handleEdit = async (id) => {
    const res = await api.patch(`/${id}`, formEdit);
    dispatch(updateProduct(res.data));
    console.log(">>>res: ", res.data);
  };

  const handleChange = (event) => {
    setFormEdit({
      ...formEdit,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {Object.keys(productEdit).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="form-submit">
          <input
            type="text"
            name="title"
            placeholder="enter an title"
            value={formEdit.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="enter a price"
            value={formEdit.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="enter a cate"
            value={formEdit.category}
            onChange={handleChange}
          />
          <Link to={`/admin`}>
            <button
              type="submit"
              className="add"
              onClick={() => handleEdit(editId)}
            >
              Cập nhật
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default EditProduct;
