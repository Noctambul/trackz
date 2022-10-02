import TrackzMetadata from "common/models/TrackzMetadata";
import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
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
  const trackzCardElt = (index: number) =>
    cy.get(`[aria-label="Trackz Card ${trackzs[index].id}"]`);
  const playlistBtn = () => player().get(`[aria-label="Playlist Button"]`);
  const playlistContainer = () => player().get(`[aria-label="Playlist"]`);
  const playlistEltAt = (index: number) =>
    cy.get(`[aria-label="Playlist"] [data-playlist-index="${index}"]`);
  const addToPlaylist = (index: number) =>
    cy.get(`[aria-label="Add ${trackzs[index].name} to playlist"]`);
  const clearPlaylistBtn = () =>
    playlistContainer().get(`[aria-label="Clear Playlist"]`);
  const playlistTrack = (index: number) =>
    playlistContainer().get(`[aria-label="Track ${trackzs[index].name}"]`);
  const playlistTrackRemoveBtn = (index: number) =>
    player().get(
      `[aria-label="Track ${trackzs[index].name}"] [aria-label="Remove from the playlist"]`
    );
  const playTrackBtn = (index: number) =>
    cy.get(
      `[aria-label="Trackz Card ${trackzs[index].id}"] [aria-label="Play ${trackzs[index].name}"]`
    );

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

  afterEach(() => {
    stopPlayer();
    volBtn().click();
  });

  context("From the home", () => {
    it("displays the tracker with the first track selected", () => {
      player().should("exist");
      player().should("be.visible").log("The Audio Player is visible");
      shouldHaveTrack(0);
    });
  });

  context("Audio controlls", () => {
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

  context("Trackz cards", () => {
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

  context("Playlist", () => {
    const isTrackPlaying = (index: number) =>
      cy
        .get(`[data-playlist-index="${index}"] [data-test-pause]`)
        .should("be.visible");

    context("Navigating", () => {
      it("shows and hides by clicking the button", () => {
        playlistContainer().should("not.be.visible");
        playlistBtn().click();
        playlistContainer().should("be.visible");
        playlistBtn().click();
        playlistContainer().should("not.be.visible");
      });

      it("can play and pause a track", () => {
        playlistBtn().click();
        playlistTrack(1).click();
        playlistTrack(1).get(`[data-test-pause]`).should("be.visible");
        pauseBtn().should("be.visible");
        playBtn().should("not.exist");
        playlistTrack(1).click();
        playlistTrack(1).get(`[data-test-play]`).should("be.visible");
        pauseBtn().should("not.exist");
        playBtn().should("be.visible");
        playlistTrack(2).click();
        playlistTrack(2).get(`[data-test-pause]`).should("be.visible");
        playlistTrack(0).click();
        playlistTrack(0).get(`[data-test-pause]`).should("be.visible");
      });

      it("has the same track selected than the player", () => {
        playlistBtn().click();
        playlistTrack(0).get(`[data-test-play]`).should("be.visible");
        shouldHaveTrack(0);
        nextBtn().click();
        playlistTrack(0).get(`[data-test-play]`).should("not.be.visible");
        playlistTrack(1).get(`[data-test-pause]`).should("be.visible");
        shouldHaveTrack(1);
        pauseBtn().click();
        playlistTrack(1).get(`[data-test-play]`).should("be.visible");
      });

      it("has a disabled style on the previous trackzs", () => {
        playlistBtn().click();
        playlistTrack(2).click();
        playlistTrack(0).get(`img`).should("have.class", "opacity-40");
        playlistTrack(1).get(`img`).should("have.class", "opacity-40");
        playlistTrack(0).click();
        playlistTrack(0).get(`img`).should("not.have.class", "opacity-40");
        playlistTrack(1).get(`img`).should("not.have.class", "opacity-40");
      });

      it("can select precisely the right index between several identical Trackz", () => {
        playlistBtn().click();
        addToPlaylist(1).click().click().click();
        playlistEltAt(4).click();
        isTrackPlaying(4);
        shouldHaveTrack(1);
      });
    });

    context("Removing", () => {
      it("removes a track from the playlist", () => {
        playlistBtn().click().log("Open the playlist");
        playlistTrack(1)
          .should("exist")
          .log(`Trackz '${trackzs[1].name}' exists in the playlist`);
        playlistTrackRemoveBtn(1)
          .click()
          .log(`Remove track '${trackzs[1].name}' from the playlist`);
        trackzCardElt(1)
          .should("exist")
          .log(`TrackzCard '${trackzs[1].name}' still exists`);
        playlistTrack(1)
          .should("not.exist")
          .log(
            `Trackz '${trackzs[1].name}' does not exists in the playlist anymore`
          );
        playlistTrack(0)
          .should("exist")
          .log(`Trackz ${trackzs[0].name} exists in the playlist`);
        playlistTrackRemoveBtn(0)
          .click()
          .log(`Remove track '${trackzs[1].name}' from the playlist`);
        trackzCardElt(0)
          .should("exist")
          .log(`TrackzCard '${trackzs[0].name}' still exists`);
        playlistTrack(0)
          .should("not.exist")
          .log(
            `Trackz '${trackzs[0].name}' does not exists in the playlist anymore`
          );
        playlistTrack(2)
          .get(`[data-test-play="${trackzs[2].id}"]`)
          .should("be.visible");
        shouldHaveTrack(2);
      });

      it("removes a track that is before the current selected one", () => {
        playlistBtn().click();
        playlistTrack(2).click();
        shouldHaveTrack(2);
        playlistTrackRemoveBtn(0).click();
        shouldHaveTrack(2);
        pauseBtn().should("be.visible");
        playlistTrackRemoveBtn(1).click();
        shouldHaveTrack(2);
        pauseBtn().should("be.visible");
      });
    });

    context("Reseting", () => {
      it("reset the playlist when playing a track that is not in the playlist", () => {
        playlistBtn().click();
        playlistTrackRemoveBtn(1).click();
        playTrackBtn(1).click();
        shouldHaveTrack(1);
        playlistTrack(1).should("be.visible");
        playlistTrack(0).should("not.exist");
        playlistTrack(2).should("not.exist");
        pauseBtn().should("be.visible");
      });

      it("can clear the playlist and keep the current selected Trackz in it", () => {
        playlistBtn().click();
        playlistTrack(2).click();
        clearPlaylistBtn().click();
        player().should("be.visible");
        playlistContainer().should("be.visible");
        isTrackPlaying(0);
      });
    });
  });
});

export {};
