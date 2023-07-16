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
        <p>{onePost.category_name}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
