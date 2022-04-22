import { Button, Typography } from "antd";
import { useIpfs } from "hooks/useIpfs";
import Image from "next/image";
import styles from "./Song.module.less";

import { PauseOutlined, PlaySquareOutlined } from "@ant-design/icons";
import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";

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
  const { play, pause, isPlaying, currentSongUri } = useContext(
    AudioContext
  ) as AudioContextInterface;

  const isPlayingMe = () => isPlaying && currentSongUri === soundUri;

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
        <Button onClick={() => (isPlayingMe() ? pause() : play(soundUri))}>
          {isPlayingMe() ? <PauseOutlined /> : <PlaySquareOutlined />}
        </Button>
      </div>
    </div>
  );
}
