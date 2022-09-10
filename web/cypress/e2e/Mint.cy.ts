describe("Mint Page", () => {
  before(() => cy.intercept("GET", "/api/trackzs", { editions: [] }));

  describe("if the wallet is not connected", () => {
    it("displays a connect wallet button", () => {
      cy.visit("/mint");
      cy.get(`[aria-label="Mint"]`).should("not.exist");
      cy.get(`[aria-label="Connect wallet"]`).should("be.visible");
    });
  });
});

export {};
