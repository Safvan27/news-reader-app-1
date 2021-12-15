import React, { useState, useEffect } from "react";

import styles from "./AdvanceSearchModal.module.css";
import { Modal, Button } from "antd";
const AdvanceSearchModal: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleOk = () => {
    console.log("clicked ok :>> ");
  };
  const handleCancel = () => {
    setVisible(false);
    console.log("clicked handleCancel :>> ");
  };
  return (
    <>
      <Button size="large" onClick={() => setVisible(true)}>
        Advanced Search
      </Button>

      <Modal
        visible={visible}
        title="Advanced Search"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            // onClick={this.handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AdvanceSearchModal;
