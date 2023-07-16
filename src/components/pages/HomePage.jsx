import React from "react";
import { styled } from "styled-components";

const HomePage = () => {
  return (
    <Container>
      <h1>HomePage</h1>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  h1 {
    font-size: xx-large;
  }
`;
