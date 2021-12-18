import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import MainHeader from "./Layouts/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";

import { Layout } from "antd";

const { Header, Content } = Layout;
const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <MainPage />
        {/* <Header className="header">
          <MainHeader />
        </Header>
        <Content>
          <MainPage />
        </Content> */}
        {/* <Divider /> */}
        {/* <Footer>December 2021</Footer> */}
      </Layout>
    </div>
  );
};

export default App;
