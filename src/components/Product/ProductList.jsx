import React, { useContext, useEffect } from "react";
import { productContext } from "../Contexts/ProductContextProvider";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const { posts, getPosts } = useContext(productContext);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Container>
      {posts?.length > 0 &&
        posts?.map((item) => {
          return (
            <ArrayContainer
              key={item.id}
              onClick={() => navigate(`${item.id}`)}
            >
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <p>{item.category_name}</p>
            </ArrayContainer>
          );
        })}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  width: 100%;
  padding: 0 120px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
`;

const ArrayContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 20px;
`;
