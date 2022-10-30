import { useTime } from "modules/audio/hooks/useTime";

describe("useTime", () => {
  const { formatTime } = useTime();

  before(() => {
    // Check if the import worked correctly
    expect(formatTime).to.be.a("function");
  });

  context("formatTime", () => {
    it("format time in seconds", () => {
      expect(formatTime(233)).to.eq("03:53");
    });
  });
});

export {};
