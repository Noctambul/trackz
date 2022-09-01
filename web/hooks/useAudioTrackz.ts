import AudioTrackz from "models/AudioTrackz";
import { useEffect, useState } from "react";

export default function useAudioTrackz(track: AudioTrackz | undefined) {
  const [duration, setDuration] = useState<number>(track?.duration || 0);

  useEffect(() => {
    if (track) {
      if (!track.isLoaded) {
        track.onloaded = () => {
          console.log(
            `useAudioTrackz ${track.name} onLoaded with duration ${track.duration}`
          );
          setDuration(track.duration);
        };
      } else {
        setDuration(track.duration);
      }
    }
  }, [duration, track]);

  return { duration };
}
