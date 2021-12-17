import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Row,
  Col,
  List,
  DatePicker,
  Badge,
  Divider,
  PageHeader,
  // Typography,
} from "antd";
import BackendService from "../../Backend/backend";
import styles from "./MainPage.module.css";
import localizedFormat from "dayjs/plugin/localizedFormat";

// var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
// const { Paragraph } = Typography;
const { RangePicker } = DatePicker;
const MainPage: React.FC = () => {
  const [allNews, setAllnews] = useState<any>([]);
  const [newsContent, setNewsContent] = useState<any>([]);
  const apiCall = () => {
    BackendService.getAllNews(
      "Iphone",
      "Positive",
      "2020-12-01",
      "2020-12-03",
      "277,4171",
      "13010000,04018000"
    ).then((data: any) => {
      console.log("data :>> ", data.result.data);
      setAllnews(data.result.data);
      setNewsContent(data.result.data[0]);
    });
  };
  useEffect(() => {
    apiCall();
  }, []);

  const Content = ({ children, extraContent }: any) => (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
  return (
    <Row>
      <Col span={6} className={styles.leftNav}>
        <RangePicker style={{ width: "350px" }} />
        <List
          itemLayout="horizontal"
          dataSource={allNews}
          style={{ textAlign: "left" }}
          renderItem={(item: any) => (
            <List.Item
              className={styles.antlistitem}
              onClick={(e) => setNewsContent(item)}
            >
              {dayjs(item.date).format("LL")}
              <List.Item.Meta
                title={<div style={{ fontSize: "20px" }}>{item.title}</div>}
                description={
                  <>
                    <Badge
                      size="default"
                      status={
                        item.sentiment === "Positive"
                          ? "success"
                          : item.sentiment === "Negative"
                          ? "error"
                          : "default"
                      }
                    />
                    {item.publication}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Col>
      <Divider style={{ height: "100vh" }} type="vertical" />
      <Col span={16} className={styles.mainContent}>
        {newsContent ? (
          <PageHeader title={newsContent.title}>
            <Row>
              <Col>{newsContent.publication}</Col>
              <Col span={4} offset={18}>
                {dayjs(newsContent.date).format("LL")}
              </Col>
            </Row>
            <Divider />
            <Content>{newsContent.content.replace(".", "\n")}</Content>
          </PageHeader>
        ) : null}
      </Col>
    </Row>
  );
};

export default MainPage;
