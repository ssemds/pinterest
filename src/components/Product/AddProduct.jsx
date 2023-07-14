import React, { useEffect, useState } from "react";
import { useProduct } from "../Contexts/ProductContextProvider";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContextProvider";

const AddProduct = () => {
  const { categories, getCategories, createPost } = useProduct();
  const { currentUser } = useAuth();
  console.log(currentUser);

  useEffect(() => {
    getCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("category", category);
    if (image) {
      newProduct.append("post", image);
    }
    createPost(newProduct);
    console.log(title, category);
  };

  return (
    <div className="w-50 mt-5 m-auto">
      <h2>CREATE PRODUCT</h2>
      <Form.Control
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
      />
      <Form.Select
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Default select example"
      >
        <option>Open this select menu</option>

        {categories.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file"/>

      <Button className="mt-3" onClick={handleSave}>
        Create Product
      </Button>
    </div>
  );
};

export default AddProduct;
