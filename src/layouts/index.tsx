// import { Link, Outlet } from 'umi';
// import styles from './index.less';

// export default function Layout() {
//   return (
//     <div className={styles.navs}>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/docs">Docs</Link>
//         </li>
//         <li>
//           <a href="https://github.com/umijs/umi">Github</a>
//         </li>
//       </ul>
//       <Outlet />
//     </div>
//   );
// }

import { getUserInfo } from "@/services/api";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, Space, Spin, theme } from "antd";
import React from "react";
import styles from "./style.module.less";

const { Header, Content, Sider } = Layout;

// const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey: any = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const testBtn = async () => {
    console.log(123);
    await getUserInfo();
  };

  return (
    <Layout className={styles.layout}>
      <Header className="header">
        <div className="title">社区管理平台</div>
        <Space>
          <Spin spinning={false}>鑫鹏</Spin>
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="menuLayout"
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "16px" }}>
          <Content
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
            className="contentLayout"
          >
            Content
            <Button onClick={testBtn}>click</Button>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
