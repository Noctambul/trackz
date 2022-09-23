import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import TrackzMetadata from "models/TrackzMetadata";
import trackzMetadata from "../fixtures/trackzs.json";

const trackzs = trackzMetadata.editions
  .map((metadata) => EditionMetadataSchema.parse(metadata))
  .reverse() as TrackzMetadata[];

describe("Audio Player", () => {
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
  const playTrackBtn = (index: number) =>
    cy.get(`[aria-label="Play ${trackzs[index].name}"]`);

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
    volBtn().click();
  });

  afterEach(() => stopPlayer());

  context("from the home", () => {
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

  it("can play a track from a card", () => {
    playBtn().should("exist");
    playTrackBtn(2).click();
    pauseBtn().should("exist");
    shouldHaveTrack(2);
    nextBtn().should("be.disabled");
    playTrackBtn(1).click();
    shouldHaveTrack(1);
  });

  it("can pause a track from a card", () => {
    playTrackBtn(1).click();
    pauseBtn().should("exist");
    playBtn().should("not.exist");
    playTrackBtn(1).click();
    playBtn().should("exist");
    pauseBtn().should("not.exist");
  });
});

export {};
