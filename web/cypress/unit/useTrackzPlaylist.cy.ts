import { renderHook } from "@testing-library/react-hooks/dom";
import trackzs from "data/trackzs";
import useTrackzPlaylist from "hooks/useTrackzPlaylist";
import { Howl } from "howler";
import AudioTrackz from "models/audio-trackz";

describe("useTrackzPlaylist", () => {
  context("when rendering the first time", () => {
    let stub: Cypress.Agent<any>;

    before(() => {
      // stub the load method of AudioTrackz to not call the Howl.load methods that make weird behaviour in testing environment with spy and stub
      stub = cy.stub(AudioTrackz.prototype, "load");
    });

    it("preload metadata for every trackz in the playlist", () => {
      // The playlist will call load for every trackz to retrieve the metadata
      const spy = cy.spy(Howl.prototype, "load").as("load");
      const { result } = renderHook(() => useTrackzPlaylist(trackzs));
      expect(spy).to.be.callCount(trackzs.length);
    });

    it("preload Trackz to be buffered", () => {
      const preloadBuffer = 2;
      // We want to preload a certain number of trackz
      expect(stub).to.be.callCount(preloadBuffer);
    });
  });
});

export {};
