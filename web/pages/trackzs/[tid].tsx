import { Heading, Tag } from "@chakra-ui/react";
import PageContainer from "common/components/PageContainer/PageContainer";
import { useIpfs } from "common/hooks/useIpfs";
import { useAudio } from "modules/audio/context/AudioContext";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
    <>
      <Head>
        <title>{track?.name || "Trackz"}</title>
      </Head>
      <PageContainer isLoading={!Boolean(track)}>
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
              <Heading size="xl" as="h1" mt={4} mb={2} aria-label="Track Name">
                {track?.name}
              </Heading>
              <Heading
                color="subtext"
                size="md"
                as="h2"
                ml={1}
                aria-label="Creator"
              >
                <Link href={`/users/${track?.creator}`}>
                  {track?.formatedCreator}
                </Link>
              </Heading>
            </div>

            <p aria-label="Track Description">{track?.metadata.description}</p>

            <Heading size="md" as="h3" aria-label="Track Tags">
              Musical Genres
            </Heading>
            <div className="flex gap-2" aria-label="Track Tags">
              {track?.metadata.genres?.map((genre) => (
                <Tag variant="outline" key={genre}>
                  {genre}
                </Tag>
              ))}
            </div>

            <Heading size="md" as="h3" aria-label="Track Tags">
              Tags
            </Heading>
            <div className="flex gap-2" aria-label="Track Tags">
              {track?.metadata.tags
                ?.split(",")
                .filter((tag) => Boolean(tag))
                .map((tag) => (
                  <Tag variant="outline" key={tag}>
                    {tag.trim()}
                  </Tag>
                ))}
            </div>

            <p className="font-bold" aria-label="Track Supply">
              Edition of {track?.metadata.totalSupply}
            </p>

            <p>
              Fake <br></br>
              Medium: JPG | 1080x1080px | 358.13KB. Minted on: Tuesday,
              September 20, 2022.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
