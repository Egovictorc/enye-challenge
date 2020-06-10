import React from "react";
import { Layout, Row, Col } from "antd";
//import logo from "./logo.svg";

//import "./App.css";

//import components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Footer from "./components/Footer";

import "antd/dist/antd.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Row>
        <Content />
        <Sidebar />
      </Row>
      <Footer />
    </>
  );
};

export default App;
