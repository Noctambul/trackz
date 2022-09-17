import { useMemo } from "react";

export default function useDeviceDetection() {
  const isMobile = useMemo(() => {
    if (
      typeof window === "undefined" ||
      typeof window.navigator === "undefined"
    )
      return;

    return Boolean(
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
  }, []);

  return { isMobile };
}
