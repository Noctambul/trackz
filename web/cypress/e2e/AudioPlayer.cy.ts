import trackzs from "data/trackzs";
import TrackzMetadata from "models/TrackzMetadata";

describe("Audio Player", () => {
  beforeEach(() => cy.visit("/"));

  afterEach(() => {
    cy.get(`[aria-label="Audio Player"]`).then((player) => {
      if (player.find(`[aria-label="Pause Track"]`).length > 0) {
        getInPlayer(`[aria-label="Pause Track"]`).click();
      }
    });
    cy.log("Stop playing");
  });

  context("when visiting the home", () => {
    it("display the player with the first track selected", () => {
      cy.get(`[aria-label="Audio Player"]`)
        .should("be.visible")
        .log("The Audio Player is visible");
      shouldHaveTrack(trackzs[0]);
    });

    it("disable the previous track button", () => {
      getInPlayer(`[aria-label="Previous Track"]`).should("be.disabled");
    });
  });

  context("when playing a track from the cards", () => {
    const trackIndex = 1;
    const track = trackzs[trackIndex];

    beforeEach(() => cy.get(`[aria-label="Play ${track.name}"]`).click());

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

    beforeEach(() => getInPlayer(`[aria-label="Next Track"]`).click());

    it("display the right trackz when switching", () => {
      shouldHaveTrack(trackzs[1]);
      getInPlayer(`[aria-label="Previous Track"]`).click();
      shouldHaveTrack(trackzs[0]);
    });

    it("play the track directly", () => {
      // Pause Button means it is playing
      getInPlayer(`[aria-label="Pause Track"]`).should("exist");
    });

    it("can't loop over the last track", () => {
      getInPlayer(`[aria-label="Next Track"]`).click();
      getInPlayer(`[aria-label="Next Track"]`).click();
      getInPlayer(`[aria-label="Next Track"]`).click();
      getInPlayer(`[aria-label="Next Track"]`).should("be.disabled");
    });
  });

  context("when using volume", () => {
    it("mute and unmute when clicking the volume button", () => {
      getInPlayer(`[aria-label="Mute"]`)
        .should("exist")
        .click()
        .should("not.exist")
        .log("sound has been muted");
      getInPlayer(`[aria-label="Unmute"]`)
        .should("exist")
        .click()
        .should("not.exist")
        .log("sound has been unmuted");
    });
  });
});

function getInPlayer(selector: string) {
  return cy.get(`[aria-label="Audio Player"] ${selector}`);
}

function shouldHaveTrack(track: TrackzMetadata) {
  getInPlayer(`[aria-label="Title"]`).should("have.text", track.name);
  getInPlayer(`[aria-label="Author"]`).should("have.text", track.owner);
  // getInPlayer(`[aria-label="Duration"]`).should("have.text", "00:00");
  cy.log(`The Trackz ${track.id} is well displayed in the player`);
}

export {};
