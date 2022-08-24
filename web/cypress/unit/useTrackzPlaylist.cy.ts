import { renderHook } from "@testing-library/react-hooks/dom";
import trackzs from "data/trackzs";
import useTrackzPlaylist from "hooks/useTrackzPlaylist";
import { Howl } from "howler";

describe("useTrackzPlaylist", () => {
  it("preload Trackz once rendered", () => {
    const preloadBuffer = 2;
    const spy = cy.spy(Howl.prototype, "load").as("load");

    const { result } = renderHook(() =>
      useTrackzPlaylist(trackzs, preloadBuffer)
    );

    // The playlist will call load for every trackz to retrieve the metadata
    // And then preload the desired buffered
    expect(spy).to.be.callCount(trackzs.length + preloadBuffer);
  });

  // it("test stubing howler", () => {
  //   const spy = cy.spy(Howl.prototype, "load").as("load");

  //   // Howl.prototype.load = (attr) => console.log("LOAD with ", attr);

  //   const audioTrackz = new AudioTrackz(trackzs[0]);
  //   // audioTrackz.load();

  //   expect(spy).to.be.calledTwice;
  // });
});

export {};
