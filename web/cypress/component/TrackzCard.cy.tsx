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
    component.get(`[aria-label="Title"]`).contains(trackz.title);
    component.get(`[aria-label="Author"]`).contains(trackz.author);
  });
});
