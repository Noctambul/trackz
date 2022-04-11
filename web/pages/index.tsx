import { Layout, Space } from "antd";
import type { NextPage } from "next";
import ConnectButton from "../components/ConnectButton/ConnectButton";
import styles from "styles/Home.module.scss";
import { Typography } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import Mix from "components/Mix/Mix";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Space
        direction="vertical"
        align="center"
        size="middle"
        className={styles.mixContainer}
      >
        <Mix title="Singularity" author="Jon Hopkins">
          Coucou
        </Mix>
        <Mix title="Singularity" author="Jon Hopkins">
          Coucou
        </Mix>
        <Mix title="Singularity" author="Jon Hopkins">
          Coucou
        </Mix>
        <Mix title="Singularity" author="Jon Hopkins">
          Coucou
        </Mix>
      </Space>
    </PageContainer>
  );
};

export default Home;
