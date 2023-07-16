import React, { useEffect, useState } from "react";
import { useProduct } from "../Contexts/ProductContextProvider";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const { categories, getCategories, updatePost } = useProduct();
  const { state } = useLocation();
  console.log(state.item.id);
  useEffect(() => {
    getCategories();
  }, []);

  const [title, setTitle] = useState(state?.item.title || "");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(state?.item.category_name || "");
  console.log(categories);
  const handleSave = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("category", category);
    if (image) {
      newProduct.append("image", image);
    }
    updatePost(state.item.id, newProduct);
  };
  return (
    <div className="w-50 mt-5 m-auto">
      <h2> EDIT POST</h2>
      <Form.Control
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        value={title}
        type="text"
      />
      <Form.Select
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Default select example"
      >
        <option>{category || "Open this select menu"}</option>
        {categories?.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" />

      <Button className="mt-3" onClick={handleSave}>
        Save Product
      </Button>
    </div>
  );
};

export default EditProduct;
