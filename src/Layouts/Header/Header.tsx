import React from "react";
import { Layout, Input, Select, Cascader, Row, Col, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./PublicHeader.module.css";
import AdvanceSearchModal from "../../Pages/AdvanceSearch/AdvanceSearchModal";

const { Header } = Layout;
const { Option } = Select;

const MainHeader: React.FC = () => {
  return (
    <>
      <Row>
        <Col span={4} className={styles.left}>
          <div style={{ color: "#2D68E4" }}>News</div>
          <div style={{ color: "#6E7194" }}>Reader</div>
        </Col>
        <Col span={6} offset={4}>
          <Input
            size="large"
            placeholder="Search here."
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={3}>
          <AdvanceSearchModal />
        </Col>
      </Row>
    </>
  );
};

export default MainHeader;
