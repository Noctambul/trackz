import { Layout } from "antd";
import type { NextPage } from "next";
import ConnectButton from "../components/ConnectButton/ConnectButton";
import styles from "styles/Home.module.scss";
import { Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <h1>WhereIsTheMix</h1>
          <ConnectButton />
        </Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default Home;
