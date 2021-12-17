import React, { useState } from "react";

// import styles from "./AdvanceSearchModal.module.css";
import { Modal, Button, Row, Col, Select, Space, Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
const AdvanceSearchModal: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleOk = () => {
    console.log("clicked handleOk :>> ");
  };
  const handleCancel = () => {
    setVisible(false);
    console.log("clicked handleCancel :>> ");
  };
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <>
      <Button size="large" onClick={() => setVisible(true)}>
        Advanced Search
      </Button>

      <Modal
        visible={visible}
        title="Advanced Search"
        width="700px"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add New Filter
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "first"]}
                      fieldKey={[fieldKey, "first"]}
                      rules={[
                        { required: true, message: "Missing first name" },
                      ]}
                    >
                      <Select
                        defaultValue="category"
                        style={{ width: 250 }}
                        onChange={(e) => console.log("selectchanged :>> ", e)}
                      >
                        <Option value="category">Category</Option>
                        <Option value="sentimnet">Sentiment</Option>
                        <Option value="source">Source</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "last"]}
                      fieldKey={[fieldKey, "last"]}
                      rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
          <Row justify="end">
            <Form.Item>
              <Button onClick={handleCancel}>Return</Button>
            </Form.Item>
            <Form.Item style={{ marginLeft: "10px" }}>
              <Button type="primary" htmlType="submit">
                Show Results
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AdvanceSearchModal;
