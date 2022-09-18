import PageContainer from "components/PageContainer/PageContainer";
import { useAudio } from "context/AudioContext";
import { useIpfs } from "hooks/useIpfs";
import AudioTrackz from "models/AudioTrackz";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { z } from "zod";

const TrackPageQueriesSchema = z.object({
  tid: z.preprocess(
    (str) => parseInt(str as string, 10),
    z.number().int().nonnegative()
  ),
});

// type TrackPageQueries = z.infer<typeof TrackPageQueriesSchema>;

export default function TrackPage(): JSX.Element {
  const router = useRouter();
  const { playlist } = useAudio();
  const [track, setTrack] = useState<AudioTrackz>();
  const [isTrackNotFoundError, setTrackNotFoundError] = useState(false);
  const { resolveLink } = useIpfs();

  useEffect(() => {
    if (!router.isReady) return;
    const { tid } = TrackPageQueriesSchema.parse(router.query);
    const selectedTrack = playlist.find((t) => t.id === tid);

    if (selectedTrack) {
      setTrack(selectedTrack);
    } else if (playlist && playlist.length > 0) {
      setTrackNotFoundError(true);
    }
  }, [router.isReady, playlist, router.query]);

  return (
    <PageContainer
      isLoading={!Boolean(track) && !isTrackNotFoundError}
      disableMargins
    >
      <div className="flex h-full w-full flex-col items-center">
        <div className="relative h-full w-full">
          <Image
            src={resolveLink(track?.metadata.coverUri)}
            layout="fill"
            objectFit="contain"
            alt={track?.name}
            quality={100}
          />
        </div>
        <div className="flex h-16 w-full items-center justify-center">
          <h1>{track?.name}</h1>
        </div>

        <div>
          {isTrackNotFoundError && `Trackz ${router.query.tid} not found`}
        </div>
      </div>
    </PageContainer>
  );
}
