import trackzs from "data/trackzs";
import { useTime } from "hooks/useTime";

describe("Audio Player", () => {
  it("should display the player when selected a Trackz", () => {
    const trackzIndex = 1;
    const trackz = trackzs[trackzIndex];
    const { formatTime } = useTime();

    const getInPlayer = (selector: string) =>
      cy.get(`[aria-label="Audio Player"] ${selector}`);

    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "Audio").as("createAudio");
      },
    });

    cy.get(`[aria-label="Audio Player"]`).should("not.exist");
    cy.get(
      `[aria-label="Trackz Card ${trackzIndex}"] [aria-label="Play Button"]`
    ).click();
    cy.get(`[aria-label="Audio Player"]`).should("exist");
    getInPlayer(`[aria-label="Title"]`).should("have.text", trackz.title);
    getInPlayer(`[aria-label="Author"]`).should("have.text", trackz.author);
    getInPlayer(`[aria-label="Duration"]`).should(
      "have.text",
      formatTime(trackz.duration)
    );

    cy.get("@createAudio").should("have.been.called");
  });
});

export {};
