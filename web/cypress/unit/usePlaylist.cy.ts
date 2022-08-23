import { act, renderHook } from "@testing-library/react-hooks/dom";
import usePlaylist from "hooks/usePlaylist";

describe("usePlaylist", () => {
  const defaultArray = ["a", "b", "c", "d"];
  const { result, rerender } = renderHook(() => usePlaylist(defaultArray));

  before(() => {
    expect(result.current.next).to.be.a("function");
    expect(result.current.previous).to.be.a("function");
    // expect(next).to.be.a("function");
  });

  beforeEach(() => rerender());

  context("nextIndex", () => {
    it("should loop through the array", () => {
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
  });

  context("prevIndex", () => {
    it("should loop through the array", () => {
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
