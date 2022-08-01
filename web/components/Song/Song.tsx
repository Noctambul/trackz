import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { TokenMetadata } from "context/Web3Context";
import { useIpfs } from "hooks/useIpfs";
import Image from "next/image";
import { useContext } from "react";
import styles from "./Song.module.css";

interface SongProps {
  key: number;
  metadata: TokenMetadata;
}

export default function Song({ metadata }: SongProps): JSX.Element {
  const { resolveLink } = useIpfs();
  const { play, pause, isPlaying, currentSongMetadata } = useContext(
    AudioContext
  ) as AudioContextInterface;

  const isPlayingMe = () => isPlaying && currentSongMetadata === metadata;

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
          {/* <Title level={5}>{metadata.name}</Title>
          <Text type="secondary">Author</Text> */}
        </div>
        <div className={styles.player}></div>
      </div>
      <div className={styles.actionContainer}>
        {/* {isPlayingMe() ? (
          <PauseOutlined className={styles.pauseplay} onClick={pause} />
        ) : (
          <PlaySquareOutlined
            className={styles.pauseplay}
            onClick={() => play(metadata)}
          />
        )} */}
        {/* <Button
          ghost
          onClick={() => (isPlayingMe() ? pause() : play(metadata))}
        >
          {isPlayingMe() ? <PauseOutlined /> : <PlaySquareOutlined />}
        </Button> */}
      </div>
    </div>
  );
}
