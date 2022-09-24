import { useMemo } from "react";

export default function useDeviceDetection() {
  /**
   * TODO: Try useing useBreakpointValue
   * @see https://chakra-ui.com/docs/hooks/use-breakpoint-value#import
   */
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
