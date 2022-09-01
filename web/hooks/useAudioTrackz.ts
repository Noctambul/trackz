import AudioTrackz from "models/AudioTrackz";
import { useEffect, useState } from "react";

export default function useAudioTrackz(track: AudioTrackz | undefined) {
  const [duration, setDuration] = useState<number>(track?.duration || 0);

  useEffect(() => {
    if (track) {
      if (!track.isLoaded && track.onloaded === undefined) {
        track.onloaded = (loadedTrack: AudioTrackz) => {
          console.log(
            `useAudioTrackz ${loadedTrack.name} onLoaded with duration ${loadedTrack.duration}`
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
