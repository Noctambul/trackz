import { Typography } from "antd";
import { useIpfs } from "hooks/useIpfs";
import Image from "next/image";
import styles from "./Song.module.less";

import { PlaySquareOutlined } from "@ant-design/icons";
import useAudio from "hooks/useAudio";

type MixProps = {
  title: string;
  author: string;
  soundUri: string;
  coverUri: string;
};

const { Title, Text } = Typography;

export default function Song({
  title,
  soundUri,
  coverUri,
  author,
}: MixProps): JSX.Element {
  const { resolveLink } = useIpfs();
  const {} = useAudio();

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <Image
          className={styles.coverImage}
          alt="cover"
          src={resolveLink(coverUri)}
          layout="fill"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.cardHeader}>
          <Title level={5}>{title}</Title>
          <Text type="secondary">{author}</Text>
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
