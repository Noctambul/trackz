import { Typography } from "antd";
import Image from "next/image";
import styles from "./Song.module.less";

type MixProps = {
  title: string;
  author: string;
  soundUri: string;
  coverUri: string;
  children: React.ReactChild;
};

const { Title, Text } = Typography;

export default function Song({
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
    <div className={styles.card}>
      {/* <div className={styles.left}></div>
      <div className={styles.right}></div> */}
      <div className={styles.left}>
        <Image
          className={styles.coverImage}
          alt="cover"
          src={buildIpfsUrl(coverUri)}
          layout="fill"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.cardHeader}>
          <Title level={5}>{title}</Title>
          <Text type="secondary">{author}</Text>
        </div>
        <div className={styles.player}>
          <audio controls src={buildIpfsUrl(soundUri)}></audio>
        </div>
      </div>
    </div>
  );
}
