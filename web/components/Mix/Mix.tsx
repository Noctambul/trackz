import { Typography, Space, Card } from "antd";
import styles from "./Mix.module.scss";
import Image from "next/image";

type MixProps = {
  title: string;
  author: string;
  soundUri: string;
  coverUri: string;
  children: React.ReactChild;
};

const { Title, Text } = Typography;

export default function Mix({
  title,
  children,
  soundUri,
  coverUri,
  author,
}: MixProps): JSX.Element {
  const buildIpfsUrl = (ipfsUri: string) => {
    return ipfsUri.includes("http")
      ? ipfsUri
      : `https://gateway.moralisipfs.com/ipfs/${ipfsUri.split("ipfs://")[1]}`;
  };

  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Image
            alt="cover"
            src={buildIpfsUrl(coverUri)}
            width={100}
            height={100}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.cardHeader}>
            <Title level={5}>{title}</Title>
            <Text type="secondary">{author}</Text>
          </div>
        </div>
      </div>

      <div className={styles.player}>
        <audio controls src={buildIpfsUrl(soundUri)}></audio>
      </div>
    </Card>
  );
}
