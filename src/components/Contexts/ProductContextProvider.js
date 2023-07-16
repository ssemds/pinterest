import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";

import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";
import { getTokens } from "../helpers/functions";

export const productContext = createContext();
export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  //   pages: 0,
  categories: [],
  oneProduct: null,
  onePost: {},
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload.results,
        // pages: Math.ceil(action.payload.count / 6),
      };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "GET_ONE_POST":
      return { ...state, onePost: action.payload };
    default:
      return state;
  }
}
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  async function getPosts() {
    try {
      const res = await axios(
        `${API}/posts/${window.location.search}`,
        getTokens()
      );
      dispatch({ type: "GET_POSTS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      const res = await axios(`${API}/categories/`);
      dispatch({ type: "GET_CATEGORIES", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  async function createPost(newPost) {
    try {
      await axios.post(`${API}/posts/`, newPost, getTokens());
      console.log(newPost);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      await axios.delete(`${API}/posts/${id}/`, getTokens());
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOnePost(id) {
    try {
      const res = await axios(`${API}/posts/${id}/`, getTokens());
      dispatch({ type: "GET_ONE_POST", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePost(id, editedPost) {
    try {
      await axios.patch(`${API}/posts/${id}/`, editedPost, getTokens());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }
  const values = {
    getPosts,
    posts: state.posts,
    // pages: state.pages,

    categories: state.categories,
    getCategories,
    createPost,
    deletePost,
    getOnePost,
    onePost: state.onePost,
    updatePost,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
