import { Layout, Typography } from "antd";
import React from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./PageContainer.module.scss";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <Title>WhereIsTheMix</Title>
          <ConnectButton />
        </Header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
    </>
  );
}
