import { act, renderHook } from "@testing-library/react-hooks/dom";
import usePlaylist from "hooks/usePlaylist";

describe("usePlaylist", () => {
  const defaultArray = ["a", "b", "c", "d"];
  const { result, rerender } = renderHook(() => usePlaylist(defaultArray));

  before(() => {
    expect(result.current.next).to.be.a("function");
    expect(result.current.previous).to.be.a("function");
  });

  beforeEach(() => rerender());

  context("in NO loop mode", () => {
    beforeEach(() => result.current.setIsLoopMode(false));

    it("nextIndex should not loop throught the playlist", () => {
      act(() => result.current.next());
      act(() => result.current.next());
      act(() => result.current.next());
      act(() => result.current.next());
      act(() => result.current.next());
      act(() => result.current.next());
      expect(
        result.current.index,
        "The index should be on the last element of the playlist"
      ).to.eq(defaultArray.length - 1);
    });

    it("prevIndex should not loop throught the playlist", () => {
      act(() => result.current.previous());
      act(() => result.current.previous());
      act(() => result.current.previous());
      expect(
        result.current.index,
        "The index should be on the last element of the playlist"
      ).to.eq(0);
    });
  });

  context("in loop mode", () => {
    beforeEach(() => result.current.setIsLoopMode(true));

    it("nextIndex should loop through the array", () => {
      const { next } = result.current;

      const nextToBeEq = (i: number) => {
        act(() => next());
        expect(result.current.index).to.eq(i);
        expect(result.current.selected).to.eq(defaultArray[i]);
      };

      nextToBeEq(1);
      nextToBeEq(2);
      nextToBeEq(3);
      nextToBeEq(0);
    });

    it("prevIndex should loop through the array", () => {
      const { previous } = result.current;

      const prevToBeEq = (i: number) => {
        act(() => previous());
        expect(result.current.index).to.eq(i);
        expect(result.current.selected).to.eq(defaultArray[i]);
      };

      prevToBeEq(3);
      prevToBeEq(2);
      prevToBeEq(1);
      prevToBeEq(0);
    });
  });
});

export {};
