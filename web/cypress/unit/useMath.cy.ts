import useMath from "hooks/useMath";

describe("useMath", () => {
  const { modulo } = useMath();

  context("modulo", () => {
    before(() => expect(modulo).to.be.a("function"));

    it("compute positive and negative modulo", () => {
      expect(modulo(4, 3)).to.eq(1);
      expect(modulo(30, 10)).to.eq(0);
      expect(modulo(4, 6)).to.eq(4);
      expect(modulo(-13, 64)).to.eq(51);
    });
  });
});

export {};
