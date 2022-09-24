import { Heading, Tag } from "@chakra-ui/react";
import PageContainer from "components/PageContainer/PageContainer";
import { useIpfs } from "hooks/useIpfs";
import AudioTrackz from "models/AudioTrackz";
import { useAudio } from "modules/audio/context/AudioContext";
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
  const { resolveLink } = useIpfs();

  useEffect(() => {
    if (!router.isReady) return;
    const { tid } = TrackPageQueriesSchema.parse(router.query);
    const selectedTrack = playlist.find((t) => t.id === tid);

    if (selectedTrack) {
      setTrack(selectedTrack);
    } else if (playlist && playlist.length > 0) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, playlist, router.query]);

  return (
    <PageContainer
      isLoading={!Boolean(track)}
      // disableMargins
    >
      <div className="flex h-full w-full flex-col items-center">
        <div className="relative h-[95vh] w-full">
          <Image
            src={resolveLink(track?.metadata.coverUri)}
            layout="fill"
            objectFit="contain"
            alt={track?.name}
            quality={100}
          />
        </div>
        <div className="flex h-16 w-full flex-col gap-6">
          <div>
            <Heading size="xl" as="h1" mt={4} mb={2}>
              {track?.name}
            </Heading>
            <Heading color="subtext" size="md" as="h2" ml={1}>
              {track?.creator}
            </Heading>
          </div>

          <p>{track?.metadata.description}</p>

          <div className="flex gap-2">
            {track?.metadata.tags?.split(",").map((tag) => (
              <Tag bg="bgc" color="white" variant="solid" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>

          <p className="font-bold">Edition of {track?.metadata.totalSupply}</p>

          <p>
            Medium: JPG | 1080x1080px | 358.13KB. Minted on: Tuesday, September
            20, 2022.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
