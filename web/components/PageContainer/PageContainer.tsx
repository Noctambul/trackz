import { Layout } from "antd";
import type { NextPage } from "next";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Typography } from "antd";
import React from "react";
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
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}
