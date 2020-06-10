import React from "react";
import { Layout, Row, Col } from "antd";

import styles from "../scss/header.module.scss";

//const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <header className={styles.header}>
      <Row>
        <Col span="24">hello from header</Col>
      </Row>
    </header>
  );
};

export default HeaderComponent;
