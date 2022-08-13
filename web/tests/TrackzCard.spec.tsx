import { expect, test } from "@playwright/experimental-ct-react";
import TrackzCard from "../components/TrackzCard/TrackzCard";
import { AudioProvider } from "../context/AudioContext";
import trackzs from "../data/trackzs";

test.use({ viewport: { width: 500, height: 500 } });

test("it renders", async ({ mount, page }) => {
  // const icon = await mount(<IoPlayCircleOutline />);
  // const iconBtn = await mount(<IconButton Icon={IoPlayCircleOutline} />);
  // const component = await mount(<TrackzCard trackz={trackzs[0]} />);
  // await mount(<IoPlayCircleOutline />);
  const component = await mount(
    <AudioProvider>
      <TrackzCard trackz={trackzs[0]} />
    </AudioProvider>
  );
  await page.pause();

  await expect(component).toBeDefined();
});
