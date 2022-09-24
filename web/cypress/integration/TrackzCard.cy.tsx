import TrackzCard from "common/components/TrackzCard/TrackzCard";
import { formatTime } from "hooks/useTime";
import AudioTrackz from "models/AudioTrackz";
import trackzs from "../fixtures/trackzs";

describe("TrackzCard.tsx", () => {
  const trackz = new AudioTrackz(trackzs[0]);

  before(() => {
    cy.stub(trackz, "load");
    Object.defineProperty(trackz, "duration", {
      get: cy.stub().returns(233),
    });
  });

  it("renders card", () => {
    const func = () => {};
    cy.mount(
      <TrackzCard
        trackz={trackz}
        isPlaying={false}
        isSelected={false}
        trackProgress={0}
        play={func}
        pause={func}
      />
    );

    cy.get(`[aria-label="Title"]`).should("have.text", trackz.name);
    cy.get(`[aria-label="Author"]`).should(
      "have.text",
      `by ${trackz.metadata.creator}`
    );
    cy.get(`[aria-label="Duration"]`).should(
      "have.text",
      formatTime(trackz.duration)
    );
    cy.get(`[aria-label="Supply"]`).should(
      "have.text",
      `Supplyx${trackz.metadata.totalSupply}`
    );
    cy.get(`[aria-label="Price"]`).should(
      "contain.text",
      trackz.metadata.price
    );
  });
});
