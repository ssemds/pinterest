import React, { useEffect } from "react";
import { useProduct } from "../Contexts/ProductContextProvider";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const {getPosts, posts} = useProduct();

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      {posts.map((item) => (
          <ProductCard key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default ProductList;
