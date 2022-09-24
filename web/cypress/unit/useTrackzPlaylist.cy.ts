import {
  act,
  renderHook,
  RenderResult,
} from "@testing-library/react-hooks/dom";
import { SinonSpy, SinonStub } from "cypress/types/sinon";
import { Howl } from "howler";
import useTrackzPlaylist from "modules/audio/hooks/useTrackzPlaylist";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import trackzs from "../fixtures/trackzs";

describe("useTrackzPlaylist", () => {
  const preloadBuffer = 2;
  let stub: SinonStub;
  let spy: SinonSpy;
  let result: RenderResult<ReturnType<typeof useTrackzPlaylist>>;

  beforeEach(() => {
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
      // expect(stub).to.be.callCount(preloadBuffer);
      const stubCount = stub.getCalls().length;
      const countLoadingTrackz = result.current.playlist.filter(
        (t) => t.state !== "unloaded"
      ).length;
      expect(
        countLoadingTrackz === preloadBuffer || stubCount === preloadBuffer
      ).to.be.true;
    });
  });

  context("when swithcing through Trackz", () => {
    it("switch the selected Trackz correctly", () => {
      expect(result.current.selectedTrackz?.metadata.id).to.eq(trackzs[0].id);
      act(() => result.current.previous());
      expect(result.current.selectedTrackz?.metadata.id).to.eq(trackzs[0].id);
      act(() => result.current.next());
      expect(result.current.selectedTrackz?.metadata.id).to.eq(trackzs[1].id);
      act(() => result.current.next());
      expect(result.current.selectedTrackz?.metadata.id).to.eq(trackzs[2].id);
      act(() => result.current.previous());
      expect(result.current.selectedTrackz?.metadata.id).to.eq(trackzs[1].id);
    });

    it("preload next Trackz if needed", () => {
      // Hard to test has we stub the load method that also changes the loading state
      const initialCalls = stub.getCalls().length;
      act(() => result.current.next());
      expect(stub).to.be.callCount(initialCalls + 1);
    });
  });
});

export {};
