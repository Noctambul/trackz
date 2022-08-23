import { act, renderHook } from "@testing-library/react-hooks/dom";
import usePlaylist from "hooks/usePlaylist";

describe("usePlaylist", () => {
  const { result, rerender } = renderHook(() => usePlaylist([0, 1, 2, 3]));

  before(() => {
    expect(result.current.nextIndex).to.be.a("function");
    expect(result.current.prevIndex).to.be.a("function");
    // expect(next).to.be.a("function");
  });

  beforeEach(() => rerender());

  context("nextIndex", () => {
    it("should loop through the array", () => {
      const { nextIndex } = result.current;
      act(() => nextIndex());
      expect(result.current.index).to.eq(1);
      act(() => nextIndex());
      expect(result.current.index).to.eq(2);
      act(() => nextIndex());
      expect(result.current.index).to.eq(3);
      act(() => nextIndex());
      expect(result.current.index).to.eq(0);
    });
  });

  context("prevIndex", () => {
    it("should loop through the array", () => {
      const { prevIndex } = result.current;
      act(() => prevIndex());
      expect(result.current.index).to.eq(3);
      act(() => prevIndex());
      expect(result.current.index).to.eq(2);
      act(() => prevIndex());
      expect(result.current.index).to.eq(1);
      act(() => prevIndex());
      expect(result.current.index).to.eq(0);
    });
  });
});

export {};
