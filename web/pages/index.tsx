import { Layout, Space } from "antd";
import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import { Typography } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import Mix from "components/Mix/Mix";
import { mixes } from "../helpers/mixes";

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
        {mixes.map((mix, i) => (
          <Mix
            key={i}
            title={mix.name}
            author={mix.author}
            ipfsCid={mix.ipfsCid}
          >
            Allow
          </Mix>
        ))}
      </Space>
    </PageContainer>
  );
};

export default Home;
