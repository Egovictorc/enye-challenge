import React from "react";
import { Layout, Row, Col } from "antd";

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Row>
      <Col span="24">hello from footer</Col>
    </Row>
  );
};

export default FooterComponent;
