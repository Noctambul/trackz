import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useCallback, useMemo, useState } from "react";
import useEnvironment from "./useEnvironment";

export default function useWalletConnector() {
  const [TRACKZ_TEST_WALLET_ADDRESS, setTRACKZ_TEST_WALLET_ADDRESS] =
    useState<string>();
  const { isTestMode } = useEnvironment();
  const walletAddress = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  const address = useMemo(
    () => (isTestMode ? TRACKZ_TEST_WALLET_ADDRESS : walletAddress),
    [walletAddress, isTestMode, TRACKZ_TEST_WALLET_ADDRESS]
  );

  const connectWallet = useCallback(
    isTestMode
      ? async () =>
          setTRACKZ_TEST_WALLET_ADDRESS(
            "0x062716F0a81D5A1986f3Cc45601b0d5f5881249f"
          )
      : connectWithMetamask,
    [isTestMode]
  );

  const disconnectWallet = useCallback(
    isTestMode
      ? async () => setTRACKZ_TEST_WALLET_ADDRESS(undefined)
      : disconnect,
    [isTestMode]
  );

  return { address, connectWallet, disconnectWallet };
}
