import { Heading, IconButton } from "@chakra-ui/react";
import PageContainer from "common/components/PageContainer/PageContainer";
import TrackzCardList from "common/components/TrackzCard/TrackzCardList";
import { useWeb3 } from "common/context/Web3Context";
import { useAudio } from "modules/audio/context/AudioContext";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RiPlayListAddFill } from "react-icons/ri";

export default function UserPage(): JSX.Element {
  const router = useRouter();
  const { wallet } = router.query;
  const { audioTrackzs } = useWeb3();
  const { setPlaylist } = useAudio();
  const createdTrackzs = useMemo(
    () => audioTrackzs.filter((track) => track.creator === wallet),
    [audioTrackzs, wallet]
  );

  return (
    <PageContainer>
      <div className="flex flex-col gap-8">
        <Heading size="lg" as="h1">
          {wallet}
        </Heading>

        <div>
          <Heading size="lg" as="h2">
            Created
            <IconButton
              ml="2"
              variant="ghost"
              onClick={() => setPlaylist(createdTrackzs)}
              aria-label="Set created trackz as playlist"
              icon={<RiPlayListAddFill />}
            />
          </Heading>
          <TrackzCardList trackzs={createdTrackzs} />
        </div>
      </div>
    </PageContainer>
  );
}
