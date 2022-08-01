import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useIpfs } from "hooks/useIpfs";
import Image from "next/image";
import { useContext } from "react";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer(): JSX.Element {
  const { resolveLink } = useIpfs();
  const {
    isPlaying,
    trackProgress,
    duration,
    toggle,
    toPrevTrack,
    toNextTrack,
    onSearch,
    onSearchEnd,
    onVolume,
    currentSongMetadata,
  } = useContext(AudioContext) as AudioContextInterface;

  const minSec = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.controls}>
        {/* <StepBackwardOutlined
          className={styles.controlBtn}
          onClick={toPrevTrack}
        />
        {isPlaying ? (
          <PauseOutlined className={styles.controlBtn} onClick={toggle} />
        ) : (
          <CaretRightOutlined
            className={`${styles.controlBtn} ${styles.playBtn}`}
            onClick={toggle}
          />
        )}
        <StepForwardOutlined
          className={styles.controlBtn}
          onClick={toNextTrack}
        /> */}
      </div>
      <div className={[styles.controls, styles.progressContainer].join(" ")}>
        {minSec(trackProgress)}
        {/* <Slider
          value={trackProgress}
          step={1}
          min={0}
          max={duration ? duration : 0}
          className={styles.progress}
          tooltipVisible={false}
          onChange={(value) => onSearch(value)}
          onAfterChange={onSearchEnd}
        /> */}
        {duration ? minSec(Math.round(duration)) : "00:00"}
      </div>
      <div className={styles.controls}>
        {/* <SoundOutlined />
        <Slider
          className={styles.volume}
          defaultValue={100}
          tooltipVisible={false}
          onChange={(value) => onVolume(value / 100)}
        /> */}
      </div>
      <div className={styles.songInfo}>
        {currentSongMetadata && (
          <Image
            className="cover"
            src={resolveLink(currentSongMetadata?.image)}
            alt="currentCover"
            width={20}
            height={20}
          />
        )}
        <div>
          <div className="songTitle">{currentSongMetadata?.name}</div>
          {/* <div className="songAlbum">{url[trackIndex].name}</div> */}
        </div>
      </div>
    </div>
    // <>
    //   <div
    //     className="buttons"
    //     style={{ width: "300px", justifyContent: "start" }}
    //   >
    //     {currentSongMetadata && (
    //       <Image
    //         className="cover"
    //         src={resolveLink(currentSongMetadata?.image)}
    //         alt="currentCover"
    //         width={100}
    //         height={100}
    //       />
    //     )}
    //     <div>
    //       <div className="songTitle">{currentSongMetadata?.name}</div>
    //       {/* <div className="songAlbum">{url[trackIndex].name}</div> */}
    //     </div>
    //   </div>
    //   <div>
    //     <div className="buttons">
    //       <StepBackwardOutlined className="forback" onClick={toPrevTrack} />
    //       {isPlaying ? (
    //         <PauseCircleFilled className="pauseplay" onClick={toggle} />
    //       ) : (
    //         <PlayCircleFilled className="pauseplay" onClick={toggle} />
    //       )}
    //       <StepForwardOutlined className="forback" onClick={toNextTrack} />
    //     </div>
    //     <div className="buttons">
    //       {minSec(trackProgress)}
    //       <Slider
    //         value={trackProgress}
    //         step={1}
    //         min={0}
    //         max={duration ? duration : 0}
    //         className="progress"
    //         tooltipVisible={false}
    //         onChange={(value) => onSearch(value)}
    //         onAfterChange={onSearchEnd}
    //       />
    //       {duration ? minSec(Math.round(duration)) : "00:00"}
    //     </div>
    //   </div>
    //   <div className="soundDiv">
    //     <SoundOutlined />
    //     <Slider
    //       className="volume"
    //       defaultValue={100}
    //       tooltipVisible={false}
    //       onChange={(value) => onVolume(value / 100)}
    //     />
    //   </div>
    // </>
  );
}
