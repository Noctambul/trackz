import TrackzCard from "components/TrackzCard/TrackzCard";
import { AudioProvider } from "context/AudioContext";
import trackzs from "data/trackzs";

describe("TrackzCard.tsx", () => {
  const trackz = trackzs[0];

  it("renders card", () => {
    cy.mount(
      <AudioProvider>
        <TrackzCard trackz={trackz} />
      </AudioProvider>
    );
    cy.get(`[aria-label="Title"]`).contains(trackz.title);
    cy.get(`[aria-label="Author"]`).contains(trackz.author);
  });
});
