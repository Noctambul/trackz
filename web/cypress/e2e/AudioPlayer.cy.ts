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
      cy.get(`[aria-label="Pause Track"]`).click().log("Stop playing");
    });

    it("display the new track in the player", () => {
      shouldHaveTrack(track);
    });

    it("display the pause button because the music is playing", () => {
      cy.get(`[aria-label="Pause Track"]`).should("exist");
    });
  });

  context("when using next and prev trackz", () => {
    // TEST
    // cy.visit("/", {
    //   onBeforeLoad(win) {
    //     // cy.stub(win, "Audio").as("createAudio");
    //   },
    // });

    beforeEach(() => {
      cy.visit("/");
      getInPlayer(`[aria-label="Next Track"]`).click();
    });

    it("display the right trackz when switching", () => {
      shouldHaveTrack(trackzs[1]);
      getInPlayer(`[aria-label="Previous Track"]`).click();
      shouldHaveTrack(trackzs[0]);
    });

    it("does not change the playing state", () => {
      getInPlayer(`[aria-label="Play Track"]`).should("exist");
    });
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
