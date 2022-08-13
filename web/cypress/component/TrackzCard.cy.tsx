import TrackzCard from "components/TrackzCard/TrackzCard";
import { AudioProvider } from "context/AudioContext";
import trackzs from "data/trackzs";

describe("TrackzCard.cy.ts", () => {
  it("renders card", () => {
    const component = cy.mount(
      <AudioProvider>
        <TrackzCard trackz={trackzs[0]} />
      </AudioProvider>
    );
    component.get("h1").contains("Hello");
    component.get("p").contains("World");
  });
});
