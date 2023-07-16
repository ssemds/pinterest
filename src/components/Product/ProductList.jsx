import { useEffect } from "react";
import { useProduct } from "../Contexts/ProductContextProvider";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { getPosts, pages, posts, increment, decrement } = useProduct();
  console.log(pages, "aaaaaa");
  useEffect(() => {
    getPosts();
  }, [pages]);
  const enebled = pages === 1;
  return (
    <div>
      <button disabled={enebled} onClick={decrement}>
        Prev
      </button>
      <button onClick={increment}>Next</button>
      {posts?.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
