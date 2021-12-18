import React, { useEffect, useState } from "react";
import { Input, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./PublicHeader.module.css";
import BackendService from "../../Backend/backend";
import AdvanceSearchModal from "../../Pages/AdvanceSearch/AdvanceSearchModal";
const { Search } = Input;
type HeaderProps = {
  setId: React.Dispatch<React.SetStateAction<number>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSentiment: React.Dispatch<React.SetStateAction<any>>;
  setSourceId: React.Dispatch<React.SetStateAction<any>>;
  setCategoryId: React.Dispatch<React.SetStateAction<any>>;
};

const MainHeader: React.FC<HeaderProps> = (props) => {
  const { setId, setSearchTerm, setSentiment, setSourceId, setCategoryId } =
    props;
  const onSearch = (value: string) => {
    setSearchTerm(value);
    setId(Math.random());
  };
  return (
    <>
      <Row>
        <Col span={4} className={styles.left}>
          <div style={{ color: "#2D68E4" }}>News</div>
          <div style={{ color: "#6E7194" }}>Reader</div>
        </Col>
        <Col span={6} offset={4}>
          <Search
            placeholder="Search Here.."
            size="large"
            allowClear
            onSearch={onSearch}
            style={{ width: 350, marginTop: "10px" }}
          />
        </Col>
        <Col span={3}>
          <AdvanceSearchModal
            setId={setId}
            setSearchTerm={setSearchTerm}
            setSentiment={setSentiment}
            setSourceId={setSourceId}
            setCategoryId={setCategoryId}
          />
        </Col>
      </Row>
    </>
  );
};

export default MainHeader;
