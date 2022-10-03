import { IconButton } from "@chakra-ui/react";
import PageContainer from "common/components/PageContainer/PageContainer";
import TrackzCardList from "common/components/TrackzCard/TrackzCardList";
import { useWeb3 } from "common/context/Web3Context";
import { formatWallet } from "common/utils/format";
import EthWalletAddressSchema from "lib/schema/eth-wallet-address-schema";
import { useAudio } from "modules/audio/context/AudioContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import { z } from "zod";

const QueryParamsSchema = z.object({
  user: EthWalletAddressSchema.optional(),
});

export default function UserPage(): JSX.Element {
  const router = useRouter();
  const { user } = QueryParamsSchema.parse(router.query);
  const { audioTrackzs } = useWeb3();
  const { setPlaylist } = useAudio();
  const createdTrackzs = useMemo(
    () => audioTrackzs.filter((track) => track.creator === user),
    [audioTrackzs, user]
  );

  return (
    <>
      <Head>
        <title>{formatWallet(user)} Profile</title>
      </Head>
      <PageContainer>
        <div className="flex flex-col gap-8">
          <h1>{formatWallet(user)}</h1>

          <div>
            <h2>
              Created
              <IconButton
                ml="2"
                variant="ghost"
                onClick={() => setPlaylist(createdTrackzs, true)}
                aria-label="Set created trackz as playlist"
                icon={<RiPlayListAddFill />}
              />
            </h2>
            <TrackzCardList trackzs={createdTrackzs} />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
