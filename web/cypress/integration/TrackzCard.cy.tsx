import TrackzCard from "components/TrackzCard/TrackzCard";
import { AudioProvider } from "context/AudioContext";
import trackzs from "data/trackzs";
import { useTime } from "hooks/useTime";

describe("TrackzCard.tsx", () => {
  const trackz = trackzs[0];
  const { formatTime } = useTime();

  it("renders card", () => {
    cy.mount(
      <AudioProvider>
        <TrackzCard trackz={trackz} />
      </AudioProvider>
    );

    cy.get(`[aria-label="Title"]`).should("have.text", trackz.name);
    cy.get(`[aria-label="Author"]`).should("have.text", `by ${trackz.owner}`);
    cy.get(`[aria-label="Duration"]`).should(
      "have.text",
      formatTime(trackz.duration)
    );
    cy.get(`[aria-label="Supply"]`).should(
      "have.text",
      `Supplyx${trackz.totalSupply}`
    );
    cy.get(`[aria-label="Price"]`).should("contain.text", trackz.price);
  });
});
