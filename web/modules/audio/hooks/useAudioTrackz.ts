import AudioTrackz from "modules/audio/models/AudioTrackz";
import { useEffect, useState } from "react";

export default function useAudioTrackz(track: AudioTrackz | undefined) {
  const [duration, setDuration] = useState<number>(track?.duration || 0);

  useEffect(() => {
    track?.onloaded((loadedTrack: AudioTrackz) =>
      setDuration(loadedTrack.duration)
    );
  }, [duration, track]);

  return { duration };
}
