import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "../redux/actions/productActions";
import api from "../api/api";
import ProductTable from "./ProductTable";

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const [formValue, setformValue] = React.useState({
    id: "",
    title: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  });

  const refTitle = useRef();
  const refCate = useRef();
  const refPrice = useRef();

  const handleSubmit = async () => {
    const addPro = {};
    addPro.category = formValue.category;
    addPro.title = formValue.title;
    addPro.price = parseInt(formValue.price);
    addPro.image = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";
    addPro.description =
      "Your perfect pack for everyday use and walks in the forest";
    addPro.rating = { rate: 3.9, count: 120 };

    console.log(">>>check add: ", addPro);
    refTitle.current.value = "";
    refCate.current.value = "";
    refPrice.current.value = "";

    try {
      // fetch("http://localhost:3004/products", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(addPro),
      // })
      //   .then((res) => {
      //     console.log(">>>check res: ", res);
      //     return res.json();
      //   })
      //   .then((json) => console.log(">>>check resData: ", json));
      const res = await api.post(`/`, addPro);

      console.log(">>>check resData: ", res.data);

      return dispatch(addProducts(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="form-submit">
        <input
          type="text"
          name="title"
          placeholder="enter an title"
          value={formValue.title}
          onChange={handleChange}
          ref={refTitle}
        />
        <input
          type="text"
          name="price"
          placeholder="enter a price"
          value={formValue.price}
          onChange={handleChange}
          ref={refPrice}
        />
        <input
          type="text"
          name="category"
          placeholder="enter a cate"
          value={formValue.category}
          onChange={handleChange}
          ref={refCate}
        />
        <button type="submit" className="add" onClick={handleSubmit}>
          Th??m
        </button>
      </div>
       <ProductTable></ProductTable>
    </div>
  );
};

export default ProductAdmin;
