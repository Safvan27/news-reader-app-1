import React from "react";
import {
  Row,
  Col,
  List,
  DatePicker,
  Badge,
  Divider,
  PageHeader,
  Menu,
  Dropdown,
  Button,
  Tag,
  Typography,
} from "antd";
import styles from "./MainPage.module.css";
import { EllipsisOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { RangePicker } = DatePicker;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const content = (
  <>
    <Paragraph>
      Ant Design interprets the color system into two levels: a system-level
      color system and a product-level color system.
    </Paragraph>
    <Paragraph>
      Ant Design&#x27;s design team preferred to design with the HSB color
      model, which makes it easier for designers to have a clear psychological
      expectation of color when adjusting colors, as well as facilitate
      communication in teams.
    </Paragraph>
  </>
);

const Content = ({ children, extraContent }: any) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);
const MainPage: React.FC = () => {
  return (
    <Row>
      <Col span={6} className={styles.leftNav}>
        <RangePicker style={{ width: "350px" }} />
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{ textAlign: "left" }}
          renderItem={(item) => (
            <List.Item
              className={styles.antlistitem}
              onClick={(e) => console.log("e", item.title)}
            >
              January 31 ,2020
              <List.Item.Meta
                title={<div style={{ fontSize: "20px" }}>{item.title}</div>}
                description={
                  <>
                    <Badge size="default" status="success" />
                    "Seatleppi"
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Col>
      <Divider style={{ height: "100vh" }} type="vertical" />
      <Col span={16} className={styles.mainContent}>
        <PageHeader title="Title">
          <Row>
            <Col>NZ Harald</Col>
            <Col span={4} offset={18}>
              January 31,2020
            </Col>
          </Row>
          <Divider />
          <Content>{content}</Content>
        </PageHeader>
      </Col>
    </Row>
  );
};

export default MainPage;
