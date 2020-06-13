import React from "react";
import { Layout, Row, Col } from "antd";

const { Footer } = Layout;

const FooterComponent: React.FC = () => (
    <Row>
      <Col span="24"> egovictorc ©{new Date().getFullYear()} </Col>
    </Row>
  );

export default FooterComponent;
