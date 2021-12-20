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
  Typography,
  Spin,
  Empty,
} from "antd";
import BackendService from "../../Backend/backend";
import styles from "./MainPage.module.css";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MainHeader from "../../Layouts/Header/Header";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

dayjs.extend(localizedFormat);
const { RangePicker } = DatePicker;
const MainPage: React.FC = () => {
  const [allNews, setAllnews] = useState<any>([]);
  const [newsContent, setNewsContent] = useState<any>([]);
  const [listloading, setListloading] = useState<boolean>(false);
  const [id, setId] = React.useState<number>(1);
  // const [searchTerm, setSearchTerm] = React.useState("Iphone");
  // const [sentiment, setSentiment] = React.useState<string>("Positive");
  // const [startDate, setStartDate] = React.useState<string>("2020-12-01");
  // const [endDate, setEndDate] = React.useState<string>("2020-12-03");
  // const [sourceId, setSourceId] = React.useState<string>("277,4171");
  // const [categoryId, setCategoryId] =
  //   React.useState<string>("13010000,04018000");
  const apiCall = () => {
    setListloading(true);
    BackendService.getAllNews(
      localStorage.getItem("searchString")
        ? localStorage.getItem("searchString")
        : "Iphone",
      localStorage.getItem("sentiment")
        ? localStorage.getItem("sentiment")
        : "Postive",
      localStorage.getItem("startDate")
        ? localStorage.getItem("startDate")
        : "2020-12-01",
      localStorage.getItem("endDate")
        ? localStorage.getItem("endDate")
        : "2020-12-18",
      localStorage.getItem("sourceId")
        ? localStorage.getItem("sourceId")
        : "277,4171",
      localStorage.getItem("categoryId")
        ? localStorage.getItem("categoryId")
        : "13010000,04018000"
    ).then((data: any) => {
      setAllnews(data.result?.data);
      setNewsContent(data.result?.data[0]);
      setListloading(false);
    });
  };

  useEffect(() => {
    apiCall();
  }, [id]);

  const handleDatePickerChange = (date: any, dateString: any, id: any) => {
    // setStartDate(dateString[0]);
    // setEndDate(dateString[1]);
    localStorage.setItem("startDate", dateString[0]);
    localStorage.setItem("endDate", dateString[1]);
    setId(Math.random());
  };
  var today = new Date();
  return (
    <>
      <Header className="header">
        <MainHeader
          // setSearchTerm={setSearchTerm}
          // setSentiment={setSentiment}
          // setSourceId={setSourceId}
          // setCategoryId={setCategoryId}
          setId={setId}
        />
      </Header>
      <Content>
        <Row>
          <Col span={6} className={styles.leftNav}>
            <RangePicker
              style={{ width: "350px" }}
              onChange={(date, dateString) =>
                handleDatePickerChange(date, dateString, 1)
              }
            />
            {allNews.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                imageStyle={{
                  height: 80,
                }}
                style={{ marginTop: "50px" }}
                description={<span>No News for Selected Filter</span>}
              ></Empty>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={allNews}
                loading={listloading}
                className={styles.listStyle}
                renderItem={(item: any) => (
                  <List.Item
                    className={styles.antlistitem}
                    onClick={(e) => setNewsContent(item)}
                  >
                    {dayjs(item.date).format("LL")}
                    <List.Item.Meta
                      title={
                        <div style={{ fontSize: "20px" }}>{item.title}</div>
                      }
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
            )}
          </Col>
          <Divider style={{ height: "100vh" }} type="vertical" />
          <Col span={16} className={styles.mainContent}>
            {!listloading ? (
              allNews.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 80,
                  }}
                  style={{ marginTop: "50px" }}
                  description={<span>No News for Selected Filter</span>}
                ></Empty>
              ) : newsContent ? (
                <PageHeader title={newsContent.title}>
                  <Row>
                    <Col>{newsContent.publication}</Col>
                    <Col span={4} offset={18}>
                      {dayjs(newsContent.date).format("LL")}
                    </Col>
                  </Row>
                  <Divider />
                  <Paragraph
                    ellipsis={{
                      rows: 20,
                      expandable: true,
                      symbol: "Read more..",
                    }}
                    className={styles.paragraph}
                  >
                    {newsContent.content}
                  </Paragraph>
                </PageHeader>
              ) : null
            ) : (
              <Spin className={styles.spin} />
            )}
          </Col>
        </Row>
      </Content>
      <Divider />
      <Footer className={styles.footer}>{dayjs(today).format("LL")}</Footer>
    </>
  );
};

export default MainPage;
