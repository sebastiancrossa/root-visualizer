// Libraries
import React from "react";

// Component Imports
import { StyledContainer } from "../styles/home.style";
import Layout from "../components/layout";
import Graph from "../components/Graph";

const Home = () => {
  return (
    <Layout>
      <StyledContainer>
        <h1>Welcome to the Root Visualizer</h1>

        <Graph />
      </StyledContainer>
    </Layout>
  );
};

export default Home;
