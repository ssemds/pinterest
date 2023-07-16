import React, { useContext, useEffect } from "react";
import { productContext } from "../Contexts/ProductContextProvider";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { getOnePost, onePost } = useContext(productContext);
  const { id } = useParams();
  useEffect(() => {
    getOnePost(id);
  }, []);
  return (
    <div>
      <div>
        <h1>{onePost.title}</h1>
        <p>{onePost.category_name}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
