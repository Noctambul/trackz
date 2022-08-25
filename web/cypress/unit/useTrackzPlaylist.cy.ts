import {
  act,
  renderHook,
  RenderResult,
} from "@testing-library/react-hooks/dom";
import { SinonSpy, SinonStub } from "cypress/types/sinon";
import trackzs from "data/trackzs";
import useTrackzPlaylist from "hooks/useTrackzPlaylist";
import { Howl } from "howler";
import AudioTrackz from "models/audio-trackz";

describe("useTrackzPlaylist", () => {
  const preloadBuffer = 2;
  let stub: SinonStub;
  let spy: SinonSpy;
  let result: RenderResult<ReturnType<typeof useTrackzPlaylist>>;

  before(() => {
    // stub the load method of AudioTrackz to not call the Howl.load methods that make weird behaviour in testing environment with spy and stub
    stub = cy.stub(AudioTrackz.prototype, "load");
    // The playlist will call load for every trackz to retrieve the metadata
    spy = cy.spy(Howl.prototype, "load").as("load");
    // Render the hook
    result = renderHook(() => useTrackzPlaylist(trackzs, preloadBuffer)).result;
  });

  context("when rendering the first time", () => {
    it("preload metadata for every trackz in the playlist", () => {
      expect(spy).to.be.callCount(trackzs.length);
    });

    it("preload Trackz to be buffered", () => {
      // We want to preload a certain number of trackz
      expect(stub).to.be.callCount(preloadBuffer);
    });
  });

  context("when swithcing through Trackz", () => {
    it.only("preload next Trackz if needed", () => {
      const { next } = result.current;
      const initialCalls = stub.getCalls().length;
      console.log("1- CALLED ", stub.getCalls().length);
      act(() => next());
      console.log("2- CALLED ", stub.getCalls().length);
      // expect(stub).to.be.callCount(initialCalls + 1);
      act(() => next());
      console.log("3- CALLED ", stub.getCalls().length);
      expect(stub).to.be.callCount(initialCalls + 2);
      // act(() => next());
      // console.log("4- CALLED ", stub.getCalls().length);
    });
  });
});

export {};
