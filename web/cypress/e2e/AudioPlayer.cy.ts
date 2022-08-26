import trackzs from "data/trackzs";
import TrackzMetadata from "models/TrackzMetadata";

describe("Audio Player", () => {
  beforeEach(() => {});

  context("when visiting the home", () => {
    it("should display the player with the first track selected", () => {
      cy.visit("/");
      cy.get(`[aria-label="Audio Player"]`)
        .should("be.visible")
        .log("The Audio Player is visible");
      shouldHaveTrack(trackzs[0]);
    });
  });

  context("when playing a track from the cards", () => {
    const trackIndex = 1;
    const track = trackzs[trackIndex];

    beforeEach(() => {
      cy.visit("/");
      cy.get(`[aria-label="Play ${track.title}"]`).click();
    });

    afterEach(() => {
      cy.get(`[aria-label="Pause Button"]`).click().log("Stop playing");
    });

    it("display the new track in the player", () => {
      shouldHaveTrack(track);
    });

    it("display the pause button because the music is playing", () => {
      cy.get(`[aria-label="Pause Button"]`).should("exist");
    });
  });

  it.skip("should display the player when selected a Trackz", () => {
    // const trackzIndex = 1;
    // const trackz = trackzs[trackzIndex];

    cy.visit("/", {
      onBeforeLoad(win) {
        // cy.stub(win, "Audio").as("createAudio");
      },
    });

    // expect(true, "Un test vrai").to.be.true;
    // cy.get(
    //   `[aria-label="Trackz Card ${trackzIndex}"] [aria-label="Play Button"]`
    // ).click();

    // cy.get(`[aria-label="Audio Player"]`).should("exist");
    // getInPlayer(`[aria-label="Title"]`).should("have.text", trackz.title);
    // getInPlayer(`[aria-label="Author"]`).should("have.text", trackz.author);
    // getInPlayer(`[aria-label="Duration"]`).should(
    //   "have.text",
    //   formatTime(trackz.duration)
    // );

    // cy.get(
    //   `[aria-label="Trackz Card ${trackzIndex}"] [aria-label="Play Button"]`
    // ).click();

    // cy.get("@createAudio").should("have.been.called");
  });
});

function getInPlayer(selector: string) {
  return cy.get(`[aria-label="Audio Player"] ${selector}`);
}

function shouldHaveTrack(track: TrackzMetadata) {
  getInPlayer(`[aria-label="Title"]`).should("have.text", track.title);
  getInPlayer(`[aria-label="Author"]`).should("have.text", track.author);
  // getInPlayer(`[aria-label="Duration"]`).should("have.text", "00:00");
  cy.log(`The Trackz ${track.id} is well displayed in the player`);
}

export {};
