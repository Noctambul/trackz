import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import TrackzMetadata from "models/TrackzMetadata";
import trackzMetadata from "../fixtures/trackzs.json";

const trackzs = trackzMetadata.editions
  .map((metadata) => EditionMetadataSchema.parse(metadata))
  .reverse() as TrackzMetadata[];

describe.only("Audio Player", () => {
  const getInPlayer = (selector: string) =>
    cy.get(`[aria-label="Audio Player"] ${selector}`);

  const shouldHaveTrack = (index: number) => {
    const track = trackzs[index];
    getInPlayer(`[aria-label="Title"]`).should("have.text", track.name);
    getInPlayer(`[aria-label="Author"]`).should("have.text", track.creator);
    cy.log(`The Trackz ${track.id} is well displayed in the player`);
  };

  const stopPlayer = () =>
    cy.get(`[aria-label="Audio Player"]`).then((player) => {
      if (player.find(`[aria-label="Pause Track"]`).length > 0) {
        getInPlayer(`[aria-label="Pause Track"]`).click();
      }
    });

  const player = () => cy.get(`[aria-label="Audio Player"]`);
  const prevBtn = () => player().get(`[aria-label="Previous Track"]`);
  const nextBtn = () => player().get(`[aria-label="Next Track"]`);
  const playBtn = () => player().get(`[aria-label="Play Track"]`);
  const pauseBtn = () => player().get(`[aria-label="Pause Track"]`);
  const volBtn = () => player().get(`[aria-label="Volume controller"]`);
  const volSlider = () => cy.get(`[aria-label="Track volume"]`);
  // const volSlider = () => cy.get(`[data-test-volume-slider]`);

  beforeEach(() => {
    cy.fixture("trackzs")
      .as("trackzs")
      .then((trackzs: any[]) => {
        cy.intercept("GET", "api/trackzs", {
          statusCode: 200,
          body: trackzs,
        }).as("getTrackzs");
      });

    cy.visit("/");
  });

  afterEach(() => stopPlayer());

  context("when visiting the home", () => {
    it("displays the tracker with the first track selected", () => {
      player().should("exist");
      player().should("be.visible").log("The Audio Player is visible");
      shouldHaveTrack(0);
    });
  });

  it("can switch between trackz", () => {
    prevBtn().should("be.disabled");
    nextBtn().should("be.enabled");
    nextBtn().click();
    shouldHaveTrack(1);
    prevBtn().should("be.enabled");
    nextBtn().click();
    shouldHaveTrack(2);
    nextBtn().should("be.disabled");
    prevBtn().should("be.enabled");
    prevBtn().click();
    shouldHaveTrack(1);
    nextBtn().should("be.enabled");
    prevBtn().should("be.enabled");
  });

  it("automatically play audio when switching track", () => {
    nextBtn().click();
    playBtn().should("not.exist");
    pauseBtn().should("exist");
  });

  it("can play and pause music", () => {
    pauseBtn().should("not.exist");
    playBtn().should("exist");
    playBtn().click();
    pauseBtn().should("exist");
    playBtn().should("not.exist");
    pauseBtn().click();
    pauseBtn().should("not.exist");
    playBtn().should("exist");
  });

  it("can change the volume", () => {
    volBtn().should("exist");
    volSlider().should("not.be.visible");
    volBtn().trigger("mouseover");
    volSlider().should("be.visible");
    volBtn().trigger("mouseout");
    volSlider().should("not.be.visible");
  });
});

// describe.skip("Audio Player Skipped", () => {
//   // beforeEach(() => {
//   //   // cy.intercept("https://gateway.ipfscdn.io/ipfs")
//   //   cy.intercept("GET", "https://gateway.ipfscdn.io/", {
//   //     body: trackzs[0],
//   //   });
//   //   cy.visit("/");
//   // });

//   afterEach(() => {
//     cy.get(`[aria-label="Audio Player"]`).then((player) => {
//       if (player.find(`[aria-label="Pause Track"]`).length > 0) {
//         getInPlayer(`[aria-label="Pause Track"]`).click();
//       }
//     });
//     cy.log("Stop playing");
//   });

//   context("when visiting the home", () => {
//     it("display the player with the first track selected", () => {
//       cy.get(`[aria-label="Audio Player"]`)
//         .should("be.visible")
//         .log("The Audio Player is visible");
//       // shouldHaveTrack(trackzs[0]);
//     });

//     it("disable the previous track button", () => {
//       getInPlayer(`[aria-label="Previous Track"]`).should("be.disabled");
//     });
//   });

//   context("when playing a track from the cards", () => {
//     const trackIndex = 1;
//     // const track = trackzs[trackIndex];

//     // beforeEach(() => cy.get(`[aria-label="Play ${track.name}"]`).click());

//     it("display the new track in the player", () => {
//       // shouldHaveTrack(track);
//     });

//     it("display the pause button because the music is playing", () => {
//       cy.get(`[aria-label="Pause Track"]`).should("exist");
//     });
//   });

//   context("when using next and prev trackz", () => {
//     // TEST
//     // cy.visit("/", {
//     //   onBeforeLoad(win) {
//     //     // cy.stub(win, "Audio").as("createAudio");
//     //   },
//     // });

//     beforeEach(() => getInPlayer(`[aria-label="Next Track"]`).click());

//     it("display the right trackz when switching", () => {
//       // shouldHaveTrack(trackzs[1]);
//       getInPlayer(`[aria-label="Previous Track"]`).click();
//       // shouldHaveTrack(trackzs[0]);
//     });

//     it("play the track directly", () => {
//       // Pause Button means it is playing
//       getInPlayer(`[aria-label="Pause Track"]`).should("exist");
//     });

//     it("can't loop over the last track", () => {
//       getInPlayer(`[aria-label="Next Track"]`).click();
//       getInPlayer(`[aria-label="Next Track"]`).click();
//       getInPlayer(`[aria-label="Next Track"]`).click();
//       getInPlayer(`[aria-label="Next Track"]`).should("be.disabled");
//     });
//   });

//   context("when using volume", () => {
//     it("mute and unmute when clicking the volume button", () => {
//       getInPlayer(`[aria-label="Mute"]`)
//         .should("exist")
//         .click()
//         .should("not.exist")
//         .log("sound has been muted");
//       getInPlayer(`[aria-label="Unmute"]`)
//         .should("exist")
//         .click()
//         .should("not.exist")
//         .log("sound has been unmuted");
//     });
//   });
// });

export {};
