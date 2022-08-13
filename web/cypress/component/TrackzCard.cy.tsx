import TrackzCard from "components/TrackzCard/TrackzCard";
import { AudioProvider } from "context/AudioContext";
import trackzs from "data/trackzs";

describe("TrackzCard.cy.ts", () => {
  const trackz = trackzs[0];

  it("renders card", () => {
    const component = cy.mount(
      <AudioProvider>
        <TrackzCard trackz={trackz} />
      </AudioProvider>
    );
    component
      .get(".ml-2.flex.flex-col.justify-center > .truncate.text-lg.text-text")
      .contains(trackz.title);
  });
});
