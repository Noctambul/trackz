import { Typography } from "antd";
import { useIpfs } from "hooks/useIpfs";
import Image from "next/image";
import styles from "./Song.module.less";

import { PlaySquareOutlined } from "@ant-design/icons";
import { TokenMetadata } from "pages";

interface SongProps {
  key: number;
  metadata: TokenMetadata;
}

const { Title, Text } = Typography;

export default function Song({ metadata }: SongProps): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <Image
          className={styles.coverImage}
          alt="cover"
          src={resolveLink(metadata.image)}
          layout="fill"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.cardHeader}>
          <Title level={5}>{metadata.name}</Title>
          <Text type="secondary">Author</Text>
        </div>
        <div className={styles.player}></div>
      </div>
      <div className={styles.actionContainer}>
        <PlaySquareOutlined />
        {/* <PauseOutlined /> */}
      </div>
    </div>
  );
}
