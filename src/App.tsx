import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import MainHeader from "./Layouts/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";

import { Divider, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const App: React.FC = () => {
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Header className="header">
          <MainHeader />
        </Header>
        <Content>
          <MainPage />
        </Content>
        {/* <Divider /> */}
        {/* <Footer>December 2021</Footer> */}
      </Layout>
    </div>
  );
};

export default App;
