import { Layout, Menu, Typography } from "antd";
import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import { Web3Context, Web3ContextInterface } from "context/Web3Context";
import Link from "next/link";
import React, { useContext } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from "./PageContainer.module.less";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function PageContainer({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  const { currentAccount } = useContext(Web3Context) as Web3ContextInterface;

  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <Title>
            <Link href=".">WhereIsTheMix</Link>
          </Title>
          <Menu className={styles.rightMenu}>
            {currentAccount && (
              <Menu.Item key="mint">
                <Link href="mint">Mint</Link>
              </Menu.Item>
            )}
            <ConnectButton />
          </Menu>
        </Header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>
          <AudioPlayer></AudioPlayer>
        </Footer>
      </Layout>
    </>
  );
}
