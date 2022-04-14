import { Typography, Space, Card } from "antd";
import styles from "./Mix.module.scss";
import { pinataProvider } from "../../helpers/mixes";

type MixProps = {
  title: string;
  author: string;
  ipfsCid: string;
  children: React.ReactChild;
};

const { Title, Text } = Typography;

export default function Mix({
  title,
  children,
  ipfsCid,
  author,
}: MixProps): JSX.Element {
  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <Title level={5}>{title}</Title>
        <Text type="secondary">{author}</Text>
      </div>
      <div className={styles.cardContent}>
        {/* <WaveSurfer></WaveSurfer> */}
        <audio controls src={`${pinataProvider}/${ipfsCid}`}></audio>
      </div>
    </Card>
  );
}
