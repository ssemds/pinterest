import React from "react";
import {useProduct} from "../Contexts/ProductContextProvider";
import {useNavigate} from "react-router-dom";

const ProductCard = ({ item }) => {
   const { deletePost } = useProduct();
   const navigate = useNavigate();
   return (
       <div>
           <h3>Title: {item.title}</h3>
           <h4>Category: {item.category_name}</h4>
           <h4>Owner: {item.owner_username}</h4>
           <p>Comments: {item.comments_count}</p>
           <button onClick={() => deletePost(item.id)}>Delete</button>
           <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
           <button onClick={() => navigate(`/posts/${item.id}`)}>Details</button>
       </div>
   );
};

export default ProductCard;