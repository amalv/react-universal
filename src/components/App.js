// @flow
import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Routes from "./Routes";

const Base = styled.div`
  flex-grow: 1;
`;

const App = () => (
  <Base>
    <Header />
    <Routes />
  </Base>
);

export default App;
