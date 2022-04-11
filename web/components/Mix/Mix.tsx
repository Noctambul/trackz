import { Typography, Space, Card } from "antd";
import styles from "./Mix.module.scss";

type MixProps = {
  title: string;
  author: string;
  children: React.ReactChild;
};

const { Title, Text } = Typography;

export default function Mix({
  title,
  children,
  author,
}: MixProps): JSX.Element {
  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <Title level={5}>{title}</Title>
        <Text type="secondary">{author}</Text>
      </div>
      <div className={styles.cardContent}>CONTENT</div>
    </Card>
  );
}
